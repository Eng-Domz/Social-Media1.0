import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "http://localhost:3000/users";
  constructor(private http: HttpClient) {
    this.loggedInUser = this.getLoggedInUser();
  }
  loggedInUser: User | null = null;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getUserImg(id: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${id}/img`);
  } 

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Mock users for client-side authentication
  private mockUsers: User[] = [
    { id: 1, name: 'adham', password: '123456', profilePic: '' },
    { id: 2, name: 'ahmed', password: '123456', profilePic: '' }
  ];

  login(userName: string, password: string): User | null {
    const user = this.mockUsers.find(u => u.name === userName && u.password === password);
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.loggedInUser = null;
  }

  getLoggedInUser(): User | null {
    if (this.loggedInUser) {
      return this.loggedInUser;
    }
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  setLoggedInUser(user: User): void {
    this.loggedInUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }


}
