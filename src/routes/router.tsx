import {createBrowserRouter} from "react-router-dom"
import App from "@/App"
import { TimeLine } from "@/pages/TimeLine"
import { Auth } from "@/pages/Auth"
import { Profile } from "@/pages/Profile"
import { Error } from "@/pages/Error"
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement:<Error/>,
        children: [
            {
                path: '/',
                element:<TimeLine/>
            },
            {
                path:'/profile/:id',
                element:<Profile/>
            }
        ]
    },
    {
        path: '/auth/:auth',
        element: <Auth/>
    },
    
])