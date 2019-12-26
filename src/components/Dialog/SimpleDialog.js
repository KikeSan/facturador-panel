/* eslint object-curly-newline: ["error", {"multiline": true, "minProperties": 5}] */

import React, { useState, useEffect } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { DialogActions } from '@material-ui/core';

const SimpleDialog = (props) => {
  const { open, onClose, title = '', message = '' } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={handleClose}>
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" autoFocus disableElevation>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;
