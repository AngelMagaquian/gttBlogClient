import { useParams } from "react-router-dom"
import useUserStore from "@/stores/user.store"
import { useState, useEffect, MouseEventHandler  } from "react"
import { getUserById } from "@/api/user.api"
import { Post } from "@/components/shared/post/Post"
import { getPostByUser } from "@/api/post.api"
import { handleDeletePost, handleLikePost } from "@/utils/utils"
import { Textarea } from "@/components/ui/textarea"
import { SquarePen, CameraIcon } from "lucide-react"
import io from "socket.io-client"
import { Button } from "@/components/ui/button"
import { ErrorLabel } from "@/components/shared/utils/ErrorLabel"
import { newBio, newAvatar } from "@/api/user.api"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import { getAvatar } from "@/api/avatar.api"
const socket = io("http://localhost:3000")

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
})

export const Profile = () => {
    const [profile, setProfile] = useState<UserProps>()
    const [posts, setPosts] = useState<PostProps[]>([])
    const [bio, setBio] = useState("")
    const [error, setError] = useState("")
    const {user, isLoggedIn} = useUserStore()
    const [avatars, setAvatars] = useState([])
    const params = useParams<{ id: string }>()
    const setUser = useUserStore((state: any) => state.setUser)

    const getPosts = async () => {
        if(!profile?._id ) {
            return
        }
        const id = profile._id 
        try {
            const data = await getPostByUser(id)
            setPosts(data)
        } catch (error) {
            console.error("Failed to get posts:", error)
        }
    }

    const handleBio = (e: React.ChangeEvent<HTMLTextAreaElement> )=>{
        setBio(e.target.value)
        if(bio.length > 255){
            setError("Biography must be less than 255 characters")
        }else{
            setError("")
        }
    }

    const handleNewBio = async()=>{
        if(bio !== "" && user?._id){
            const res = await newBio(user._id, bio)
            setUser(res)
        }else{
            setError("Biography must have at least 1 character")
        }
    }

    const handleNewAvatar: MouseEventHandler<HTMLImageElement> = async (e) => {
        const imageURL  = e.currentTarget.src
        
        if(user?._id){
            const res = await newAvatar(user._id,imageURL)
            setUser(res)
        }
    }

    useEffect(()=>{
        const getAvatars=async()=>{
            setAvatars(await getAvatar())
        }

        getAvatars()
    },[])

    useEffect(()=>{
        const fetchProfile = async () => {
            if (user && user?._id === params.id) {
                setProfile(user)
                setBio(user?.bio ? user.bio : "")
            } else if(params.id){
                try {
                    const fetchedUser = await getUserById(params.id)
                    setProfile(fetchedUser)
                    setBio(profile?.bio ? profile.bio : "")
                } catch (error) {
                    console.error("Error fetching user profile:", error)
                }
            }
        }
        fetchProfile()
        
    },[user, params.id])

    useEffect(()=>{
        getPosts()
    },[profile])

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
        <div className="">
            <div className="flex justify-center flex-col md:flex-row md:justify-center items-center gap-5 mx-5">
                <img src={profile?.pic ? profile?.pic : '/mortyIcon.svg'} alt={`${profile?.name[0]} ${profile?.lastName[0]}`} className="w-3/5 h-3/5 md:w-1/5 md:h-1/5 rounded-full dark:bg-slate-300 bg-slate-900 shadow-xl dark:shadow-slate-800 shadow-slate-300" />
                <div className="flex flex-col w-full md:w-3/5">
                    <p className="text-3xl font-semibold my-5 text-center md:text-left">{profile?.name} {profile?.lastName}</p>
                    {
                        user?._id === profile?._id ?
                        <div className="flex flex-col justify-center gap-3 ">
                            
                            <Textarea value={bio} onChange={handleBio} className="border-0"/> 
                            <ErrorLabel error={error}/>
                            <div className="flex flex-row gap-5 justify-between">
                             
                                <div className="">
                                    <Dialog >
                                        <DialogTrigger asChild>
                                           <Button className="flex gap-5 ">Change Avatar <CameraIcon/></Button> 
                                        </DialogTrigger>
                                        <DialogContent className="h-screen md:h-5/6">
                                            <DialogHeader>
                                                <DialogTitle className="text-slate-900 dark:text-slate-300">Change Avatar</DialogTitle>
                                            </DialogHeader>
                                                <ScrollArea className="md:h-[680px] w-full rounded-xl border-none p-3">
                                                    <ul>
                                                        {
                                                            avatars.length > 0 && avatars.map((e:AvatarRickAndMorty)=>(
                                                                <li className="my-10 flex justify-center" key={e.name.replace(" ","")}>
                                                                    <img src={e.img} alt={e.name} className="rounded-full shadow-xl shadow-slate-700 cursor-pointer" onClick={handleNewAvatar} /> 
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </ScrollArea>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <Button className="flex gap-5" onClick={handleNewBio}>Change Bio <SquarePen/></Button>
                            </div>
                            
                        </div>
                         : <p className="text-md">{profile?.bio}</p>
                    }
                </div>
            </div>
                {
                    !isLoggedIn &&
                    <div className="z-10 flex justify-center items-center sticky top-1/2">
                        <p className="w-full mx-5 md:w-1/5 text-center px-4 py-2 dark:bg-slate-900 bg-slate-300 backdrop-blur-xl bg-opacity-5 rounded-full ">
                        You must be logged in to see all about {profile?.name}
                        </p>
                    </div>
                    
                }
            <div className={`flex flex-col justify-center items-center my-28 gap-10 mx-5 ${!isLoggedIn && 'blur-md'}`}>
                
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
        </div>
    )
}
