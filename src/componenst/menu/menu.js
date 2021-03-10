import React, { useEffect, useState, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
    import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
import { BoardContext } from '../../contexts/board-context';
import BoardTreeView from './board-tree-item';
import ImageAvatars, {loadAva} from './avatar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {sendAvatar} from '../../servises/avatar-db';

import Calendar from './calendar';


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxHeight: '100vh',
        // background: 'linear-gradient(45deg, #B2DFDB 50%, #DCEDC8 90%)',
        backgroundColor: '#212121',
        border: 0,
        borderRadius: 0,
        // boxShadow: '0 2px 15px 2px #FAFAFA',
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
        },
        '&  *:hover':
        {
            color: '#E65100'
        }
    },
    list: {
        width: 250,
        height: '100%',
        backgroundColor: '#212121',
        color: '#eee',
        '& *:hover':
        {
            cursor: 'pointer',
        },
        '& ul>div:first-child:hover': {
            backgroundColor: '#E65100',
        },
        '& .MuiTouchRipple-root:hover':
        {
            backgroundColor: 'red'
        },
        '& svg, & i': {
            color: '#424242',
        },

        '& a':
        {
            display: 'flex',
            color: '#eee',
            textDecoration: 'none',
            '&:visited':
            {
                backgroundColor: '#eee'
            },
        }
    },
    //  '.MuiTouchRipple-root:hover':
    //     {
    //         backgroundColor: 'red'
    //     },
});

export default function Menu() {
    const classes = useStyles();
    const [menu, setmenu] = React.useState(false);  
    const [value, setValue] = React.useState(0);

    const { setisLoginUser } = useContext(UserContext);
    const { setboard } = useContext(BoardContext);
    const { user, setuser } = useContext(UserContext);

    const vWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const logo = <p> d<span className={classes.logoIn}> i </span> d </p>


    const toggleDrawer = () => {
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

                    <Tab label={<ImageAvatars />} />

                    <Tab label="Sing Out"

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
                    role="presentation"
                >
                    <List >
                        <ListItem button key={'home'} >
                            <Link to='/' style={{display: 'flex', alignItems: 'center'}}>
                                <ListItemIcon>  <i class="material-icons">home</i> </ListItemIcon>
                                <ListItemText primary='Home' />
                            </Link>
                        </ListItem>
                        <ListItem button key={'myBoards'}>
                            {/* <Link to='/my-boards'> */}
                            {/* <ListItemIcon>  <i class="material-icons">dashboard</i> </ListItemIcon> */}
                            {/* <ListItemText primary='My boards' /> */}
                            <BoardTreeView />
                            {/* </Link> */}
                        </ListItem>
                    </List>
                    <Divider />
                    <List>

                        <ListItem button key='Avatar'>
                            <input
                                accept="image/*"
                                className={classes.input}
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                type="file"
                                // onClick={e => onLoadAva(e)}
                                onChange={e => (e, (url) => {
                                    if (url === user.ava) return;
                                    sendAvatar(user, url, () => setuser({ ...user, ava: url }))
                                })}
                            />
                            <label htmlFor="raised-button-file" style={{display: 'flex', alignItems: 'center' }}>
                                <ListItemIcon> <AccountBoxIcon /> </ListItemIcon>
                                <ListItemText primary='Load avatar'/>
                            </label>

                        </ListItem>

                        <ListItem>
                            <Calendar/>
                        </ListItem>
                    </List>
                </div>

            </Drawer>
        </>
    );
}