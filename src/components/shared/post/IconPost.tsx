import { Heart, Trash, MessageSquareMore} from "lucide-react"


const IconPost = ({color, value, action, icon}: IconPostProps) => {
  return (
    <button className="flex justify-center items-center gap-3 mx-5" onClick={action}>
        {
            icon === 'Heart' ? <Heart color={color} fill={color}/> : 
            icon === 'Trash' ? <Trash color={color} fill={color}/> :  
            icon === 'Comment' && <MessageSquareMore color={color} fill={color}/>
        }
        {
            value && <p className="text-xs">{value}</p>
        }
    </button>
  )
}

export default IconPost