import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useContext, useEffect, useState } from 'react';
import getImage from '../../servises/getImage';
import { TrobberContext } from '../../contexts/trobber-context';
import { UserContext } from '../../contexts/user-context'
import { ProgressContext } from '../progress-msg'
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
import ProgressMsg from '../progress-msg'
import Board from '../board'
import BoardList from '../board-list'
import * as randId from 'generate-unique-id';
import { sendBoards } from '../../servises/sendBoard';
import Notes from './notes'
import { NotesContext } from '../../contexts/notes-context';
import getNotes from '../../servises/getNotes';

import Grid from '@material-ui/core/Grid';

import { BoardContext } from '../../contexts/board-context'
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0 50px 0 50px',
        margin: 0,
        '& a':
        {
            textDecoration: 'none'
        }
    },
    container:
    {
        paddingTop: 50,
        backgroundColor: '#212121',
        height: 'calc(100vh - 0.8rem * 2)',
    },
    leftField:
    {
        marginTop: 5
    }
}));

export default function HomePage({ setpage }) {
    setpage(true);
    const classes = useStyles();

    const [bcgImage, setbcgImage] = useState('');
    const { trobber, settrobber } = useContext(TrobberContext);
    const { setboard } = useContext(BoardContext);
    const { notes, setnotes } = useContext(NotesContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        getNotes(user.id, (_nodes) => {
            let ns = [];
            for (const key in _nodes) {
                ns.push({ id: _nodes[key].id, text: _nodes[key].text, date: _nodes[key].date });
            }
            setnotes(ns);
        })
    }, [])


    return (

        <>
            <CssBaseline />
            <Container maxWidth="false" className={classes.container}>
                <Grid container>
                    <Grid item md={3}>
                        <Typography component="div" className={classes.leftField}>
                            <Notes />
                        </Typography>
                    </Grid>

                    <Grid item md={9}>
                        <Typography component="div" className={classes.root}>
                            <Link to='/boards/new-board' onClick={() => setboard({
                                id: randId(),
                                title: '',
                                cards: [],
                            })}>
                                <Board title="new board" />
                            </Link>

                            <BoardList />

                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </>

    );
}



























