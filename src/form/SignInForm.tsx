import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { createUser } from "@/api/user.api"
import { CustomAlert } from "@/components/shared/utils/CustomAlert"
import { useNavigate } from 'react-router-dom'

const SignInSchema = z.object({
    name: z.string().min(2,{message: "Your name must be at least 2 characters."}).max(10,{message: "Your name must not exceed 10 characters."}).trim(),
    lastName: z.string().min(2,{message: "Your last name must be at least 2 characters."}).max(10,{message: "Your last name must not exceed 10 characters."}).trim(),
    email: z.string().email({message: "You must enter a valid email address."}).min(1).trim(),
    pass: z.string().min(8)
    .regex(/[A-Z]/) // Al menos 1 mayuscula
    .regex(/[a-z]/) // Al menos 1 minuscula
    .regex(/[0-9]/) // Al menos 1 numero
    .regex(/[^A-Za-z0-9]/) // Al menos 1 simbolo
    .trim(),
    passConfirmation: z.string()
})

export const SignInForm = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({title:"", desc:"", variant:"default"})
    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            name: "",
            lastName: "",
            email: "",
            pass: "",
            passConfirmation:""
        },
    })

    const onSubmit = async(data: z.infer<typeof SignInSchema>)=> {
        if(data.pass !== data.passConfirmation){
            setError({title:"Password Error", desc:"The passwords do not match", variant:"destructive"})
            return
        }
        setIsLoading(true)
        try{
            setError({title:"", desc:"", variant:"default"})
            const res = await createUser(data)
            if (res.status === 201) { 
                setIsLoading(false)
                navigate("/auth/logIn")
            }else{
                console.log(`Unexpected response code: ${res.status}`)
            }
        }catch(error){
            console.error("Error creating user:", error)
            setError({title:"SignIn Error", desc:"Error creating user", variant:"destructive"})
        }
        
        setIsLoading(false);
        
    }

    return (
        <Form {...form}>
            <form className="space-y-2 grid grid-cols-2 items-center justify-between gap-3" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="space-y-1 col-span-2">
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
                    name="name"
                    render={({ field }) => (
                        <FormItem className="space-y-1 col-span-1">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Rick" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem className="space-y-1 col-span-1">
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Sanchez" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pass"
                    render={({ field }) => (
                        <FormItem className="space-y-1 col-span-2">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="xxxxxxxx" type="password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Must have at least 8 characters, a number and a symbol.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="passConfirmation"
                    render={({ field }) => (
                        <FormItem className="space-y-1 col-span-2">
                            <FormLabel>Password Confirmation</FormLabel>
                            <FormControl>
                                <Input placeholder="xxxxxxxx" type="password" id="passConfirmation" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    error.title && 
                        <div className="col-span-2">
                            <CustomAlert variant={error.variant == "default" || error.variant == "destructive" ? error.variant : "default"} title={error.title} desc={error.desc}/>
                        </div>
                }
                
                <Button type="submit" className={`col-span-2 ${isLoading ? 'animate-pulse' : 'animate-none'}`}>{isLoading ? 'Wait...' : 'SignIn'}</Button>
            </form>
        </Form>
    )
}
