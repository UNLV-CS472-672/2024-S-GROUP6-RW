// 2024-S-GROUP6-RW\frontend\src\pages\getting_started\SignInPopUp.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import SignInDialog from "./../login-register/SignInDialog";
import {getFromLocal } from '../../utils/LocalStorageManager';

const SignInPopUp = ({ open, handleClose }) => {
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    handleClose(); // Close the modal
    setShowSignInDialog(true); // Open the SignInDialog
  };

  const handleContinue = () => {
    handleClose(); // Close the modal
    const coords = (getFromLocal('LocationCoordinates'));
    const {lat, lon} = coords;
    const url = `/map?lat=${lat}&lng=${lon}`;
    navigate(url); // Navigate to the map page
  };

  return (
    <>
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
    {/* SignInDialog is conditional on showSignInDialog */}
    <SignInDialog open={showSignInDialog} fromGettingStartedPage={true} />
    </>
  );
};

export default SignInPopUp;
