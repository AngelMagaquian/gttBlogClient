import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { createPost } from "@/api/post.api"
import { ErrorLabel } from "../utils/ErrorLabel"


export const CreatePost = ({user}: CreatePostProps) => {
    const [content, setcontent] = useState("")
    const [error, setError] = useState("")
    
    const handlePost =(e: React.ChangeEvent<HTMLTextAreaElement> )=>{
        setcontent(e.target.value)
        if(content.length > 255){
            setError("Post must be less than 255 characters")
        }else{
            setError("")
        }
    }

    const handleNewPost = async()=>{
        await createPost({content, user})
    }
    return (
        <Card className="w-full md:w-3/5 shadow-2xl dark:shadow-slate-900 shadow-slate-300">
            <CardHeader>
                <CardTitle>Create Post</CardTitle>
                <CardDescription>
                    Tell the universe what it's comming on.
                </CardDescription>
                <CardContent className="grid w-full gap-2 p-0">
                    <Textarea id="createPost" placeholder="Type your message here." onChange={handlePost} value={content} className="border-0" />
                    <ErrorLabel id={"createPost"} error={error}/>
                    <Button disabled={content.length <= 255 && content != "" ? false : true} onClick={handleNewPost}>Send post</Button>
                </CardContent>
            </CardHeader>
        </Card>
    )
}
