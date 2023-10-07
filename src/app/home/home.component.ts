import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../Services/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  adminName = localStorage.getItem('admin_name');
  total = '';
  active = '';
  inActive = '';

  constructor(private route: Router, private api: ApiService) {}

  ngOnInit() {
    this.getAll();
  }

  // -------------------------------LOGOUT--------------------------------------
  logout() {
    localStorage.removeItem('admin_name');
    Swal.fire(
      'Logged out ✅',
      'You have successfully logged out',
      'success'
    ).then((result) => this.route.navigateByUrl(''));
  }

  updateAdmin(event: any) {
    this.adminName = event;
  }

  getAll() {
    this.api.getAllUsers().subscribe((result: any) => {
      this.total = result.length;
      this.active = result.filter((item: any) => item.active == 1).length;
      this.inActive = result.filter((item: any) => item.active != 1).length;
    });
  }
}
