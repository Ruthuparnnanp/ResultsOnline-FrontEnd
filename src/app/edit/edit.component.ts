import { Component, OnInit } from '@angular/core';
import { userSchema } from '../admin-dash/users.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  user: userSchema = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (result: any) => {
        const { id } = result;
        this.getexistinguser(id);
      },
    });
  }

  getexistinguser(id: any) {
    this.api.getExistingUser(id).subscribe({
      next: (result: any) => {
        this.user = result;
      },
      error: (error: any) => {
        alert('something went wrong ! please try again later');
      },
    });
  }

  updateuser() {
    this.api.updateUser(this.user.id, this.user).subscribe({
      next: (result: any) => {
        Swal.fire(
          'Data Updated',
          'You have successfully updated ✅',
          'success'
        ).then((result) => this.router.navigateByUrl('students'));
      },
      error: (error: any) => {
        Swal.fire('ERROR', 'please try again later ❌', 'error');
      },
    });
  }

  cancel(id: any) {
    this.getexistinguser(id);
  }
}
