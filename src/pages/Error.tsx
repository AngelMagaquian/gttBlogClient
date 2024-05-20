import {
    Card,
    CardContent,
    CardDescription,
    CardTitle
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export const Error = () => {
  return (
    <div className="h-screen bg-slate-900 flex justify-center items-center">
        
        <Card>
           
            <CardContent className="flex flex-row justify-center items-center gap-5">
                <img src="/rickIcon.svg" alt="rickIcon" className="bg-slate-800 rounded-full shadow-xl shadow-slate-700 w-1/4"/>
                <div className="space-y-5">
                    <CardTitle>Where're you going?! </CardTitle>
                    <CardDescription>The route you want to access does not exist</CardDescription>
                    <Button><Link to={"/"}>Back to timeline</Link></Button>
                </div>
              
            </CardContent>
        </Card>
    </div>
  )
}
