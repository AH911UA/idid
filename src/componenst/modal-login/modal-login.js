import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import AccountCircle from '@material-ui/icons/AccountCircle';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useContext, useState } from 'react';
import { AlertContext } from '../../contexts/alert-context';
import { TrobberContext } from '../../contexts/trobber-context';
import {UserContext} from '../../contexts/user-context';
import login from '../../servises/login';
import registration from '../../servises/registration';
import checkNick from '../../servises/nickname';
import nickAndId from '../../servises/nickAndId'
import { Redirect   } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #1A237E',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    margin: {
        margin: theme.spacing(1),
    },
   withoutLabel: {
        marginTop: theme.spacing(3),
    },
}));

export default function ModalLogin() {
    const classes = useStyles();
    
    const { setalert, setisAlert } = useContext(AlertContext);  
    const { setisTrobber } = useContext(TrobberContext);
    const { isLoginUser, setisLoginUser, setuser, user } = useContext(UserContext);

    const [open, setOpen] = useState(true);
    const [isLogin, setisLogin] = useState(true);

    const [email, setemail] = useState();
    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });   
    const [nick, setnick] = useState(null)
    const [isContainsNick, setisContainsNick] = useState(false);

    const handleClose = () => {
        setOpen(!isLoginUser);
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const onWellcome = (isLog, u, error, isRegistr) => {

        if (isLog && !isRegistr) {
            setuser({ ...user, nick: u.nick, id: u.uid });
            setisTrobber(false);
            setisLoginUser(true);
        }
        else if (isLog && isRegistr)
        {
            nickAndId({ nick: u.nick, id: u.uid }, (isSaveNick, _user) => {
                setuser({ ...user, nick: u.nick, id: u.uid });
                setisTrobber(false);
                setisLoginUser(true);
            })    
        }
        else {
            setisTrobber(false);
            setalert({
                title: 'login error',
                deckription: error
            });
            setisAlert(true);
        }
    }
    

    const onSend = (e) => {
        e.preventDefault();

        if (!isLogin && !isContainsNick) return;

        setOpen(false);
        setisTrobber(true);

        if (isLogin)
            login({ email, password: values.password, nick }, onWellcome);

        else if (isContainsNick) {
            registration({ email, password: values.password, nick }, onWellcome)
        }
    }
    
    const onCheckNick = () => {
        if (!nick) return;
        checkNick(nick, setisContainsNick);
    }
    
 

  return (
    <div>
        {
            isLogin ? <Redirect to='/'/> : ''  
        }
      <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
      >
        <Fade in={open}>
          <div  className={classes.paper}  >
            <h2 id="transition-modal-title">Login</h2>
            
            <form onSubmit={onSend}>
                    <Box display="flex" flexDirection="column">
                    
                        <FormControl className={classes.margin} >
                            <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
                                <Input
                                    id="input-with-icon-adornment"
                                    onChange={ ({target}) => setemail(target.value)}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    }
                                />
                        </FormControl>
                        
                        <Box display="flex" alignItems="center" display={isLogin ? 'none' : ''}>
                            <TextField error={!isContainsNick} className={classes.margin}
                                label="Nickname"
                                type="text"
                                onChange={ ({target}) => setnick(target.value)}
                            />
                            <Button color="primary" onClick={onCheckNick}>Check</Button>          
                        </Box>

                        <FormControl className={clsx(classes.margin, classes.textField)}
                            
                        >
                            <InputLabel htmlFor="standard-adornment-password" >
                                Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setValues({ ...values, showPassword: !values.showPassword })}
                                    onMouseDown={(event) => event.preventDefault()}
                                    >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Box> 

                    <Box display="flex" justifyContent="space-between">          
                            <Button onClick={() => {
                                setisLogin(false);
                            }} 
                            type="submit"
                        >   
                            registration
                        </Button>
                        
                        <Button color="primary" onClick={ () => setisLogin(true) }
                            type="submit" 
                        >
                            Login
                        </Button>
                    </Box>  
                </form>              
            </div>
        </Fade>
      </Modal>
    </div>
  );
}