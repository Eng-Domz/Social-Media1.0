import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user-service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    // Use the new isLoggedIn method which checks both user and token
    if (this.userService.isLoggedIn()) {
      console.log('User is already logged in');
      this.router.navigate(['/']); 
      return false; 
    } else {
      return true; 
    }
  }
}
