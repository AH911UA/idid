
import React, { useEffect, useState } from 'react';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Button from '@material-ui/core/Button';
// TODO сделать виджет календарь
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import moment from 'moment';
import { setDate } from 'date-fns';


const useStyles = makeStyles({
  root: {
    width: '100%',
    color: '#eee',
    textAlign: 'center',
    padding: 0,
    '& span':
    {
      display: 'inline-block',
      width: 30,
      height: 30,
      verticalAlign: 'middle'
    }
  },
  header:
  {
    backgroundColor: '#E65100',
    padding: 10,
    '& h3': { margin: 0 }
  },
  body: {
    minHeight: 180,
    maxHeight: 180
  },
  footer: {

  },
  week: {
    marginTop: 10,
    color: '#757575',
    fontWeight: '100',
  },
  currDay:
  {
    color: '#E65100'
  }
})

export default function Calendar() {

  const classes = useStyles();

  const [month, setmonth] = useState([]);

  const [date, setdate] = useState(moment());
  const daysName = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  useEffect(() => fild(date), [])

  const fild = (_date) => {

    let days = _date.daysInMonth();
    let count = 1;
    let month = [];

    const sDay =  new Date(`${+_date.format('M')} 1, ${_date.format('YYYY')}`).getDay();

    for (let i = 1; i <= 7; i++)
      month.push(i < sDay ?
        <span key={i + 100}>  </span>
        : <span key={count} className={+_date.format('DD') === count ? classes.currDay : ''}> {count++} </span>)

    while (count < days)
      month.push(<div>
        {
          daysName.map(d => count <= days ?
            <span key={count} className={+_date.format('DD') === count ? classes.currDay : ''}> {count++} </span>
            : <span> </span>)
        }
      </div>)

    setmonth(month);
  }

  const onEditMonth = (e, m) => {
    e.stopPropagation();
    let d = null;
    if (m === 1){
      if(+date.format('M') === 11){
        console.log('new year');
        d = date.add(1, 'years');
        d = date.set('month', 0);
      }
      else d = date.add(1, 'months');
    }
    else if (m === -1){
      d = date.subtract(1, 'months');
       
    }

    fild(d);
    setdate(d);
  }



  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h3> {date.format('DD')} <small> {date.format('MMMM')} </small> {date.format('YYYY')} </h3>
      </div>
      <div className={classes.body}>
        <div className={classes.week}> {daysName.map(d => <span> {d} </span>)}</div>
        <div>
          {
            month
          }
        </div>
      </div>
      <div>
        <Button onClick={e => onEditMonth(e, -1)}> <KeyboardArrowLeftIcon /> </Button>
        <Button onClick={e => onEditMonth(e, 1)}> <KeyboardArrowRightIcon /> </Button>
      </div>
    </div>
  );
}

