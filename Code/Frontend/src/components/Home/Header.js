import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function Header() {

  const content = {
    'header': 'Get more out of your Apple Watch',
    'description': 'iHeartRate allows your apple watch to send and stores your beats per minute in to a database. The web application will then grab the heart rate information from the database and display it in a table in a graph. This way you can have more interaction with the information of the apple watch.',
    'primary-action': 'Sign up for free',
    'secondary-action': 'Read more',
  };
  return (
    <section>
      <Container maxWidth="lg">
        <Box py={8} textAlign="center">
          <Typography style={{fontWeight: '200'}} variant="h3" component="h2" gutterBottom={true}>{content['header']}</Typography>
          <Typography style={{fontWeight: '200'}} variant="h5" color="textSecondary" paragraph={true}>{content['description']}</Typography>
        </Box>
      </Container>
    </section>
  );
}