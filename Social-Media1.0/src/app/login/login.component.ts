import { Component } from '@angular/core';
import { UserService } from '../services/user-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class Login {
  loginForm: FormGroup;
  showPassword: boolean = false;
  loginError: string = '';
  isLoading: boolean = false; // Add loading state
  
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    this.loginError = '';
    this.isLoading = true;

    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      
      // Properly handle the async login response
      this.userService.login(username, password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // The user and token are already set in the service via tap operator
          // Navigate to home page
          this.router.navigate(['/']);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.loginError = error.error?.message || 'Invalid username or password. Please try again.';
          this.isLoading = false;
        }
      });
    } else {
      this.loginError = 'Please fill in all required fields correctly.';
      this.isLoading = false;
    }
  }
}
