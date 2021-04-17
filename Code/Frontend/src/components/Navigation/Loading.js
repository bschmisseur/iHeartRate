import React from 'react'
import ReactLoading from 'react-loading';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Loading(props) {

  return (
      <Dialog
        maxWidth={'lg'}
        open={props.open}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">iHeartRate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please wait while we Sign you in!
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ReactLoading type="bars" color="#888888"/>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
  );
}
