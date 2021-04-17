import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    }
  },
  iconsBoxRoot: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
  copy: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      order: 12,
    }
  }
}));

export default function Footer(props) {
  const classes = useStyles();

  const content = {
    'copy': '© 2021 iHeartRate. All rights reserved.',
    ...props.content
  };

  return (
    <footer className={classes.root}>
      <Container maxWidth="lg">
        <Box py={2} display="flex" flexWrap="wrap" alignItems="center">
          <Typography color="textSecondary" component="p" gutterBottom={false} className={classes.copy}>{content['copy']}</Typography>
          <Box ml="auto" className={classes.iconsBoxRoot}>
            <IconButton aria-label="Instagram" onClick={event =>  window.location.href="https://www.instagram.com/iheartrate_official"}>
              <InstagramIcon />
            </IconButton>
            <IconButton aria-label="Github" onClick={event =>  window.location.href="https://github.com/bschmisseur/iHeartRate"}>
              <GitHubIcon />
            </IconButton>
            <IconButton aria-label="LinkedIn" onClick={event =>  window.location.href="https://www.linkedin.com/in/bschmisseur/"}>
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </footer>
  );
}