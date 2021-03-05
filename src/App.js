import './App.css';

import ModalLogin from './componenst/modal-login'
import Menu from './componenst/menu'
import { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TrobberContext } from './contexts/trobber-context'
import {AlertContext} from './contexts/alert-context';
import { UserContext } from './contexts/user-context';
import HomePage from './componenst/home-page'
import BoardPage from './componenst/board-page'
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
import ProgressMsg from './componenst/progress-msg';
import {BoardContext} from './contexts/board-context'


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#E0F2F1',
        height: '100vh'
    }
}));

function App() {
    const classes = useStyles();

    const { trobber, isTrobber } = useContext(TrobberContext);
    const { isAlert, getAlert } = useContext(AlertContext);
    const { user, isLoginUser } = useContext(UserContext);
    const { board } = useContext(BoardContext);

    const [page, setpage] = useState(true)
      
    useEffect(() => {
        console.log("page : ", page);
    }, [page])
    return (
        
            <div className={classes.root} style={board.back && !page ? 
                {backgroundImage: `url(${board.back})`, backgroundSize: '100%'}: {}}>
    
                {
                    isTrobber ? trobber : isAlert ? getAlert() : isLoginUser ? 
                        <>
                            <ProgressMsg alert={ `Wellcome ${user.nick}`}/>
                            <Router>
                                <Menu />
                            
                                <Switch>
                                    <Route exact path='/'>
                                        <HomePage setpage={setpage}/>
                                    </Route>
                                                                    
                                    <Route path='/boards/:id'>
                                        <BoardPage setpage={setpage}/> 
                                    </Route>
                                </Switch>
                            </Router> 
                        </>    

                    :   <ModalLogin/>

                }

            </div>
        
    );
}

export default App;
