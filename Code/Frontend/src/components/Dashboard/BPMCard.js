import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
    bpmGrid: {
    },
    titleRate: {
        fontWeight: '300',
        fontSize: 'calc(100%)',
        textAlign: 'center',
        alignItems: 'center',
        marginBottom: '5vh'
    },
    listItems: {
        textAlign: 'center',
        
    },
    number: {
        fontSize: '1.5vw',
        fontWeight: '200',
        height: '100%',
    }
}));


const Averages = (props) => {
    const classes = useStyles();

    return (
            <Paper style={{padding: '15px', height: '23.5vh', maxHeight: '205px', width: '100%'}}>
                <div className={classes.titleRate}>{props.title}</div>
                <div style={{textAlign: 'center'}}>
                    <Button
                        style={{ background: 'transparent', boxShadow: 'none', cursor: 'default'}}
                        variant="contained"
                        color="grey"
                        size="large"
                        startIcon={<FavoriteIcon style={{color: '#808080'}} />}
                    >{props.bpm} BPM</Button>
                </div>
            </Paper>
    );
}

export default Averages
