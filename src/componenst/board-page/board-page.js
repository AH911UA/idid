import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import * as randId from 'generate-unique-id'
import { useContext, useEffect, useState } from 'react';
import { BoardContext } from '../../contexts/board-context'
import sendBoard from '../../servises/sendBoard';
import { UserContext } from '../../contexts/user-context';
import ProgressMsg from '../../componenst/progress-msg';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TargetCard from './card';
import SortingCard from '../sorting-card';
import Settings from './settings'


const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 0.8rem * 2 - 74px)',
        maxHeight: 'calc(100vh - 0.8rem * 2 - 74px)',
        width: '100%',
        padding: '10px 20px',
        marginTop: '0.8rem',
        borderRadius: 5,
        '& a':
        {
            textDecoration: 'none'
        },
    },
    settings: {
        width: '100%',
        display: 'flex',
        padding: '0.8rem 0 1rem',
        marginTop: '0.2rem',
        justifyContent: 'space-between',
        '& button':
        {
            height: '100%'
        },
        '& > div > div:not(:first-child),  & button':
        {
            marginLeft: theme.spacing(1),
        }
    },
    secondHeader:
    {
        padding: '0.8rem 0',
        marginTop: '0.8rem 0',

    },
    cards: {
        padding: '0.8rem',
        marginTop: '0.8rem 0',
        display: 'flex',
        overflowY: 'hidden',
        minHeight: '70vh',
        // overflow: 'scroll',
        boxSizing: 'border-box',
        border: '1px solid #616161',
        borderRadius: 5
    },

}));


export default function BoardPage({ setpage }) {
    setpage(false)
    const classes = useStyles();
    const { id } = useParams();

    const { boards, card, board, setboard, saveBoard, task } = useContext(BoardContext);
    const { user } = useContext(UserContext);
    const [isSave, setisSave] = useState(false);
    const [nameBoard, setnameBoard] = useState('');

    useEffect(() => {
        if (id !== 'new-board') {
            for (const elem of boards) {
                if (elem['idBoard'] === id) {
                    setboard(elem['board']);
                    setnameBoard(elem['board'].title);
                }
            }
        }
    }, [])

    // useEffect(() => {

    //     if (board.title === 'My Board') {
    //         return;
    //     }
 
    //         sendBoard(user.id, board, () => {
    //             console.log('FUCK ------------> ');
    //             setisSave(true);
    //             setTimeout(() => setisSave(false), 1000);
    //         })
   

    // }, [board])



    const handleChange = ({ target: { value } }) => {
        setnameBoard(value);
    };

    const handleBlur = () => {

        if (!nameBoard || nameBoard === 'New Board') {
            return;
        } 

        setboard({ ...board, title: nameBoard.trim()});
        // saveBoard(user.id, setisSave);
    }

    const onAddCard = () => {
        // debugger
        if(board.cards === undefined)
            setboard({...board, cards: [{...card, id: randId()}]})
        else 
            setboard({ ...board, cards: [...board?.cards, { ...card, id: randId() }] });
            
        saveBoard(user.id, setisSave);

        // sendBoard(user.id, board, () => {
        //     setisSave(!isSave);
        //     setTimeout(() => setisSave(false), 2000);
        // });
    }

    return (

        <>
            {
                isSave ? <ProgressMsg alert='save' /> : ''
            }
            <Container maxWidth='false'>
                <Typography component="div"
                    className={classes.root}
                    style={board.back !== '_empty' ? { backgroundColor: 'transparent' } : { backgroundColor: '#BDBDBD' }}
                >
                    {
                        console.log(board)
                    }
                    <div className={classes.settings}>
                        <div>
                            <TextField
                                id="outlined-name"
                                label="Name Board"
                                value={nameBoard}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined"
                            />
                            <SortingCard />
                            <Button variant="outlined" onClick={onAddCard} disabled={board.title === ''}>Add Card</Button>
                        </div>

                        <div>
                            <Settings setisSave={setisSave}/>
                        </div>
                    </div>

                    <DndProvider backend={HTML5Backend}>
                        <div className={classes.cards}>
                            {
                                board.cards?.map((c, i) => <TargetCard key={c.id} prev={i > 0} next={i < board.cards.length - 1} card={c} setisSave={setisSave} />)
                            }
                        </div>
                    </DndProvider>

                </Typography>
            </Container>
        </>

    );
}
