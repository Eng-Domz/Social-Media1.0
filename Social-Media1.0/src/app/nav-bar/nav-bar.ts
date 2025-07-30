import { Component } from '@angular/core';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar {

   constructor(public userService:UserService){}

  // logout(){
  //   this.userService.logOut()
  //   this.router.navigate(['/login'])
  // }

  //  currentRoute(): string {
  //   return this.router.url;
  // }

}
