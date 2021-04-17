import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TableChartIcon from '@material-ui/icons/TableChart';
import TimelineIcon from '@material-ui/icons/Timeline';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import Cookies from 'universal-cookie';
import ProfilePicture from './../Dashboard/ProfilePicture';

const drawerWidth = 240;
const drawerWidthSmall = 85;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
       width: drawerWidth,
      '@media (min-height: 575px)': {
        position: 'relative',
        minHeight: '100%',
        width: drawerWidth,
      },
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      textAlign: 'center',
      fontSize: '30px',
      fontWeight: '200'
    },
    drawerPaper: {
      width: drawerWidth,
      background: 'linear-gradient(#ac1c13, #bf4342)',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    icon: {
        color: 'white'
    },
    listLabel: {
        color: 'white',
        textAlign: 'left',
        textTransform: 'none'
    },
    avatar: {
        width: '100px',
        height: '100px',
        marginTop: '25px',
        marginBottom: '25px',
        fontSize: '25px',
        alignSelf: 'center'
    },
    topContenet: {
      paddingBottom: 0,
      '@media (min-height: 575px)': {
        paddingBottom: '8.5rem',
      }
    },
    bottomContenet: {
      position: 'unset',
      bottom: 'unset',
      height: 'unset',
      '@media (min-height: 575px)': {
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '8.5rem',

      }
    }
}));

const useStylesSmall = makeStyles((theme) => ({
    root: {
      display: 'flex',
       width: drawerWidth,
      '@media (min-height: 370px)': {
        position: 'relative',
        minHeight: '100%',
        width: drawerWidth,
      },
    },
    drawer: {
      width: drawerWidthSmall,
      flexShrink: 0,
      textAlign: 'left',
      fontSize: '32px',
    },
    drawerPaper: {
      width: drawerWidthSmall,
      background: 'linear-gradient(#ac1c13, #bf4342)',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    icon: {
        color: 'white',
        alignSelf: 'center'
    },
    listLabel: {
        color: 'white',
        textAlign: 'left',
        textTransform: 'none'
    },
    topContenet: {
      paddingBottom: 0,
      '@media (min-height: 370px)': {
        paddingBottom: '8.5rem',
      }
    },
    bottomContenet: {
      position: 'unset',
      bottom: 'unset',
      height: 'unset',
      '@media (min-height: 370px)': {
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '8.5rem',

      }
    }
}));

export default function SideBar(props) {
  const matchWidth = useMediaQuery('(min-width:900px)');
  const classes = useStyles();
  const classesSmall = useStylesSmall();
  const cookies = new Cookies();
  const curAppleId = cookies.get('currAppleId');
  const displayName = cookies.get('displayName');

  if(matchWidth) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <div className={classes.icon}>Welcome to iHeartRate!</div>
          <ProfilePicture
            displayName={displayName}
            curAppleId={curAppleId}
            small={false}
          />
          <div style={{color: 'white', fontSize: '20px', marginBottom: '15px'}}>{displayName}</div>
          <Divider style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', width: '90%', alignSelf: 'center'}}/>
          <List id="top-content" className={classes.topContenet}>
              <ListItem>
                  <Button onClick={props.handleTableClick} style={{width: '100%'}}>
                      <ListItemIcon className={classes.icon}><TableChartIcon /></ListItemIcon>
                      <ListItemText><Typography className={classes.listLabel}>Table</Typography></ListItemText>
                  </Button>
              </ListItem>
              <ListItem>
                  <Button onClick={props.handleGraphClick} style={{width: '100%'}}>
                      <ListItemIcon className={classes.icon}><TimelineIcon /></ListItemIcon>
                      <ListItemText><Typography className={classes.listLabel}>Chart</Typography></ListItemText>
                  </Button>
              </ListItem>
              </List>
              <List id="bottom-content" className={classes.bottomContenet}>
                  <Divider style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', width: '90%', marginLeft: '5%'}}/>
                  <ListItem style={{width: '100%'}}>
                      <a style={{width: '100%', textDecoration: 'none'}} href={"https://iheartrate-back.herokuapp.com/api/heartrate/" + curAppleId}>
                          <Button style={{width: '100%'}}>
                              <ListItemIcon className={classes.icon}><InsertDriveFileIcon /></ListItemIcon>
                              <ListItemText><Typography className={classes.listLabel}>Report Log</Typography></ListItemText>
                          </Button>
                      </a>
                  </ListItem>
                  <ListItem>
                      <Link to="/logout" style={{textDecoration: 'none', width: '100%'}}>
                          <Button style={{width: '100%'}}>
                              <ListItemIcon className={classes.icon}><ExitToAppIcon /></ListItemIcon>
                              <ListItemText><Typography className={classes.listLabel}>Logout</Typography></ListItemText>
                          </Button>
                      </Link>
                  </ListItem>
              </List>
          </Drawer>
      </div>
    );
  } else {
    return (
      <div id="full-side-bar" className={classesSmall.root}>
        <CssBaseline />
        <Drawer
          className={classesSmall.drawer}
          variant="permanent"
          classes={{
            paper: classesSmall.drawerPaper,
          }}
          anchor="left"
        >
          <ProfilePicture
            displayName={displayName}
            curAppleId={curAppleId}
            small={true}
          />
          <Divider style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', width: '90%', alignSelf: 'center'}}/>
          <List className={classesSmall.topContenet}>
              <ListItem>
                  <Link style={{textDecoration: 'none'}}>
                      <IconButton onClick={props.handleTableClick} className={classesSmall.icon}>
                          <TableChartIcon />
                      </IconButton>
                  </Link>
              </ListItem>
              <ListItem>
                  <Link style={{textDecoration: 'none'}}>
                      <IconButton onClick={props.handleGraphClick} className={classesSmall.icon}>
                           <TimelineIcon />
                      </IconButton>
                  </Link>
              </ListItem>
              </List>
              <List className={classesSmall.bottomContenet}>
                  <Divider style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', width: '90%', marginLeft: '5%'}}/>
                  <ListItem>
                        <a style={{width: '100%', textDecoration: 'none'}} href={"https://iheartrate-back.herokuapp.com/api/heartrate/" + curAppleId}>
                          <IconButton className={classesSmall.icon}>
                              <InsertDriveFileIcon />
                          </IconButton>
                        </a>
                  </ListItem>
                  <ListItem>
                      <Link to="/logout" style={{textDecoration: 'none'}}>
                          <IconButton className={classesSmall.icon}>
                             <ExitToAppIcon />
                          </IconButton>
                      </Link>
                  </ListItem>
              </List>
          </Drawer>
      </div>
    );
  }
}
