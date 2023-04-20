interface ResponseFromServer {
    success:boolean 
    data:ResBody[]
}
interface ResBody {
    prompt: string
    name: string
    photo: string
    postId: string
    _id: string
}
