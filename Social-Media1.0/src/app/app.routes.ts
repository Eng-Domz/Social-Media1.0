import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { Posts } from './posts/posts';
import { Login } from './login/login.component';

export const routes: Routes = [
  {
    path:"",
    component : Posts,
    canActivate : [AuthGuard]
  },
  {
    path:"login",
    component : Login,
    canActivate : [LoginGuard]
  }
]; 