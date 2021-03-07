import React, { useState } from 'react';
 
export const UserContext = React.createContext({}); 


export default function UserContextProvider({ children }) {
    
    const [isLoginUser, setisLoginUser] = useState(false);
    const [user, setuser] = useState({
        id: null,
        ava: ''
    })
    
    
    return(
        <UserContext.Provider value={{
            isLoginUser, setisLoginUser, setuser, user
        }}>
            { children }
        </UserContext.Provider>
    )
};

