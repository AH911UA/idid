import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Task from '../task'
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { BoardContext } from '../../contexts/board-context'
import { useContext, useState, useCallback } from 'react';
import * as randId from 'generate-unique-id';
import sendBoard from '../../servises/sendBoard';
import { UserContext } from '../../contexts/user-context';
import { getBoard } from '../../servises/getBoards'

//
import { useDrop } from 'react-dnd';
//
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-block',
        maxHeight: '65vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        boxSizing: 'border-box',
        
        minWidth: 350,
        maxWidth: 350,
        '& > *': {
                marginLeft: 10,
                padding: '5px'
            }
    },
    card:
    {
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignIntem: 'center',
    },
    btnAdd: 
    {
        marginTop: '0.5rem'
    }
}));

function Card({ card, setisSave, onDrop })
{
    const classes = useStyles();
    const { task, board, setboard } = useContext(BoardContext); 
    const { user } = useContext(UserContext);
    const [cardName, setcardName] = useState(card.title)
    
    const onAddTask = () => {
    
        setboard({
            ...board, cards: board.cards?.map(c => c.id === card.id ? { ...c, tasks: c.tasks ? [...c.tasks, { ...task, id: randId() }] : [{task, id: randId() }] } : c)
        });
         
        sendBoard(user.id, board, () => {
            setisSave(true);
            setTimeout(() => setisSave(false), 2000);
        });
    }

    function saveCardName() {
        setboard({
                    ...board,
                    cards: board.cards.map(c => c.id === card.id ? { ...c, title: cardName.trim() } : c)
                });
    }   
   
    const [{ isOver, draggingColor, canDrop }, drop] = useDrop(() => ({
        accept: 'task',
        drop(item) {
            onDrop(item.id);
            // dropTask(item.id);
            return item;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            draggingColor: monitor.getItemType(),
        }),
    }), [onDrop]);
 

    return (
        <div className={classes.root}>
            <Paper className={classes.card} >
                
               
                 <TextField
                    id="input-with-icon-textfield"
                    onBlur={saveCardName}
                    onChange={({ target: { value } }) => setcardName(value)}
                    value={cardName}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <ViewAgendaIcon />
                        </InputAdornment>
                    ),
                    }}
                />
                <div ref={drop}>    
                    {
                    
                        card.tasks?.length ? card.tasks.map(t => t ? <Task key={t.id} cardId={card.id} _task={t} /> : '') : <p> no tasks </p>
                    }
                </div>
                <Button variant="outlined" className={classes.btnAdd}
                    onClick={onAddTask}
                >+</Button>
            </Paper>
        </div>
    )
}

export default function TargetCard(props)
{
    const [card, setcard] = useState(props.card);
    const { task, board, setboard } = useContext(BoardContext); 

    const handleDrop = useCallback((id) =>
    {
        let tmpT = null;
        board.cards.find(c => tmpT = c.tasks?.find(t => t.id === id));
        console.log(tmpT);
        console.log('before ', board);
        let b = { ...board, cards: board.cards.map(c => ({ ...c, tasks: c.tasks ? c.tasks.filter(t => t.id !== id) : [] })) };
        console.log('after ', b);

        let thisTasks = card.tasks ? card.tasks.filter(t => t.id !== id) : undefined;
        let thisCard = { ...card, tasks: thisTasks ? [...thisTasks, tmpT] : [tmpT] };

        b = { ...b, cards: b.cards.map(c => c.id === card.id ? thisCard : c) };
        console.log('finish ', b);
        setboard(b);


        console.log("syka  ---> ", id);
         
    }, []);
    return (<Card {...props}  onDrop={handleDrop}/>);
};