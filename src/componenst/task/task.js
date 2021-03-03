import React, {useContext, useEffect, useState, useMemo} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { BoardContext } from '../../contexts/board-context'
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';

//
import { useDrag } from 'react-dnd';
//

import {MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: '1rem'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        marginRight: 10,
        width: 150 
    },
    onHeading:
    {
        width: '100%'
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    },
    secondaryHeadingHide: 
    {
        display: 'none'
    },
    description:
    {
        width: '100%' 
    },
    selectTask:
    {
        backgroundColor: '#EEEEEE'
    }
}));

export default function Task({ cardId, _task }) {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    
    const [onDescriptionState, setonDescriptionState] = useState(_task.description)
    const [onExcState, setonExcState] = useState(_task.exs)

    const { board, setboard } = useContext(BoardContext);
    const [task, settask] = useState({ ..._task });
    const [isTask, setisTask] = useState(false);
    const [isColor, setisColor] = useState(false);
  

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [selectedDate, setSelectedDate] = React.useState(task.date ? new Date(task.date).toUTCString() : new Date().toUTCString());
    
    useEffect(() => {
        settask({ ...task, date: selectedDate });
    }, [selectedDate])

    useEffect(() => {
        setboard({
            ...board,
            cards: board.cards.map(c => c.id === cardId ? {...c, tasks: c.tasks?.map(t => t.id === task.id ? task : t )} : c)
        });
        
    }, [task])

    const handleDateChange = (_date) => {
        setSelectedDate(_date);
        // settask({...task, date: onExcState})
        // console.log("Board : ", board);
    };

    function onExc({ target: { value } }) {
        setonExcState(value);     
    }
    function saveExc() {
        if (task.exs !== onExcState)
            settask({ ...task, exs: onExcState }) 
        setisTask(false);
    }

    function onDescription({ target: { value } }) {
        setonDescriptionState(value);
    }
    function saveOnDescription() {
        if (task.description !== onDescriptionState)
            settask({...task, description: onDescriptionState})
    }


  

    //

    const [{ isDragging }, drag] = useDrag(() => ({
        item: { type: `task`, id: task.id },
        canDrag: true,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [task]);

    
     
     const containerStyle = useMemo(() => ({
         opacity: isDragging ? 0.4 : 1,
         cursor: 'move',
     }), [isDragging]);

    return (
        <div className={classes.root} ref={drag} style={containerStyle}>  
          
            {
                <Accordion 
                    expanded={expanded === task.id} className={expanded ? classes.selectTask : ''}
                    onChange={handleChange(task.id)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <TextField
                            onFocus={() => setisTask(true)}
                            className={ isTask ? classes.onHeading : classes.heading}
                            id="outlined-size-small"
                            variant="outlined"
                            label="task"
                            size="small"
                            value={onExcState}
                            onChange={onExc}
                            onBlur={saveExc}
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.secondaryHeading}>
                            <KeyboardDatePicker
                                className={isTask ? classes.secondaryHeadingHide : ''}
                                id="date-picker-dialog"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>                          
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField 
                            className={classes.description}
                            label="description"
                            id="outlined-size-small"
                            defaultValue="Small"
                            variant="outlined"
                            size="small" 
                            multiline
                            value={onDescriptionState}
                            onBlur={saveOnDescription}
                            onChange={onDescription}
                        />
                        
                    </AccordionDetails>
                </Accordion>  
            } 
        </div>
    );
}

