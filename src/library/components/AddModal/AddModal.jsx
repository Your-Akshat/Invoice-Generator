import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const AddModal = ({
  open,
  onClose,
  newItem,
  errors,
  handleInputChanges,
  onPrimaryClick,
  onSecondaryClick,
  title = "Add Item",
  primaryText = "Add",
  secondaryText = "Cancel",
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Item Name"
          name="name"
          value={newItem?.name ?? ""}
          onChange={handleInputChanges}
          error={!!errors?.name}
          helperText={errors?.name}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Price"
          name="price"
          value={newItem?.price ?? ""}
          onChange={handleInputChanges}
          error={!!errors?.price}
          helperText={errors?.price}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Quantity"
          name="quantity"
          value={newItem?.quantity ?? ""}
          onChange={handleInputChanges}
          error={!!errors?.quantity}
          helperText={errors?.quantity}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSecondaryClick}>{secondaryText}</Button>
        <Button color="primary" variant="contained" onClick={onPrimaryClick}>
          {primaryText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
