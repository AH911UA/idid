import Board from '../board'
import getBoards from '../../servises/getBoards'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/user-context';
import { BoardContext } from '../../contexts/board-context' 
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';

export default function BoardList()
{
    const { user } = useContext(UserContext);
    const { boards, setboards } = useContext(BoardContext);

    useEffect(() => {
        getBoards(user.id, (data) => {
            let arr = [];
            for (const key in data) {
                arr.push({
                    idBoard: key,
                    board: {
                        id: data[key].id,
                        title: data[key].title,
                        cards: data[key].cards, 
                        back: data[key].back,  
                    }})
            }
            setboards(arr)
        })
    }, []);

    return (
        <>
            {
                boards ? boards.map(b => <Link to={`/boards/${b.board.id}`} key={b.board.id}>
                                            <Board key={b.board.id} id={b.board.id} title={b.board.title} back={b.board.back} />
                                        </Link>)
                    : ''
            }
        </>
    )
}