import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = () => {
  const service = inject(AuthService);
  const router = inject(Router);

  if (service.isLoggedIn()) {
    return true;
  } else {
    Swal.fire(
      'Access Denied ❌',
      'Please login inorder to access the page',
      'error'
    );
    router.navigateByUrl('');
    return false;
  }
};
