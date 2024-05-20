import { API } from "./api";

export const createUser = async ({email, name, lastName, pass}: CreateUserProps)=>{
    try{

        const response = await fetch(`${API}/users/create`,{
            method: 'POST',
            body: JSON.stringify({email, name, lastName, pass, pic:"https://rickandmortyapi.com/api/character/avatar/1.jpeg",bio:""}),
            headers:{
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        return response
    }catch(error){
        console.error("Error creating user:", error)
        throw error
    }
}


export const logIn = async({email, pass}: LogInProps): Promise<UserProps> =>{
    try{
        const response = await fetch(`${API}/users/logIn`,{
            method: 'POST',
            body: JSON.stringify({email, pass}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {throw new Error(`API request failed with status ${response.status}`)}
        
        const data : UserProps = await response.json()
        return data
    }catch(error){
        console.error("Error in login user:", error)
        throw error
    }
}



export const newBio = async(id: string, bio:string) =>{
    try{
        const response = await fetch(`${API}/users/newBio`,{
            method: 'PATCH',
            body: JSON.stringify({id, bio}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {throw new Error(`API request failed with status ${response.status}`)}
        
        const data : UserProps = await response.json()
        return data
    }catch(error){
        console.error("Error in login user:", error)
        throw error
    }
}

export const newAvatar = async(id: string, pic:string) =>{
    try{
        const response = await fetch(`${API}/users/newAvatar`,{
            method: 'PATCH',
            body: JSON.stringify({id, pic}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {throw new Error(`API request failed with status ${response.status}`)}
        
        const data : UserProps = await response.json()
        return data
    }catch(error){
        console.error("Error in login user:", error)
        throw error
    }
}


export const getUserById = async(id: string): Promise<UserProps> =>{
    try{
        const response = await fetch(`${API}/users/getUserById/${id}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {throw new Error(`API request failed with status ${response.status}`)}
        
        const data : UserProps = await response.json()
        return data
    }catch(error){
        console.error("Error in login user:", error)
        throw error
    }
}

