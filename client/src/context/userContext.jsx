import { createContext, useEffect, useState } from "react";
export const userContext = createContext({});
import axios from "axios";
export function UserContextProvider({children}){
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if(!user){
            axios.get('/profile').then(({data})=>{
                setUser(data);
                setReady(true);
            });
        }
    }, []);
    return(
     <userContext.Provider value={{user, setUser, ready}}>
        {children}
     </userContext.Provider>   
    );
}
