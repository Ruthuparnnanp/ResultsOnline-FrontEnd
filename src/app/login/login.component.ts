import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  adminEmail: string = '';
  adminPwd: string = '';

  constructor(
    private loginRouter: Router,
    private loginServiceRepresentative: ApiService
  ) {}

  loginCheck() {
    if (this.adminEmail && this.adminPwd) {
      this.loginServiceRepresentative.getAdminData().subscribe({
        next: (result: any) => {
          if (
            this.adminEmail == result.email &&
            this.adminPwd == result.password
          ) {
            localStorage.setItem('admin_name', result.name);
            localStorage.setItem('admin_email', result.email);
            this.loginSuccess();
          } else {
            this.loginFail();
          }
        },
        error: (error: any) => {
          alert('please try again later !!!');
        },
      });
    }
  }

  loginSuccess() {
    Swal.fire('Logged In', 'You have successfully logged ✅', 'success').then(
      (result: any) => this.loginRouter.navigateByUrl('home')
    );
  }

  loginFail() {
    Swal.fire('Invalid Credentials ❌', '', 'error');
  }
}
