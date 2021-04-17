import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SignInApple from './../Home/SignInApple';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import logo from './../../photos/Group.png';
import smaLogo from './../../photos/SmallLogo.png'


const useStyles = makeStyles((theme) => ({
  root: {
      // background: 'linear-gradient(#ac1c13, #bf4342)',
      margin: '7px',
      borderRadius: '5px',
      background: '#ac1c13',
      paddingTop: '5px',
      paddingBottom: '5px',
      width: 'calc(100% - 12px)'
  },

}
));

export default function NavBar(props) {
  const matchWidth = useMediaQuery('(min-width:480px)');
  const classes = useStyles();

  var image = <img src={smaLogo} alt="Logo" width={90} height={65} />;
  if(matchWidth){
    image = <img src={logo} alt="Logo" width={300} height={65} />;
  }

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
          {image}
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <SignInApple onSignIn={props.onSignIn}/>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
