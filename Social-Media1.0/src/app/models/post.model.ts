export interface Post{
    id:number
    userid:number
    title:string
    body:string
    date: Date
    likes:number
    liked: boolean
    comments:string[]
    imgUrl:string
}