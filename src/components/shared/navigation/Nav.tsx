import { LogOutIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { UserAvatar } from "../utils/UserAvatar"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"
import useUserStore from "@/stores/user.store"
const Nav = ({id, name, lastName, pic, isLoggedIn}  : NavProps) => {
    const { logOut } = useUserStore()

    const handleLogout = () => {
        logOut()
    }

    return (
        <div className="flex justify-center items-center sticky top-0 z-10">
            <div className="grid grid-cols-7 w-full md:w-2/3 items-center gap-3 dark:bg-slate-900 bg-slate-50 py-3 px-5 m-3 backdrop-blur-3xl bg-opacity-30 dark:bg-opacity-20 rounded-full">
                <div className="col-span-3">
                    <Button><Link to={'/'}>TimeLine</Link></Button>
                </div>
                <div className="col-span-2 justify-center">
                    {
                        isLoggedIn && name && lastName ? 
                            <UserAvatar id={id ? id : ""} pic={pic ? pic : '/mortyIcon.svg'} name={name} lastName={lastName}/>
                        :
                        <div className="flex">
                            <Button variant={"ghost"}>
                                <Link to={"/auth/logIn"}>Log in</Link>
                            </Button>
                            <Button variant={"ghost"}>
                                <Link to={"/auth/signIn"}>Sign in</Link>
                            </Button>
                        </div>
                    }
                </div>
                <div className="col-span-2 flex justify-end gap-5">
                    <ModeToggle/>
                    {isLoggedIn && 
                        <Button variant={"ghost"} onClick={handleLogout}>
                            <LogOutIcon/>
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Nav