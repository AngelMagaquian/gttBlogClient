import { API } from "./api"

export const createPost = async ({content, user} : CreatePostProps)=>{
    try{
        const response = await fetch(`${API}/posts/createPost`,{
            method: 'POST',
            body: JSON.stringify({content, user}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json()
        return data
    }catch(error){
        console.error('There was a problem to create post:', error);
    }
}

export const getPost = async(limit : number) =>{
    try{

        const response = await fetch(`${API}/posts/${limit}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json()
        return data
    }catch(error){
        console.error('There was a problem to get posts:', error);
    }
}

export const getPostByUser = async(id : string) =>{
    try{
        const response = await fetch(`${API}/posts/getPostByUser/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json()
        return data
    }catch(error){
        console.error('There was a problem to get posts:', error);
    }
}

export const deletePost = async(_id: string)=>{
    try{
        const response = await fetch(`${API}/posts/deletePost/${_id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
    }catch(error){
        console.error('There was a problem to delete post:', error);
    }
}

export const newLike = async({postId, userId}: LikePostProps)=>{
    try{

        const response = await fetch(`${API}/posts/likePost`,{
            method: 'PATCH',
            body:JSON.stringify({postId, userId}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    }catch(error){
        console.error('There was a problem to get posts:', error);
    }
}