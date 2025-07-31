import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { UserService } from './user-service';

// Backend response interfaces
interface PostsResponse {
  posts: Post[];
}

interface PostResponse {
  post: Post;
}

interface LikesResponse {
  likes: number;
}

interface CommentsResponse {
  comments: Comment[];
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8000/posts';  // Fixed: Changed from 3000 to 8000, removed /api
  
  constructor(private http: HttpClient, private userService: UserService) {}

  // Helper method to get headers with authorization
  private getHeaders(): HttpHeaders {
    const authHeaders = this.userService.getAuthHeaders();
    return new HttpHeaders(authHeaders);
  }

  getApiPosts(): Observable<Post[]> {
    return this.http.get<PostsResponse>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(
        map(response => response.posts) // Extract posts array from response
      );
  }

  getApiPost(id: string): Observable<Post> {
    return this.http.get<PostResponse>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.post) // Extract post from response
      );
  }

  addApiPost(post: Post): Observable<Post> {
    return this.http.post<PostResponse>(this.apiUrl, post, { headers: this.getHeaders() })
      .pipe(
        map(response => response.post) // Extract post from response
      );
  }

  updateApiPost(id: string, post: Post): Observable<Post> {
    return this.http.put<PostResponse>(`${this.apiUrl}/${id}`, post, { headers: this.getHeaders() })
      .pipe(
        map(response => response.post) // Extract post from response
      );
  }

  deleteApiPost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Like/Unlike methods
  addApiLike(postId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${postId}/likes`, {}, { headers: this.getHeaders() });
  }

  removeApiLike(postId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${postId}/likes`, { headers: this.getHeaders() });
  }

  getApiLikes(postId: string): Observable<number> { 
    return this.http.get<LikesResponse>(`${this.apiUrl}/${postId}/likes`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.likes) // Extract likes number from response
      );
  }

  // Comment methods
  addApiComment(postId: string, comment: Comment): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${postId}/comments`, comment, { headers: this.getHeaders() });
  }

  getApiComments(postId: string): Observable<Comment[]> {
    return this.http.get<CommentsResponse>(`${this.apiUrl}/${postId}/comments`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.comments) // Extract comments array from response
      );
  }

  // Utility method for date formatting
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
  }
}