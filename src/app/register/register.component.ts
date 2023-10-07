import { Component, OnInit } from '@angular/core';
import { userSchema } from '../admin-dash/users.model';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: userSchema = {};

  constructor(private registerServiceRep: ApiService, private route: Router) {}

  ngOnInit(): void {}

  regUser() {
    this.registerServiceRep.registerUser(this.user).subscribe({
      next: (result: any) => this.sweetReg(),
      error: (error: any) => {
        alert('Something went wrong ❌.Try again later !!!');
      },
    });
  }

  // ------------------successfull sweet alert---------------------
  sweetReg() {
    Swal.fire(
      'Registered',
      'You have successfully registered ✅',
      'success'
    ).then((result) => this.route.navigateByUrl('students'));
  }
}
