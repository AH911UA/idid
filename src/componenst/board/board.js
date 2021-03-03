import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { BoardContext } from '../../contexts/board-context'
import deleteBoard from '../../servises/deleteBoard'
import {UserContext} from '../../contexts/user-context'
import ProgressMsg from '../../componenst/progress-msg';

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
        }
    },
    deleteBtn: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        '&:hover':
        {
            color: '#00C853'
        }
    }
}));

export default function Board({id, title}) {
    const classes = useStyles();

    const [issaved, setsaved] = useState(true)
    const { boards, setboards } = useContext(BoardContext);
    const { user } = useContext(UserContext);


    const onDelete = (e) => {
        e.preventDefault();
        console.log('delete');
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
                variant="outlined" color="primary">
                    {
                        title
                    }
                    {
                        title !== 'new board' ? <DeleteIcon className={classes.deleteBtn} onClick={onDelete} /> : ''
                    }
            </Button>
        
        </div>
    );
}