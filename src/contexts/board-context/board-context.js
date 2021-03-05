import React, { useState } from 'react';
import * as randId from 'generate-unique-id';

export const BoardContext = React.createContext({});

export default function BoardContextProvider({ children }) {

    function updateId() {
        setboard({ ...board, id: randId() })
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
        sorting: 'Default',
        title: '',
        back: '',
        cards: [],
    });

    const [boards, setboards] = useState();


    function SortingBoard(sortMode) {

        switch (sortMode) {
            case 'Default':
                setboard({ ...board, sorting: sortMode, cards: board.cards.map(c => ({ ...c, tasks: c.tasks?.sort((a, b) => new Date(a.created) - new Date(b.created)) })) });

                break;

            case 'Date':
                setboard({ ...board, sorting: sortMode, cards: board.cards.map(c => ({ ...c, tasks: c.tasks?.sort((a, b) => new Date(a.date) - new Date(b.date)) })) });

                break;

            case 'Priority':
                setboard({ ...board, sorting: sortMode, cards: board.cards.map(c => ({ ...c, tasks: c.tasks?.sort((a, b) => a.priority - b.priority) })) });
                break;

            default:
                break;
        }
    }

    return (
        <BoardContext.Provider value={{
            task, card, board, setboard, updateId, setboards, boards, SortingBoard
        }}>
            { children}
        </BoardContext.Provider>
    )
};

