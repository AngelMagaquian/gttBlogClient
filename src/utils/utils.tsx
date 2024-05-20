import { deletePost, newLike } from "@/api/post.api"

export const handleDeletePost = async(_id: string)=>{
    await deletePost(_id)
}
export const handleLikePost = async(_id: string, userId: string | null | undefined)=>{
    userId && await newLike({postId: _id, userId})
}