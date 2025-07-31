import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const DeleteDialogue = ({
  open,
  onClose,
  onSecondaryClick,
  onPrimaryClick,
  disabler,
  title = "Delete Item",
  content = "Do you want to delete this item?",
  primaryText = "Confirm",
  secondaryText = "Cancel",
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button
          onClick={onSecondaryClick}
          color="secondary"
          disabled={disabler}
        >
          {secondaryText}
        </Button>
        <Button onClick={onPrimaryClick} color="primary" disabled={disabler}>
          {primaryText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialogue;
