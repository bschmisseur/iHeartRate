import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    welcome: {
        textAlign: 'left',
        fontWeight: '250',
        fontSize: '28px'
      },
      signIn: {
        textAlign: 'right',
        fontWeight: '250',
      },
      button: {
        background: 'linear-gradient(#ac1c13, #bf4342)',
        color: 'white',
        fontWeight: '300',
      },
}));

const Heading = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.heading}>
            <div className={classes.rootHead}>
                <Grid container spacing={3}>
                    <Grid className={classes.welcome} item xs={8}>
                        Welcome, {props.displayName}
                        <div style={{fontSize: '20px'}}>This is your Dashboard</div>
                    </Grid>
                    <Grid className={classes.signIn} item xs={4}>
                        <IconButton onClick={props.handelRefresh} style={{marginRight: '10px'}}><RefreshIcon /></IconButton>
                        <Button disabled={props.datesButtonDis} className={classes.button} onClick={props.handleClickOpenDate}>Select Dates</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Heading
