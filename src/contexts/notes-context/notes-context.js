import React, { useContext, useEffect, useState } from 'react';

export const NotesContext = React.createContext({});

export default function NotesContextProvider({ children }) {

    const [notes, setnotes] = useState([])
   

    return (
        <NotesContext.Provider value={{
            notes, setnotes
        }}>
            { children}
        </NotesContext.Provider>
    )
};

