import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user-service';
import { Posts } from '../posts/posts';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-user-data',
  standalone: false,
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']

})
export class UserDataComponent implements OnInit{
 constructor(private userService:UserService, private cdr: ChangeDetectorRef){}
@Input() userid!:string;
@Input() date!:Date;
user: User | null = null;

ngOnInit():void{
  this.userService.getUserById(this.userid).subscribe(res => {
    this.user = res;
    console.log('Fetched user:', res);
    this.cdr.detectChanges();
  });
}


getProfilePic(){
  return this.user?.profilePic || '';
}

getUsername(){
  return this.user?.name || '';
}
}
