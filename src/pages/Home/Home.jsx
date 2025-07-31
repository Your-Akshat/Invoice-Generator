import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from "@mui/material";
import ItemRow from "./ItemRow/ItemRow";
import Payment from "./Payment Section/Payment";
import AddModal from "./../../library/components/AddModal/AddModal";
import { throttle } from "lodash";

const Home = () => {
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });
  const [myErrors, setMyErrors] = useState({});
  const subTotal = invoiceItems.reduce(
    (total, item) => total + item?.price * item?.quantity,
    0
  );
  const taxAmount = subTotal * 0.05;
  const grandTotal = subTotal + taxAmount;

  const openAddModal = () => {
    setIsAdding(true);
  };

  const closeAddModal = () => {
    setIsAdding(false);
  };

  const addItem = throttle(async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setMyErrors(validationErrors);
    } else {
      try {
        setIsLoading(true);
        setInvoiceItems((prev) => [...prev, newItem]);
        setNewItem({ name: "", price: 0, quantity: 0 });
        closeAddModal();
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to add: ", error);
      }
    }
  }, 2000);

  const validateForm = () => {
    const newErrors = {};

    if (!newItem.name.trim()) newErrors.name = "Name is required";

    if (!newItem.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(newItem.price)) {
      newErrors.price = "Price must be a number";
    } else if (Number(newItem.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!newItem.quantity) {
      newErrors.quantity = "Quantity is required";
    } else if (isNaN(newItem.quantity)) {
      newErrors.quantity = "Quantity must be a number";
    } else if (Number(newItem.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }

    return newErrors;
  };

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getInvoiceItems = async () => {
    try {
      setIsLoading(true);
      setInvoiceItems([]);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch: ", error);
    }
  };

  useEffect(() => {
    getInvoiceItems();
  }, []);

  return (
    <Paper elevation={4} className={styles.paper_container}>
      <h1 className={styles.heading}>Invoice Generator</h1>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceItems.length === 0 ? (
              <TableRow>
                <TableCell className={styles.notFoundError} colSpan={5}>
                  {invoiceItems?.length === 0 ? (
                    <Typography>No items available</Typography>
                  ) : (
                    <Typography>Fetching Items... Please wait!!</Typography>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              invoiceItems.map((item, index) => (
                <ItemRow
                  key={index}
                  item={item}
                  fetchUpdates={getInvoiceItems}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        onClick={openAddModal}
        variant="contained"
        color="primary"
        className={styles.addButton}
        disabled={isLoading}
      >
        + Add Item
      </Button>

      <Payment
        invoiceItems={invoiceItems}
        subTotal={subTotal}
        taxAmount={taxAmount}
        grandTotal={grandTotal}
      />

      <AddModal
        open={isAdding}
        onClose={closeAddModal}
        newItem={newItem}
        errors={myErrors}
        handleInputChanges={handleInputChanges}
        onPrimaryClick={addItem}
        onSecondaryClick={closeAddModal}
      />
    </Paper>
  );
};

export default Home;
