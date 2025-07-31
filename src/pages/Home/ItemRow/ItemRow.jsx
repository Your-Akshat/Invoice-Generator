import React, { useState } from "react";
import { TableRow, TableCell, Typography, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import DeleteDialogue from "../../../library/components/DeleteDialogue/DeleteDialogue";

const ItemRow = ({ item, onDelete }) => {
  const [isDialogueOpen, setDialogueOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openDeleteDialogue = () => {
    setDialogueOpen(true);
  };

  const closeDeleteDialogue = () => {
    setDialogueOpen(false);
  };

  const deleteItem = async () => {
    try {
      setIsLoading(true);
      await onDelete();
      closeDeleteDialogue();
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to delete: ", error);
    }
  };

  return (
    <>
      {item && (
        <TableRow>
          <TableCell>
            <Typography>{item?.name}</Typography>
          </TableCell>
          <TableCell>
            <Typography>{item?.price}</Typography>
          </TableCell>
          <TableCell>
            <Typography>{item?.quantity}</Typography>
          </TableCell>
          <TableCell>
            <Typography>{item?.quantity * item?.price || 0}</Typography>
          </TableCell>
          <TableCell>
            <IconButton size="small" color="error" onClick={openDeleteDialogue}>
              <Delete />
            </IconButton>
          </TableCell>
        </TableRow>
      )}

      <DeleteDialogue
        open={isDialogueOpen}
        close={closeDeleteDialogue}
        onSecondaryClick={closeDeleteDialogue}
        onPrimaryClick={deleteItem}
        disabler={isLoading}
      />
    </>
  );
};

export default ItemRow;
