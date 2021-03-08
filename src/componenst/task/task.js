import React, { useContext, useEffect, useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { BoardContext } from '../../contexts/board-context'
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import PriorityTask from './priority-task'
//
import { useDrag } from 'react-dnd';
//

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: '1rem',
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
    selectTask:
    {
        backgroundColor: '#EEEEEE'
    },
    details: {
        '& > *':
        {
            margin: 'auto'
        }
    },
    description:
    {
        width: '100%'
    },
    buttonManager:
    {
        display: 'flex',
        justifyContent: 'center'
    }
}));

export default function Task({ cardId, _task, next, prev }) {

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
        settask({ ...task, date: selectedDate.toString() });
    }, [selectedDate])

    useEffect(() => {
        setboard({
            ...board,
            cards: board.cards.map(c => c.id === cardId ? { ...c, tasks: c.tasks?.map(t => t.id === task.id ? task : t) } : c)
        });

    }, [task])

    const handleDateChange = (_date) => setSelectedDate(_date);


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
            settask({ ...task, description: onDescriptionState });
    }


    const onDeleteTask = () => {
        setboard({ ...board, cards: board.cards.map(c => ({ ...c, tasks: c.tasks.filter(t => t.id !== task.id) })) });
    }

    const onNextTask = () => {
        let position = false;
        let currTask = null;

        setboard(
            {
                ...board, cards: board.cards.map(c => {
                    if (c.tasks?.find(t => t.id === task.id)) {
                        position = true;
                        return { ...c, tasks: c.tasks.filter(t => {
                            if(t.id === task.id)
                                currTask = t;
                            return t.id !== task.id
                        }) }

                    }
                    if (position) {
                        position = false;
                        return { ...c, tasks: c.tasks?.length ? [...c.tasks, currTask] : [currTask] };
                    }
                    return c;
                })
            }
        )

    }

    const onPrevTask = () => {
        let position = -1;
        let currTask = null;

        let arr = board.cards.map((c, i) => {
            if (c.tasks?.find(t => t.id === task.id)) {
                position = i - 1;
                return { ...c, tasks: c.tasks.filter(t => {
                    if(t.id === task.id)
                        currTask = t;
                    return t.id !== task.id
                }) }
            }
            return c;
        })

        setboard({
            ...board, cards: arr.map((c, i) => {
                if (position === i) {
                    position = -1;
                    return { ...c, tasks: c.tasks?.length ? [...c.tasks, currTask] : [currTask] }
                }
                return c;
            })
        })
    }


    // drag
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
    //


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
                        <PriorityTask id={task.id} color={task.priority} />
                        <TextField
                            onFocus={() => setisTask(true)}
                            id="outlined-size-small"
                            variant="outlined"
                            label="task"
                            size="small"
                            value={onExcState}
                            onChange={onExc}
                            onBlur={saveExc}
                        />

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

                    <AccordionDetails className={classes.details}>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                id="date-picker-dialog"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </AccordionDetails>

                    <AccordionDetails className={classes.buttonManager}>
                        <ButtonGroup aria-label="outlined secondary button group">
                            {
                                prev ? <Button onClick={onPrevTask}><KeyboardArrowLeftIcon /></Button> : ''
                            }
                            <Button onClick={onDeleteTask}><DeleteIcon color="secondary" /></Button>
                            {
                                next ? <Button onClick={onNextTask}><KeyboardArrowRightIcon /></Button> : ''
                            }
                        </ButtonGroup>
                    </AccordionDetails>
                </Accordion>
            }
        </div>
    );
}

