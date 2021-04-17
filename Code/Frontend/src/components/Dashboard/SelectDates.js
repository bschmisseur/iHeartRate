import React, {  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    }
}));

const SelectDates = (props) => {
    const classes = useStyles();
    
    return (
        <React.Fragment>
            <Dialog
                open={props.openDate}
                onClose={props.handleCloseDate}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Date Selector</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please select any two dates that you would like to pull information from:
                </DialogContentText>
                <form className={classes.form} noValidate>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DialogContentText>
                            Start Date:
                        </DialogContentText>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date"
                                format="MM/dd/yyyy"
                                value={props.selectedDateFrom}
                                onChange={props.handleDateChangeFrom}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            /> 
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Time"
                                value={props.selectedDateFrom}
                                onChange={props.handleDateChangeFrom}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                        <DialogContentText>
                            End Date:
                        </DialogContentText>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date"
                                format="MM/dd/yyyy"
                                value={props.selectedDateTo}
                                onChange={props.handleDateChangeTo}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            /> 
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Time"
                                value={props.selectedDateTo}
                                onChange={props.handleDateChangeTo}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleReset} color="primary">
                        Reset
                    </Button>
                <Button onClick={props.handleCloseDate} color="primary">
                    <b>Select</b>
                </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default SelectDates
