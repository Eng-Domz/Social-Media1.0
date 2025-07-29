import { Component } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../services/post-service';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-posts',
  standalone: false,
  templateUrl: './posts.html',
  styleUrl: './posts.css'
})
export class Posts {
  posts: Post[] = [];
  newPost: Post = {
    id: 0,
    userid: this.getCurrentUserId(),
    title: '',
    body: '',
    date: new Date(),
    likes: 0,
    comments: [],
    imgUrl: ''
  }

  constructor(private postService: PostService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.postService.getApiPosts()

  }




  deletePost(id: number): void {
    this.postService.deleteApiPost(id).subscribe(() => {
      this.postService.getApiPosts()
    });
  }

  addPost(): void {
    this.postService.addApiPost(this.newPost).subscribe(() => {
      this.postService.getApiPosts()
    })


  }

  updatePost(id: number, post: Post): void {
    this.postService.updateApiPost(id, post).subscribe(() => {
      this.postService.getApiPosts()
    })
  }

  toggleLike(postId: number): void {
    const like = document.getElementById(postId.toString()) as HTMLElement; //add id for likes
    if (like) {
      like.classList.toggle('fa-regular');
      like.classList.toggle('fa-solid');
      this.postService.addApiLike(postId);
    }
  }

  showComments(postId: number): Observable<Comment[]> {
    return this.postService.getApiComments(postId)
  }

  addComment(postId: number): void { //add comment id
    const comment = document.getElementById("comment") as HTMLInputElement;
    this.postService.addApiComment(postId, comment.value, this.getCurrentUserId());
    comment.value = '';
  }

  formatDate(dateString: string): string {
    return this.postService.formatDate(dateString);
  }

  getCurrentUserId(): number {
    const loggedUser = this.userService.getLoggedInUser();
    return loggedUser?.id ?? 1;
  }

}
