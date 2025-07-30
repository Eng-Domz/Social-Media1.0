import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user-service';
import { Posts } from '../posts/posts';

@Component({
  selector: 'app-user-data',
  standalone: false,
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']

})
export class UserDataComponent implements OnInit{
 constructor(private userService:UserService){}
@Input() userid!:number
@Input() date!:Date
// @Input() postId!: number
user: User | null = null;
// @Input() onDeletePost!:(id:number) =>void;

ngOnInit():void{
  this.userService.getLoggedInUser()
  this.userService.getUserById(this.userid).subscribe(res => {
    this.user = res;
      console.log('Fetched user:', res);
      console.log('userid',this.userid)
  });
}

getLoggedInUser(){
  return this.userService.getLoggedInUser()
}

// getUserById(){
//   return this.userService.getUserById(this.userId).subscribe((res) => {
//     this.user = res;
//   });

// }

// handleDeletePost(){
//   if(this.onDeletePost && this.postId != null){
//     this.onDeletePost(this.postId)
//     this.

    
//   }
// }

// deletePost(id:number){
//   this.posts.deletePost(id)
// }

// getPostId(){
//   return this.postId
// }
}
