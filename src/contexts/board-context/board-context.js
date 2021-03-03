import React, { useState } from 'react';
import * as randId from 'generate-unique-id';

export const BoardContext = React.createContext({}); 

export default function BoardContextProvider({ children }) {

    function updateId() {
        setboard({...board, id: randId()})
    }

    const task = {
        id: 0,
        exs: '', 
        description: '',
        date: null,
        created: '',
        priority: '',
        color: null, 
    }

    const card = {
        id: 0,
        title: 'name card',
        tasks: []
    };

    const [board, setboard] = useState({
        id: 0,
        title: '',
        cards: [],
    });

    const [boards, setboards] = useState() 

    return(
        <BoardContext.Provider value={{
            task, card, board, setboard, updateId, setboards, boards
        }}>
            { children }
        </BoardContext.Provider>
    )
};

