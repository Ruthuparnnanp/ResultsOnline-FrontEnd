import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { EditComponent } from './edit/edit.component';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', canActivate: [authGuard], component: HomeComponent },
  { path: 'register', canActivate: [authGuard], component: RegisterComponent },
  { path: 'students', canActivate: [authGuard], component: AdminDashComponent },
  { path: 'edit/:id', canActivate: [authGuard], component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
