
export const logout = async () => {
    try{
        await fetch("http://localhost:3000/logout", { 
            method: "POST",
            credentials: "include" 
        })
    }catch(ex){
        //Nothing
    }finally{
        window.location = "http://localhost:8000/login"
    }
}

export const getSession = async () => {
    try{
        const response = await fetch("http://localhost:3000/session", { credentials: "include" })
        const { session } = await response.json()
    
        if (response.status !== 200) 
            throw await response.json()
        
        return session
    }catch(ex){
        throw ex
    }
}