// 2024-S-GROUP6-RW\frontend\src\pages\getting_started\SignInPopUp.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

const SignInPopUp = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    handleClose(); // Close the modal
    navigate('/login'); // Navigate to the sign-in page
  };

  const handleContinue = () => {
    handleClose(); // Close the modal
    navigate('/map'); // Navigate to the map page
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Would you like to sign in to save your data for next time? If you do not sign in, you can still continue without saving.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSignIn}>Sign In</Button>
        <Button onClick={handleContinue} autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignInPopUp;
