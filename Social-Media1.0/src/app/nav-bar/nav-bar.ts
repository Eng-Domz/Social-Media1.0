import { Component } from '@angular/core';
import { UserService } from '../services/user-service';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar {
  searchQuery: string = '';

  constructor( 
    private userService: UserService, 
    private router: Router,
    private searchService: SearchService
  ){}

  getUserName(){
    return this.userService.getLoggedInUser()?.name;
  }

  getProfilePic(){
    return this.userService.getLoggedInUser()?.profilePic;
  }

  logout(){
    this.userService.logout()
    this.router.navigate(['/login'])
  }

  isLoggedIn(){
    return this.userService.isLoggedIn();
  }

  // Search functionality
  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.searchService.updateSearchQuery(this.searchQuery);
  }

  onSearchKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.performSearch();
    }
  }

  performSearch(): void {
    this.searchService.updateSearchQuery(this.searchQuery);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchService.clearSearch();
  }
}
