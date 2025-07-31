import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../services/post-service';
import { Comment } from '../models/comment.model';
import { UserService } from '../services/user-service';
import { User } from '../models/user.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-posts',
  standalone: false,
  templateUrl: './posts.html',
  styleUrls: ['./posts.css']
})
export class Posts implements OnInit {
  posts: Post[] = [];
  users: User[] = []; // Store all users
  newPost!: Post;
  newComment!: Comment;
  selectedPost !: Post;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.newPost = {
      _id: '',
      userid: this.getCurrentUserId(),
      title: '',
      body: '',
      date: new Date(),
      likes: 0,
      liked: false,
      comments: [],
      imgUrl: ''
    };
    this.newComment = {
      id: 0,
      content: '',
      postId: '',
      userId: '',
      createdAt: new Date().toISOString()
    };

    // Load users first, then posts
    this.loadUsersAndPosts();
  }

  // Load all users first, then load posts
  loadUsersAndPosts(): void {
    console.log('Loading users first...');
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log('Users loaded:', this.users);
        
        // After users are loaded, load posts
        this.loadPosts();
      },
      error: (error) => {
        console.error('Error loading users:', error);
        // Load posts anyway even if users fail
        this.loadPosts();
      }
    });
  }

  loadPosts(): void {
    console.log('Loading posts...');
    this.postService.getApiPosts().subscribe({
      next: (data) => {
        this.posts = data;
        console.log('Posts loaded successfully:', this.posts);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading posts:', error);
      }
    });
  }

  deletePost(id: string): void {
    this.postService.deleteApiPost(id).subscribe(() => {
      this.loadPosts();
    });
  }

  addPost(): void {
    console.log('Attempting to add post:', this.newPost);
    this.postService.addApiPost(this.newPost).subscribe({
      next: (response) => {
        console.log('Post added successfully:', response);
        this.loadPosts();
        // Reset form
        this.newPost = {
          ...this.newPost,
          title: '',
          body: '',
          date: new Date()
        };
      },
      error: (error) => {
        console.error('Error adding post:', error);
        alert('Error adding post: ' + (error.error?.message || error.message));
      }
    });
  }

  updatePost(id: string, post: Post): void {
    this.postService.updateApiPost(id, post).subscribe(() => {
      this.loadPosts();
    });
  }

  toggleLike(post: Post): void {
    post.liked = !post.liked;

    if (post.liked) {
      post.likes += 1;
      this.postService.addApiLike(post._id).subscribe();  
    } else {
      post.likes -= 1;
      this.postService.removeApiLike(post._id).subscribe();
    }
  }

  showComments(postId: string): Comment[] {
    return this.getComments(postId);
  }

  addComment(): void {
    const postId = this.selectedPost._id
    console.log("comment:", this.newComment.content)
    if (this.newComment.content) {
      const comment: Comment = {
        id: 0,
        content: this.newComment.content,
        postId: postId,
        userId: this.getCurrentUserId(),
        createdAt: new Date().toISOString()
      }
      this.postService.addApiComment(postId, comment).subscribe({
        next: (response) => {
          console.log('Comment added successfully:', response);
          this.newComment.content = '';
          // Reload posts to get updated comments and refresh user cache
          this.loadPosts();
        },
        error: (error) => {
          console.error('Error adding comment:', error);
        }
      });
    }
    this.cdr.detectChanges();
  }

  getComments(postId: string): Comment[] {
    const post = this.posts.find(post => post._id === postId);
    return post ? post.comments : [];
  }

  // Search function to find user by ID from loaded users
  findUserById(userId: string): User | null {
    const user = this.users.find(user => user._id === userId);
    return user || null;
  }

  // Get user image by searching through loaded users
  getUserImg(userId: string): string {
    const user = this.findUserById(userId);
    return user?.profilePic || '';
  }

  // Get username by searching through loaded users  
  getUserName(userId: string): string {
    const user = this.findUserById(userId);
    return user?.name || 'Unknown User';
  }

  formatDate(dateString: string): string {
    return this.postService.formatDate(dateString);
  }

  getCurrentUserId(): string {
    return this.userService.getLoggedInUserId();
  }

  getLoggedUser(): User | null {
    return this.userService.getLoggedInUser();
  }

  getProfilePic(): string {
    const loggedUser = this.userService.getLoggedInUser();
    return loggedUser?.profilePic ?? '';
  }
}
