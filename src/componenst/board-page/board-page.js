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
import TargetCard from '../card';
import SortingCard from '../sorting-card';
import Settings from './settings'


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#80CBC4',
        height: 'calc(100vh - 0.8rem * 2 - 74px)',
        maxHeight: 'calc(100vh - 0.8rem * 2 - 74px)',
        width: '100%',
        padding: '10px 20px',
        marginTop: '0.8rem',
        boxShadow: `0 1px 4px rgba(0, 0, 0, .3),
            -23px 0 20px -23px rgba(0, 0, 0, .6),
            23px 0 20px -23px rgba(0, 0, 0, .6),
            inset 0 0 40px rgba(0, 0, 0, .1)`,
        '& a':
        {
            textDecoration: 'none'
        },

    },
    settings: {
        width: '100%',
        display: 'flex',
        borderBottom: '2px solid #B2DFDB',
        padding: '0.8rem 0 1rem',
        marginTop: '0.2rem',
        justifyContent: 'space-between'
    },
    secondHeader:
    {
        padding: '0.8rem 0',
        marginTop: '0.8rem 0',
    },
    cards: {
        padding: '0.8rem 0',
        marginTop: '0.8rem 0',
        display: 'flex',
        overflowY: 'hidden',
        minHeight: '70vh',
        // overflow: 'scroll',
        boxSizing: 'border-box',
    },

}));


export default function BoardPage({setpage}) {
    setpage(false)
    const classes = useStyles();
    const { id } = useParams();

    const { boards, card, board, setboard, SortingBoard } = useContext(BoardContext);
    const { user } = useContext(UserContext);
    const [isSave, setisSave] = useState(false);
    const [nameBoard, setnameBoard] = useState('')

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

    useEffect(() => {

        if (!board.title) {
            return;
        }
        console.log("SAAAAVEEEE");
        sendBoard(user.id, board, () => {
            setisSave(true);

            setTimeout(() => setisSave(false), 1000);
        })
    }, [board])



    const handleChange = ({ target: { value } }) => {
        setnameBoard(value);
    };

    const handleBlur = () => {

        if (!nameBoard) {
            return;
        }

        sendBoard(user.id, board, () => {
            setboard({ ...board, title: nameBoard.trim() });
            setisSave(!isSave);
            setTimeout(() => setisSave(false), 1000);
        })
    }

    const onAddCard = () => {

        setboard({ ...board, cards: [...board?.cards, { ...card, id: randId() }] });

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
            <Container fixed>
                <Typography component="div"
                    className={classes.root}
                    style={board.back ? {backgroundColor: 'transparent'} : {backgroundColor: '#80CBC4'}}
                >
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
                        </div>

                        <div>
                            <Settings />
                        </div>
                    </div>



                    <div className={classes.secondHeader}>
                        <Button variant="outlined" onClick={onAddCard} disabled={board.title === ''}>Add Card</Button>
                    </div>

                    <DndProvider backend={HTML5Backend}>
                        <div className={classes.cards}>
                            {
                                board.cards?.map(c => <TargetCard key={c.id} card={c} setisSave={setisSave} />)
                            }
                        </div>
                    </DndProvider>

                </Typography>
            </Container>
        </>

    );
}
