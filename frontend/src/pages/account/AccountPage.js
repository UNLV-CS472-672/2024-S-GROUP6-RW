import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import "../../css/AccountPage.css";
import ComplexityPassChecker from "../../components/ComplexityPassChecker/ComplexityPassChecker";

function AccountPage() {
  const [currentUsername, setCurrentUsername] = useState("TestAccount");
  const [currentPassword, setCurrentPassword] = useState("Password1"); // Default current password
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openUsernameDialog, setOpenUsernameDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [isPasswordComplex, setIsPasswordComplex] = useState(false); // State to track password complexity
  const [isPasswordMatch, setIsPasswordMatch] = useState(false); // State to track if new password and confirm password match
  const [isCurrentPasswordCorrect, setIsCurrentPasswordCorrect] =
    useState(true); // State to track if current password is correct
  const [passwordSpecifications, setPasswordSpecifications] = useState({
    hasMinLength: false,
    hasNoSpaces: false,
    hasCapitalLetter: false,
    hasNumber: false,
  });

  useEffect(() => {
    // Check if new password and confirm password match
    setIsPasswordMatch(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    // Check if all password complexity requirements are met
    setIsPasswordComplex(
      passwordSpecifications.hasMinLength &&
        passwordSpecifications.hasNoSpaces &&
        passwordSpecifications.hasCapitalLetter &&
        passwordSpecifications.hasNumber
    );
  }, [passwordSpecifications]);

  const handleOpenUsernameDialog = () => {
    setOpenUsernameDialog(true);
  };

  const handleCloseUsernameDialog = () => {
    setOpenUsernameDialog(false);
  };

  const handleOpenPasswordDialog = () => {
    setOpenPasswordDialog(true);
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
    // Reset isCurrentPasswordCorrect when the dialog closes
    setIsCurrentPasswordCorrect(true);
  };

  const handleChangeUsername = () => {
    if (newUsername.trim() !== "") {
      setCurrentUsername(newUsername);
      setNewUsername("");
      handleCloseUsernameDialog();
      alert("Username changed successfully!");
    } else {
      alert("Please enter a new username.");
    }
  };

  const handleChangePassword = () => {
    if (
      currentPasswordInput === currentPassword &&
      newPassword.trim() !== "" &&
      newPassword === confirmPassword
    ) {
      if (isPasswordComplex) {
        setCurrentPassword(newPassword);
        setNewPassword("");
        setConfirmPassword("");
        setOpenPasswordDialog(false);
        setCurrentPasswordInput(""); // Clear the current password input field
        alert("Password changed successfully!");
      } else {
        alert(
          "Please make sure the new password meets the complexity requirements."
        );
      }
    } else {
      setIsCurrentPasswordCorrect(currentPasswordInput === currentPassword);
    }
  };

  const handlePasswordChange = (password) => {
    setNewPassword(password);
    const specifications = {
      hasMinLength: password.length >= 8,
      hasNoSpaces: !/\s/.test(password),
      hasCapitalLetter: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
    };
    setPasswordSpecifications(specifications);
  };

  return (
    <div className="account-container">
      <div className="left-section">
        <h2 className="heading">Account Page</h2>
        <p>
          <strong>Current Username:</strong> {currentUsername}
        </p>
        <p>
          <strong>Current Password:</strong> {currentPassword}
        </p>
      </div>
      <div className="right-section">
        <Button
          variant="contained"
          onClick={handleOpenUsernameDialog}
          className="button"
        >
          Change Username
        </Button>
        <Dialog open={openUsernameDialog} onClose={handleCloseUsernameDialog}>
          <DialogTitle>Change Username</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter your new username:</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="newUsername"
              label="New Username"
              type="text"
              fullWidth
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUsernameDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleChangeUsername} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          variant="contained"
          onClick={handleOpenPasswordDialog}
          className="button"
        >
          Change Password
        </Button>
        <Dialog open={openPasswordDialog} onClose={handleClosePasswordDialog}>
          <DialogTitle>Change Password</DialogTitle>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleChangePassword();
            }}
          >
            <DialogContent style={{ height: "300px" }}>
              <TextField
                autoFocus
                margin="dense"
                id="currentPassword"
                label="Current Password"
                type="password"
                fullWidth
                value={currentPasswordInput}
                onChange={(e) => setCurrentPasswordInput(e.target.value)}
              />
              {!isCurrentPasswordCorrect && currentPasswordInput && (
                <p style={{ color: "red" }}>Current password is incorrect.</p>
              )}
              <TextField
                margin="dense"
                id="newPassword"
                label="New Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              <ul>
                <li>Password must be at least 8 characters long</li>
                <li>Password must not contain spaces</li>
                <li>Password must contain at least one capital letter</li>
                <li>Password must contain at least one number</li>
              </ul>
              <ComplexityPassChecker value={newPassword} />
              <TextField
                margin="dense"
                id="confirmPassword"
                label="Confirm New Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePasswordDialog} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={!isPasswordComplex || !isPasswordMatch}
              >
                Confirm
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
}

export default AccountPage;
