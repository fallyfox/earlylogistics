"use client"
import { useState,createContext } from "react";

const AppContext = createContext();

const AppContextProvider = ({children}) => {
    const [packageDocId,setPackageDocId] = useState(undefined);

    return (
        <AppContext.Provider value={{packageDocId,setPackageDocId}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext,AppContextProvider}