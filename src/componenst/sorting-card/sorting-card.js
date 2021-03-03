import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'; 
import { useContext, useState, useEffect } from 'react';
import { BoardContext } from '../../contexts/board-context'


const useStyles = makeStyles((theme) => ({
  formControl: {
    marginLeft: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

 

export default function SortingCard()
{
  
  const { SortingBoard, board } = useContext(BoardContext);

  const classes = useStyles();
  const [sorting, setsorting] = useState({
    sortby: '',
    name: board.sorting || 'Default'
  });

  useEffect(() => {
    setsorting({...sorting, name: board.sorting})
  }, [board.sorting])
  
  useEffect(() => {
      SortingBoard(sorting.name);
  }, [sorting])

  const handleChange = (event) => {
    // const name = event.target.name;
    setsorting({
      ...sorting,
      name: event.target.value,
    });
  };



  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="outlined-age-native-simple">Sorting</InputLabel>
      <Select
        native
        value={sorting.name}
        onChange={handleChange}
        label="Sorting"
        inputProps={{
          name: 'name',
          id: 'outlined-age-native-simple',
        }}
      >
       
        <option value='Default'>Default</option>
        <option value='Date'>Date</option>
        <option value='Priority'>Priority</option>
      </Select>
    </FormControl>
  )
}