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

    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const loggedUser = this.userService.login(username, password);
      if(loggedUser){
        this.userService.setLoggedInUser(loggedUser);
        this.router.navigate(['/']);
      }else{
        this.loginError = 'Invalid username or password. Please try again.';
      }
    } else {
      this.loginError = 'Please fill in all required fields correctly.';
    }
  }
}
