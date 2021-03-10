import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ImageIcon from '@material-ui/icons/Image';

import getImage, {getListImage} from '../../../servises/getImage';
import GridImage from './grid-image'

const useStyles = makeStyles((theme) => ({
    settings:
    {
        height: '100%',
        '& > *':
        {
            height: '100%'
        }
    },
    list: {
        width: 500,
        height: '100%',
        backgroundColor: '#212121',
        '& div': 
        {
            color: '#eeeeee'
        },
        '& svg':
        {
            color: '#424242'
        },
        '& ul>div:first-child:hover': {
            backgroundColor: '#E65100'
        },
    }
}));


export default function Settings({setisSave}) {
    const classes = useStyles();

    const [right, setState] = useState(false);

    const [bcgImg, setbcgImg] = useState([]);
    const [isBcgImg, setisBcgImg] = useState(false);
    const [isLoad, setisLoad] = useState(false)

    useEffect(() => {
        setisLoad(!!bcgImg.length);
    }, [bcgImg])

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(open);
        setisBcgImg(false);
    };

    const getList = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setisBcgImg(!isBcgImg);

        if(!isLoad){
            let arr = []
            getListImage('backgroung/', (url, len) => {
                arr.push(url);
                
                if(arr.length === len)
                    setbcgImg(arr);
            });
        }
            
        
    }
    

    return (
        <div className={classes.settings}>
            <Button variant="outlined" onClick={toggleDrawer(right, true)}>Settings</Button>
            <div>
                <Drawer anchor='right' open={right} onClose={toggleDrawer(!right, false)}>
                    <div
                        className={classes.list}
                        role="presentation"
                        onClick={toggleDrawer(right, false)}
                        onKeyDown={toggleDrawer(right, false)}
                    >
                        <List>
                             
                            <ListItem button onClick={getList}>
                                <ListItemIcon> <ImageIcon /> </ListItemIcon>
                                <ListItemText primary="backgroung" />
                            </ListItem>

                            <ListItem>
                                {
                                    isLoad ? <GridImage arrImage={bcgImg} setisSave={setisSave}/> : ''
                                }
                            </ListItem>
                           
                        </List>
                        <Divider />

                    </div>
                </Drawer>

            </div>
        </div>
    )
}


