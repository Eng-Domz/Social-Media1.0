import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import {Comment} from '../models/comment.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/posts';
  constructor(private http:HttpClient){}

  getApiPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getApiPost(id:number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  addApiPost(post:Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  updateApiPost(id:number, post:Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

  deleteApiPost(id:number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getApiComments(postId:number): Observable<Comment[]> { //make separate commentService
    return this.http.get<Comment[]>(`${this.apiUrl}/${postId}/comments`);
  }

  addApiComment(postId: number, comment: string, userId: number): void {
  this.getApiComments(postId).subscribe((comments) => {
    const newComment: Comment = {
      id: comments.length + 1, // or better: use backend auto-increment
      userId: userId,
      postId: postId,
      content: comment,
      createdAt: new Date().toISOString()
    };

    this.http.post<Comment>(`${this.apiUrl}/${postId}/comments`, newComment).subscribe();
  });
}
// addApiComment(postId: number, content: string, userId: number): Observable<any> {
//   const commentData = {
//     content,
//     userId,
//     postId
//   };

//   return this.http.post(`${this.apiUrl}/${postId}/comments`, commentData);
// }



  getApiLikes(postId:number): Observable<number> { //separate likes service
    return this.http.get<number>(`${this.apiUrl}/${postId}/likes`);
  }
  addApiLike(postId:number): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/${postId}/likes`, {});
  }

  removeApiLike(postId:number){
    return this.http.delete<number>(`${this.apiUrl}/${postId}/likes`, {});
  }


  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  }
}