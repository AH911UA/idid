import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {BoardContext} from '../../../contexts/board-context';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
}));

export default function GridImage({arrImage}) {
    const classes = useStyles();

    const {board, setboard} = useContext(BoardContext)

    const onBackgroundImg = (e, tile) => {
        e.stopPropagation();
        setboard({...board, back: tile});
        
        
        // todo set board background image
    }
    
    return (
        <div className={classes.root}>
            <GridList cellHeight={350} className={classes.gridList} cols={2}>
                {
                    arrImage.map((tile) => (
                        <GridListTile key={tile} cols={tile.cols || 1} onClick={(e) => onBackgroundImg(e, tile)}>
                            <img src={tile} />
                        </GridListTile>
                    ))
                }
            </GridList>
        </div>
    );
}