import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useNavigate } from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useUserStore from "@/stores/user.store"
import { logIn } from "@/api/user.api"
import { CustomAlert } from "@/components/shared/utils/CustomAlert"
const LogInSchema = z.object({
    email: z.string().email({message: "You must enter a valid email address."}).min(1).trim(),
    pass: z.string().min(8,{message: "You must enter a valid password."})
})

export const LogInForm = () => {
    const navigate = useNavigate()
    const [error, setError] = useState({title:"", desc:"", variant:"default"})
    const setUser = useUserStore((state: any) => state.setUser)
   
    const form = useForm<z.infer<typeof LogInSchema>>({
        resolver: zodResolver(LogInSchema),
        defaultValues: {
            email: "",
            pass: "",
        },
    })

    const onSubmit = async(data: z.infer<typeof LogInSchema>)=> {
    
        try{
            setError({title:"", desc:"", variant:"default"})
            const res : UserProps = await logIn(data)
            setUser(res)
            navigate('/')
        }catch(error){
            setError({title:"SignIn Error", desc:"User not found", variant:"destructive"})
        }
        
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 grid grid-cols-3 items-center justify-between gap-3 mx-10">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="space-y-1 col-span-3">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="rickSanchezc137@mortygram.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pass"
                    render={({ field }) => (
                        <FormItem className="space-y-1 col-span-3">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="xxxxxxxx" type="password" {...field} />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    error.title && 
                        <div className="col-span-3">
                            <CustomAlert variant={error.variant == "default" || error.variant == "destructive" ? error.variant : "default"} title={error.title} desc={error.desc}/>
                        </div>
                }
                <Button variant={"outline"} className="col-span-3">LogIn</Button>
            </form>
        </Form>
    )
}
