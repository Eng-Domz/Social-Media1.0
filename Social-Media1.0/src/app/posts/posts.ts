import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../services/post-service';
import { Comment } from '../models/comment.model';
import { UserService } from '../services/user-service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-posts',
  standalone: false,
  templateUrl: './posts.html',
  styleUrls: ['./posts.css']
})
export class Posts implements OnInit {
  posts: Post[] = [];
  newPost!: Post;
  selectedPost !: Post;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.newPost = {
      id: 0,
      userid: this.getCurrentUserId(),
      title: '',
      body: '',
      date: new Date(),
      likes: 0,
      liked: false,
      comments: [],
      imgUrl: ''
    };

    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getApiPosts().subscribe((data) => {
      this.posts = data;
      console.log(this.posts)
      this.cdr.detectChanges();
    });
  }

  deletePost(id: number): void {
    this.postService.deleteApiPost(id).subscribe(() => {
      this.loadPosts();
    });
  }

  addPost(): void {
    this.postService.addApiPost(this.newPost).subscribe(() => {
      this.loadPosts();
      // Reset form
      this.newPost = {
        ...this.newPost,
        title: '',
        body: '',
        date: new Date()
      };
    });
  }

  updatePost(id: number, post: Post): void {
    this.postService.updateApiPost(id, post).subscribe(() => {
      this.loadPosts();
    });
  }

  // toggleLike(postId: number): void {
  //   const likeIcon = document.getElementById(postId.toString());
  //   if (likeIcon) {
  //     likeIcon.classList.toggle('fa-regular');
  //     likeIcon.classList.toggle('fa-solid');
  //     this.postService.addApiLike(postId).subscribe();
  //   }
  // }

  toggleLike(post: Post): void {
  post.liked = !post.liked;

  if (post.liked) {
    post.likes += 1;
    this.postService.addApiLike(post.id).subscribe();  
  } else {
    post.likes -= 1;
    this.postService.removeApiLike(post.id).subscribe();
  }
}



  showComments(postId: number): Observable<Comment[]> {
    return this.postService.getApiComments(postId);
  }

  addComment(): void {
    const postId = this.selectedPost.id
    const commentInput = document.getElementById("comment") as HTMLInputElement;
    const content = commentInput?.value;
    console.log("comment:", content)
    if (content) {
      this.postService.addApiComment(postId, content, this.getCurrentUserId());
      commentInput.value = '';
    }
   
    
  }

  formatDate(dateString: string): string {
    return this.postService.formatDate(dateString);
  }

  getCurrentUserId(): number {
    const loggedUser = this.userService.getLoggedInUser();
    return loggedUser?.id ?? 1;
  }

  getLoggedUser(): User | null {
    return this.userService.getLoggedInUser();
  }
}
