import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(() => ({
    signInButton: { 
        height: '35x',
        minWidth: '200px',
        borderRadius: '5px',
        color: 'white',
        backgroundColor: 'black',
        textTransform: 'none',
        fontSize: '15px',
        fontWeight: '500',
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "black"
        },
    }
}));

const useStylesSquare = makeStyles(() => ({
    signInButton: { 
        height: '44px',
        minHeight: '44px',
        width: '44px',
        minWidth: '44px',
        borderRadius: '5px',
        color: 'white',
        backgroundColor: 'black',
        textTransform: 'none',
        fontSize: '20px',
        fontWeight: '500',
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "black"
        },
    }
}));

export default function SignInApple(props) {
    const matchWidth = useMediaQuery('(min-width:700px)');
    const classes = useStyles();
    const classesSquare = useStylesSquare();

    var appleButton = <Button onClick={props.onSignIn} className={classes.signInButton}> Continue with Apple</Button>
    if(!matchWidth) {
        appleButton = <Button onClick={props.onSignIn} className={classesSquare.signInButton}></Button>
    }

    return (
        <div>
            {appleButton}
        </div>
    );
}
