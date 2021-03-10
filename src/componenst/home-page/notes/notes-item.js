import { makeStyles } from '@material-ui/core/styles';
import { useContext, useState } from 'react';
import * as randId from 'generate-unique-id';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';

import sendNotes from '../../../servises/sendNotes';
import { UserContext } from '../../../contexts/user-context';
import { NotesContext } from '../../../contexts/notes-context'
import deleteNote from '../../../servises/deleteNote'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
        marginBottom: 5,

        '&:hover':
        {
            '& div:first-child ': {
                backgroundColor: '#E65100',
                border: '1px solid #E65100',
                borderBottom: 'none',
                color: '#212121'
            },
            '& div:nth-child(2) ':
            {
                border: '1px solid #E65100',
            }
        },
        '& div:nth-child(1) ':
        {
            border: '1px solid #616161',
            backgroundColor: '#616161',
            color: '#212121',
            borderBottom: 'none',
        },
        '& div:nth-child(2) ':
        {
            border: '1px solid #616161',
        }
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        color: '#BDBDBD',
        minWidth: '95%',
        margin: 0,
        '& h5': {
            margin: 0,
            padding: 5
        },
    },
    close:
    {
        height: '100%',
        cursor: 'pointer',
        fill: '#212121',
    },
    body:
    {
        '& textarea':
        {
            backgroundColor: 'transparent',
            border: '1px solid #212121',
            // borderColor: '#424242',
            minWidth: '95%',
            color: '#BDBDBD',
            resize: 'none',

            borderRadius: '0 0 5px 5px',

            '&:focus':
            {
                border: 'none',
                color: '##E65100',
            }
        }
    }
}));

export function NotesItem({ _text = 'New note', id, date }) {
    const classes = useStyles();

    const { user } = useContext(UserContext);
    const { notes, setnotes } = useContext(NotesContext);

    const [note, setnote] = useState({
        id: id || randId(),
        text: _text,
        date: date || moment().format('YYYY-MM-DD')
    });
    const [text, settext] = useState(_text);

    const onSendText = () => {

        if (!text.trim() || text === 'New note') {
            settext('New note');
            return;
        }

        sendNotes(user.id, { ...note, text: text }, () => {

            setnotes(notes.find(n => n.id === note.id) !== undefined
                ? notes.map(n => n.id === note.id ? { ...n, text: text } : n)
                : [...notes, note]);

            if (_text === 'New note')
                settext(_text)
        })
    }

    const onDelete = (id) => {
        deleteNote(user.id, id, () => {
            setnotes(notes.filter(n => n.id !== id));
        })
    }
    

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <h5>
                    {note.text !== 'New note' ? note.text.split(' ')[0] : 'New note'}
                </h5>
                <Tooltip title="delete" placement="right">
                    <CloseIcon className={classes.close} onClick={() => onDelete(note.id)}/>
                </Tooltip>
            </div>
            <div className={classes.body}>
                <textarea rows="4" value={text}
                    onChange={({ target: { value } }) => settext(value)}
                    onFocus={() => settext(text === 'New note' ? '' : text)}
                    onBlur={onSendText}
                >

                </textarea>
            </div>
        </div>
    )
}