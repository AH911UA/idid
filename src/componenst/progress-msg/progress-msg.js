import React, { useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '60px'
    },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function ProgressMsg({alert}) {
    const classes = useStyles();

    const [showProgress, setshowProgress] = useState(true);
    const [msg, setmsg] = useState(alert ?? 'Wellcome')

    const handleClose = (event, reason) => {
        // if (reason === 'clickaway') {
        //     return;
        // }
         setshowProgress(false);
    };

    const handleClick = () => {
        setshowProgress(true);
    };

    // const errorMsg = <Alert severity="error">This is an error message!</Alert>
    // const warningMsg = <Alert severity="warning">This is a warning message!</Alert>
    // const infoMsg = <Alert severity="info">This is an information message!</Alert>
   

   
 
    return(
        <Snackbar className={classes.root} open={showProgress} autoHideDuration={2000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={() => handleClose()}>
            <Alert onClose={() => handleClose()} severity="success">
                { msg }
            </Alert>
        </Snackbar>
    )
};

