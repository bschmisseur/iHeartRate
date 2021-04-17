import React, {  } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Chartkick, { LineChart } from 'react-chartkick';
import Highcharts from 'highcharts';
import 'date-fns';

Chartkick.use(Highcharts);

const useStyles = makeStyles(() => ({
    rootChart: {
        width: '100%',
      },
      chartTitle: {
          fontWeight: '300',
          fontSize: '24px',
          textAlign: 'center',
          padding: '10px'
      },
}));

const Graph = (props) => {
    const matchWidth = useMediaQuery('(min-width:1150px)');

    const classes = useStyles();

    return (
        <Paper className={classes.rootGraph}>
            <div className={classes.chartTitle}>
                BPM VS Time
            </div>
            <LineChart 
                height={props.height ? props.height : (matchWidth ? '40vh' : '420px')}
                messages={{empty: "No data"}}
                titel = "Heart Rate"
                ytitle= "Beats per Minute (BPM)"
                xtitle= "Date Time"
                data={props.data} 
                discrete = {true}
                colors = {['#ac1c13', '#ac1c13']}
                />
        </Paper>
    )
}

export default Graph
