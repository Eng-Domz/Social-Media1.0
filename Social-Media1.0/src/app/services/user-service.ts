import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

// Interface for login response
interface LoginResponse {
  token: string;
  user: User;
}

// Interface for user response from backend
interface UserResponse {
  user: User;
}

// Interface for users response from backend
interface UsersResponse {
  users: User[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "http://localhost:8000/users";  // Fixed: Changed from 3000 to 8000, removed /api
  constructor(private http: HttpClient, private router: Router) {
    this.loggedInUser = this.getLoggedInUser();
  }
  loggedInUser: User | null = null;

  // Helper method to get headers with authorization
  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders({ 'Authorization': `${token}` }) : new HttpHeaders();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<UsersResponse>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(
        map(response => response.users) // Extract users array from response
      );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.user) // Extract user from response
      );
  }

  // Fixed getUserImg to properly return Observable with profilePic
  getUserImg(id: string): Observable<string> {
    return this.getUserById(id).pipe(
      map(user => user.profilePic || '') // Extract profilePic from user object
    );
  }

  getLoggedInUserImg(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.profilePic ?? '';
  } 

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, { headers: this.getHeaders() });
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, { headers: this.getHeaders() });
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Updated login function to handle token response
  login(userName: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { name: userName, password })
      .pipe(
        tap(response => {
          // Set the logged in user
          this.setLoggedInUser(response.user);
          // Save the token in localStorage
          this.setToken(response.token);
          console.log('Login successful:', response);
        })
      );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');  // Also remove token
    this.loggedInUser = null;
    this.router.navigate(['/login']);
  }

  getLoggedInUser(): User | null {
    if (this.loggedInUser) {
      return this.loggedInUser;
    }
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  getLoggedInUserId(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?._id ?? null;
  }

  setLoggedInUser(user: User): void {
    this.loggedInUser = user; 
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Token management methods
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const user = this.getLoggedInUser();
    return !!(token && user);
  }

  // Method to get authorization header for API requests
  getAuthHeaders(): { [key: string]: string } {
    const token = this.getToken();
    return token ? { 'Authorization': `${token}` } : {};
  }

}
