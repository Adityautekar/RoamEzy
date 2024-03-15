import { createContext, useState } from "react";
export const searchContext = createContext({});
export function SearchContextProvider({children}){
    const [s_place, setS_place] = useState('');
    const [keyword, setKeyword] = useState('');
    const [ready, setReady] = useState([]);
    
    return(
     <searchContext.Provider value={{s_place, setS_place, keyword, setKeyword, ready, setReady}}>
        {children}
     </searchContext.Provider>   
    );
}