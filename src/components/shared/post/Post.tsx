import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import IconPost from "./IconPost";
import { UserAvatar } from "../utils/UserAvatar"
import { Separator } from "@/components/ui/separator";


export const Post = ({_id, user, content,likes, owner, comments,createdAt,liked, onDelete, onLike}:PostProps) => {
    const handleDelete=()=>{
        onDelete && onDelete(_id)
    }
    const handleLike=()=>{
        onLike && onLike(_id)
    }
    return (
        <Card className="sm:w-full md:w-3/5 backdrop-blur-lg bg-opacity-50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-start gap-5 ">
                <UserAvatar id={user._id} pic={user.pic ? user.pic : '/mortyIcon.svg'} name={user.name} lastName={user.lastName}/>
                <CardDescription>{`${user.name} ${user.lastName}`}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
                <p>
                    {content}
                </p>
            </CardContent>
            <Separator/>
            <CardFooter className="flex justify-between items-center mt-5">
                <IconPost color="#64748b" value={comments.length} action={()=>{}} icon={"Comment"} />
                <div className="flex justify-end items-center">
                    <p className="text-xs dark:text-slate-500 text-slate-400">{`Created at ${new Date(createdAt).toLocaleDateString()} - ${new Date(createdAt).toLocaleTimeString()}`}</p>
                    {
                        owner && <IconPost color="#64748b" action={handleDelete} icon={"Trash"} />
                    }
                    
                    <IconPost color={liked ? "#dc2626" :"#64748b" }value={likes.length} action={handleLike} icon={"Heart"} />
                    
                </div>
                
            </CardFooter>
        </Card >
    )
}
