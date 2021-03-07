import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import { UserContext } from './../../../contexts/user-context';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {sendAvatar} from '../../../servises/avatar-db';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
}));

export default function ImageAvatars() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { user, setuser } = useContext(UserContext);

    const onAvatar = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const offAvatar = () => {
        setAnchorEl(null);
    };

    const onLoadAva = (e) => {

        loadAva(e, (url) => {

            if(url === user.ava) return;

            sendAvatar(user, url, () => setuser({ ...user, ava: url }))
        });

        setAnchorEl(null);
    }


    return (
        <div className={classes.root}>
            {/* <Avatar onClick={onAvatar} alt="Remy Sharp" src="/broken-image.jpg" className={classes.orange} /> */}
            <Avatar alt="Remy Sharp" 
            // className={classes.orange}
            className={classes.large}
                onClick={onAvatar}
                aria-haspopup="true" 
                src={`${user.ava}`}
            >
                {
                    user.nick[0]
                }
            </Avatar>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open}
                onClose={offAvatar}
            >
                <input
                    accept="image/*"
                    className={classes.input}
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    // onClick={e => onLoadAva(e)}
                    onChange={e => onLoadAva(e)}
                />
                <label htmlFor="raised-button-file">
                    <MenuItem  > Load avatar </MenuItem>
                </label>
                <MenuItem onClick={offAvatar}>My account</MenuItem>
            </Menu>
            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} /> */}
        </div>
    );
}


function loadAva(e, callback) {

    for (let i = 0; i < e.target.files.length; i++) {
        let file = e.target.files[i];

        if (!file.type.startsWith('image/')) { continue }

        let reader = new FileReader();

        reader.onload = (aImg => e => {
            console.log(e.target.result);   // don't delete 
            callback(e.target.result);
            return e.target.result;
        })();

        reader.readAsDataURL(file);
    }
}