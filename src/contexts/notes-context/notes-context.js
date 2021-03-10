import React, { useContext, useEffect, useState } from 'react';

export const NotesContext = React.createContext({});

export default function NotesContextProvider({ children }) {

    const [notes, setnotes] = useState([])
   
    useEffect(() => {

        console.log(notes);
        setnotes(notes.sort((a, b) => a.date > b.date));
        console.log(notes);
    }, [notes])

    return (
        <NotesContext.Provider value={{
            notes, setnotes
        }}>
            { children}
        </NotesContext.Provider>
    )
};

