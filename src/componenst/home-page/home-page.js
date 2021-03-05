import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useContext, useEffect, useState } from 'react';
import getImage from '../../servises/getImage';
import { TrobberContext } from '../../contexts/trobber-context';
import {UserContext} from '../../contexts/user-context'
import {ProgressContext} from '../progress-msg'
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
import ProgressMsg from '../progress-msg'
import Board from '../board'
import BoardList from '../board-list'
import * as randId from 'generate-unique-id';
import {sendBoards} from '../../servises/sendBoard';

import {BoardContext} from '../../contexts/board-context'
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#FFF3E0',
        height: 'calc(100vh - 0.8rem * 2 - 74px)',
        padding: '50px',
        marginTop: '0.8rem',
        boxShadow: `0 1px 4px rgba(0, 0, 0, .3),
            -23px 0 20px -23px rgba(0, 0, 0, .6),
            23px 0 20px -23px rgba(0, 0, 0, .6),
            inset 0 0 40px rgba(0, 0, 0, .1)`,
        '& a':
        {
            textDecoration: 'none'
        }
    }
}));

export default function HomePage({setpage})
{
    setpage(true);
    const classes = useStyles();

    const [bcgImage, setbcgImage] = useState('');
    const { trobber, settrobber } = useContext(TrobberContext);
    const {setboard} = useContext(BoardContext)
    
 
    useEffect(() => {
        // settrobber(true);
        // getImage('backgroung/background', setbcgImage);
    }, []);

     

    return (

        <>          
            <CssBaseline />
            <Container maxWidth="lg" fixed>
                <Typography component="div"
                    className={classes.root}
                    // style={{
                    //     backgroundImage: `url(${bcgImage})`,
                    //    ,
                    // }}
                >
                    <Link to='/boards/new-board' onClick={() =>  setboard({
                                                                            id: randId(),
                                                                            title: '',
                                                                            cards: [],
                                                                        })}>
                        <Board title="new board"/>
                    </Link>

                    <BoardList/>

                </Typography>
            </Container>
        </>
         
    );
}



























