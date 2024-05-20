import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link,  useParams } from "react-router-dom"

import { SignInForm } from "@/form/SignInForm"
import { LogInForm } from "@/form/LogInForm"

export const Auth = () => {
    const params = useParams<{ auth: string }>()
    return (
        <div className="flex justify-center items-center h-screen bg-neutral-100 dark:bg-slate-900">
            
            <Card className="w-full mx-5 md:w-1/3 rounded-3xl">
                <CardHeader className="grid grid-cols-3">
                    <div className="col-span-2">
                        <CardTitle>{params.auth === "signIn" ? 'Sign In' : 'Log In'}</CardTitle>

                        <CardDescription>
                            {params.auth === "signIn" ?
                             'Create your account and join the fun. 🫡' 
                            : 'Great to see you again! 🖖'
                            }
                        </CardDescription>
                    </div>
                    <div className="col-span-1 flex justify-end items-center">
                        <Button variant={'outline'}><Link to={'/'}>Back to home</Link></Button>
                    </div>
                </CardHeader>
                <CardContent >
                    {
                        params.auth === "signIn" ? <SignInForm/> : <LogInForm/>
                    }
                </CardContent>
            </Card>
        </div>
        
    )
}
