import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"
export const UserAvatar = ({id, name, lastName, pic}: UserAvatarProps) => {
    const initials = name && lastName ? name[0] + lastName[0] : ''
    return (
        <Link to={`/profile/${id}`}>
            <Avatar className="ring ring-slate-500">
                <AvatarImage src={pic} />
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
        </Link>
        
    )
}
