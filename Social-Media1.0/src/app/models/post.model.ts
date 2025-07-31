import { Comment } from './comment.model';

export interface Post{
    _id:string
    userid:string
    title:string
    body:string
    date: Date
    likes:number
    liked: boolean
    comments: Comment[]
    imgUrl:string
}