import { useState, useEffect} from "react"
import { Post } from "@/components/shared/post/Post"
import { CreatePost } from "@/components/shared/post/CreatePost"
import useUserStore from "@/stores/user.store"
import {  getPost } from "@/api/post.api"
import { handleDeletePost, handleLikePost } from "@/utils/utils"

import io from "socket.io-client"

const socket = io("http://localhost:3000")

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
})

export const TimeLine = () => {
    const [posts, setPosts] = useState<PostProps[]>([])
    const {user, isLoggedIn } = useUserStore()


    const getPosts = async () => {
        const limit = 10
        try {
            const data = await getPost(limit)
            setPosts(data)
        } catch (error) {
            console.error("Failed to get posts:", error)
        }
    }


    useEffect(() => {
        getPosts()
    }, [])

    useEffect(() => {

        
        socket.on('newPost', (newPost) => {
            setPosts((prevPosts: PostProps[]) => [newPost, ...prevPosts])
        })

        socket.on("deletedPost", (deletedPostId) => {
            setPosts((prevPosts: PostProps[]) => prevPosts.filter((post) => post._id !== deletedPostId))
        })

        socket.on("updatedPost", (updatedPost) => {
            setPosts((prevPosts) => {
                const index = prevPosts.findIndex((post) => post._id === updatedPost._id)
                if (index !== -1) {
                    const updatedPosts = [...prevPosts]
                    updatedPosts[index] = updatedPost
                    return updatedPosts
                }
                return prevPosts;
            });
        })

        return () => {
            socket.off('newPost')
            socket.off('deletedPost')
            socket.off('updatedPost')
        }

    }, [])


    return (
        <div className="flex flex-col justify-center items-center my-28 gap-10 mx-5 ">
        {
            isLoggedIn && user?._id &&
            <CreatePost user={user?._id}/>
        }
        {
            posts.length == 0 ? 
            <p className="text-xl font-semibold">Nothing yet...</p>
            : posts.map((e:PostProps)=>(
                <Post _id={e._id} 
                content={e.content} 
                user={e.user} 
                likes={e.likes} 
                owner={user?._id === e.user._id} 
                comments={e.comments} 
                liked={user?._id ? e.likes.includes(user._id) : false} 
                createdAt={e.createdAt}
                onDelete={()=>handleDeletePost(e._id)}
                onLike={()=>handleLikePost(e._id, user?._id)}
                />
                
            ))
        }
        </div>
    )
}
