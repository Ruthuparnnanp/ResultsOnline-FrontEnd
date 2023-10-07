import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { userSchema } from '../admin-dash/users.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css'],
})
export class EditAdminComponent {
  url = './assets/images/adminImage3.png';

  admin: userSchema = {};
  editOrNot = false;

  @Output() onUpdate = new EventEmitter();

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getAdminData().subscribe((result: any) => {
      this.admin = result;
      if (result.picture) this.url = result.picture;
    });
  }

  editToggle() {
    this.editOrNot = true;
  }

  getFile(event: any) {
    let file = event.target.files[0];
    let fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = (event: any) => {
      this.url = event.target.result;
      this.admin.picture = this.url;
    };
  }

  updateadmin() {
    this.api.updateAdmin(this.admin).subscribe((result: any) => {
      this.admin = result;
      localStorage.setItem('admin_name', result.name);
      localStorage.setItem('admin_email', result.email);
      this.onUpdate.emit(result.name);
      Swal.fire(
        'Updated ✅',
        'Admin details updated successfully',
        'success'
      ).then((result) => (this.editOrNot = false));
    });
  }

  cancel() {
    this.editOrNot = false;
  }
}
