import React, { useEffect, useState, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/user-context'
import getImage from '../../servises/getImage'
import { BoardContext } from '../../contexts/board-context'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxHeight: '100vh',
        // backgroundColor: '#E8F5E9',
        
        // boxShadow: `0 1px 4px rgba(0, 0, 0, .3),
        //     0 0 20px 0 rgba(0, 0, 0, .6),
        //     23px 0 20px -23px rgba(0, 0, 0, .6),
        //     inset 0 0 40px rgba(0, 0, 0, .1)`,
        background: 'linear-gradient(45deg, #B2DFDB 50%, #DCEDC8 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 2px 15px 2px #FAFAFA',    
    },
    logo: {
        fontStyle: 'italic',
        textTransform: 'lowercase',
        left: 0
    },
    logoIn: {
        fontSize: '1.2rem',
    },
    itemPosition: {
        '& > div > div': {
            display: 'flex',
            justifyContent: 'space-between',
        }
    },
    list: {
        width: 250,
        '& a': 
            {
                display: 'flex',
                textDecoration: 'none',
                '&:visited': 
                {
                  color: 'black'      
                } 
            }
    },
});

export default function Menu() {
    const classes = useStyles();
    const [menu, setmenu] = React.useState(false);
    const [value, setValue] = React.useState(0);

    const { setisLoginUser } = useContext(UserContext);
    const {setboard} = useContext(BoardContext)
  
    const vWidth  = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

    const handleChange = (event, newValue) => {
        
        setValue(newValue);
    };

    const logo = <p> d<span className={classes.logoIn}> i </span> d </p>
    

    const toggleDrawer = () =>{ 
        setmenu(!menu);
    };

    

    return (   
        <>
            <Paper className={classes.root}>
                <Tabs 
                    className={classes.itemPosition}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    justifyContent="flex-start"
                >
                    <Tab className={classes.logo} label={logo} onClick={toggleDrawer} />
                    
                    <Tab label="Sing Out"
                        // justifyContent="flex-end" 
                        onClick={() => {
                                setboard({
                                    id: 0,
                                    title: '',
                                    cards: [],
                                })
                                setisLoginUser(false)
                            }}
                        />
                </Tabs>
            </Paper>

            <Drawer anchor='left' open={menu} onClick={() => toggleDrawer(!menu)} onClose={() => toggleDrawer(!menu)}>
               
                <div 
                    className={classes.list} 
                    role = "presentation"
                >
                    <List>
                        <ListItem button key={'home'}>
                            <Link to='/'>
                                <ListItemIcon>  <i class="material-icons">home</i> </ListItemIcon>
                                <ListItemText primary='Home' />
                            </Link>
                        </ListItem>
                        <ListItem button key={'myBoards'}>
                            <Link to='/my-boards'>
                                <ListItemIcon>  <i class="material-icons">dashboard</i> </ListItemIcon>
                                <ListItemText primary='My boards' />
                            </Link>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
                
            </Drawer>   
            
        </>
    );
}