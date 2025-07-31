import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
      // Use the new isLoggedIn method which checks both user and token
      if (this.userService.isLoggedIn()) {
        return true;
      }
      
      console.log('User not authenticated, redirecting to login');
      this.router.navigate(['/login']);
      return false;
  }
}
