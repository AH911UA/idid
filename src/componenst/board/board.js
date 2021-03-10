import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { BoardContext } from '../../contexts/board-context'
import deleteBoard from '../../servises/deleteBoard'
import {UserContext} from '../../contexts/user-context'
import ProgressMsg from '../../componenst/progress-msg';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-block',
        margin: 10
    },
    board: {
        padding: '30px 50px',
        maxWidth: 200,
        minWidth: 200,
        position: 'relative',

        '&:hover': {
            color: '#E65100',
            borderColor: '#E65100'
        },
    },
    deleteBtn: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        color: '#212121',
        '&:hover':
        {
            color: 'red'
        }
    }
}));

export default function Board({id, title, back}) {
    const classes = useStyles();

    const [issaved, setsaved] = useState(true)
    const { boards, setboards } = useContext(BoardContext);
    const { user } = useContext(UserContext);


    const onDelete = (e) => {
        e.preventDefault();
        setsaved(false);
      
        setboards(boards.filter(el => el.idBoard !== id));

        deleteBoard(user.id, id, () => setTimeout(setsaved(true), 500))

    }
    
    
    return (
        <div className={classes.root}>
             {
                !issaved ? <ProgressMsg alert='deleted' /> : ''
             }
            <Button 
                className={classes.board} 
                variant="outlined" color="primary"
                style={back ? {backgroundImage: `url(${back})`, backgroundSize: '100%'} : {backgroundImage: 'none'}}
                >
                    {
                        title
                    }
                    {
                        title !== 'new board' ? <Tooltip title="delete" placement="right">
                                                    <DeleteIcon className={classes.deleteBtn} onClick={onDelete} /> 
                                                </Tooltip> 
                                                : ''
                    }
            </Button>
        
        </div>
    );
}
