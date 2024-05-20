/* Nav types */
type NavProps = {
    name?:string;
    lastName?:string;
    id?:string;
    isLoggedIn: boolean;
    pic?: string;
}

/* Post types */
type PostProps = {
    _id:string;
    user: UserProps;
    content: string;
    likes: string[];
    liked: boolean;
    owner: boolean;
    comments:[];
    createdAt: string;
    onDelete?: (_id: string) => void;
    onLike?: (_id: string) => void;

}

type LikePostProps = {
    postId: string;
    userId: string;
}

type IconPostProps={
    color?: string;
    value?: number;
    action: ()=> void;
    icon: 'Heart' | 'Trash' | 'Comment'
}


type CreatePostProps = {
    user: string;
    content?: string;
}


/* User types */
type UserStateProps = {
    user: null | {
      bio: any;
      _id: string;
      name: string;
      lastName: string;
      pic: string;
      email: string;
    },
    isLoggedIn: boolean;
    setUser: (user: UserStateProps['user']) => void;
    logOut: ()=> void;
}

type UserProps = {
    _id: string;
    email: string;
    name: string;
    lastName: string;
    createdAt?: string;
    updatedAt?: string;
    bio?:string;
    pic?: string;
    __v?: number;
}


type CreateUserProps = {
  email: string;
  name: string;
  lastName: string;
  pass: string;
}

type LogInProps = {
  email:string;
  pass:string;
}

type UserAvatarProps ={
    name: string;
    lastName: string;
    pic: string;
    id:string;
}

/* Utils types */
type LabelErrorProps = {
    error?: string;
    id?: string;
}

type AlertProps = {
    variant: 'default' | 'destructive';
    title: string;
    desc?: string;
}

type AvatarRickAndMorty = {
    name: string;
    img: string;
}