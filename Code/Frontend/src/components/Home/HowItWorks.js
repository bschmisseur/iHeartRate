import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import applewatch from '../../photos/AppleWatch.jpg';
import storage from '../../photos/Storage.jpg';
import mac from '../../photos/Computer.jpg';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'unset',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      alignContent: 'center'
    },
  },
  switchOrder1: {
    [theme.breakpoints.up('md')]: {
      order: 1,
    },
  },
  switchOrder0: {
    [theme.breakpoints.up('md')]: {
      textAlign: 'right',
      order: 0,
    }
  },
  stepContainer: {
    marginBottom: theme.spacing(4)
  },
  media: {
    width: '100%',
    height: '256px',
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100%)',
    },
  },
}));

export default function HowItWorks() {
  const classes = useStyles();
  
  const content = {
    '02_header': 'iHeartRate Setup',
    '02_description': 'iHeartRate has a three step process in order to secruely save and show your heart rate information',
    'step1': 'Collect Data Easily',
    'step1-desc': 'Your Apple Watch will start a workout as an out door walk in order to read your heart rate more frequently',
    'step2': 'Store Data Securly',
    'step2-desc': 'Your Apple Watch will send the heart rate data through secure channels in order to store the informaiton on our servers.',
    'step3': 'View Data Anywhere',
    'step3-desc': 'From our servers the iHeartRate website will be able to display the information to you and will give you an interactive dashbaord.',
  };

  return (
    <section>
      <Container maxWidth="md">
        <Box pt={1} textAlign="center">
          <Typography style={{fontFamily: '-apple-system-body, BlinkMacSystemFont, sans-serif', fontWeight: '200'}} variant="h3" component="h2" gutterBottom={true}>{content['02_header']}</Typography>
          <Typography style={{fontFamily: '-apple-system-body, BlinkMacSystemFont, sans-serif', fontWeight: '300'}} variant="subtitle1" color="textSecondary">{content['02_description']}</Typography>
        </Box>
      </Container>
      <Container maxWidth="lg" className={classes.root}>
        <Box pt={8} pb={10}>
          <Grid container spacing={6} className={classes.stepContainer}>
            <Grid item xs={12} md={6}>
              <Card className={classes.media} >
                <CardActionArea>
                  <CardMedia className={classes.media} image={applewatch} />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" height="100%">
                <Box my="auto">
                  <Typography style={{fontFamily: '-apple-system-body, BlinkMacSystemFont, sans-serif', fontWeight: '100'}} variant="h2" component="h3">01</Typography>
                  <Typography style={{fontFamily: '-apple-system-body, BlinkMacSystemFont, sans-serif', fontWeight: '100'}} variant="h4" component="h2" gutterBottom={true}>{content['step1']}</Typography>
                  <Typography style={{fontFamily: '-apple-system-body, BlinkMacSystemFont, sans-serif', fontWeight: '300'}} variant="body1" color="textSecondary" paragraph={true}>{content['step1-desc']}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={6} className={classes.stepContainer}>
            <Grid item xs={12} md={6} className={classes.switchOrder1}>
              <Card className={classes.media} >
                <CardActionArea>
                  <CardMedia className={classes.media} image={storage} />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} className={classes.switchOrder0}>
              <Box display="flex" height="100%">
                <Box my="auto">
                  <Typography style={{fontFamily: '-apple-system-body, BlinkMacSystemFont, sans-serif', fontWeight: '100'}} variant="h2" component="h3">02</Typography>
                  <Typography style={{fontFamily: '-apple-system-body, BlinkMacSystemFont, sans-serif', fontWeight: '100'}} variant="h4" component="h2" gutterBottom={true}>{content['step2']}</Typography>
                  <Typography style={{fontFamily: '-apple-system-body, BlinkMacSystemFont, sans-serif', fontWeight: '300'}} variant="body1" color="textSecondary" paragraph={true}>{content['step2-desc']}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Card className={classes.media} >
                <CardActionArea >
                  <CardMedia className={classes.media} image={mac} />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" height="100%">
                <Box my="auto">
                  <Typography style={{fontFamily: '-apple-system-body, BlinkMacSystemFont, sans-serif', fontWeight: '100'}} variant="h2" component="h3">03</Typography>
                  <Typography style={{fontFamily: '-apple-system-body, BlinkMacSystemFont, sans-serif', fontWeight: '100'}} variant="h4" component="h2" gutterBottom={true}>{content['step3']}</Typography>
                  <Typography style={{fontFamily: '-apple-system-body, BlinkMacSystemFont, sans-serif', fontWeight: '300'}} variant="body1" color="textSecondary" paragraph={true}>{content['step3-desc']}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}