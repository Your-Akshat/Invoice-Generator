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
  const [isPrintingPDF, setPrintingPDF] = useState(false);

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
        setMyErrors({});
        closeAddModal();
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to add: ", error);
      }
    }
  }, 2000);

  const validateForm = () => {
    const newErrors = {};

    if (!newItem?.name?.trim()) {
      newErrors.name = "Name is required";
    } else if (!isNaN(newItem?.name?.trim())) {
      newErrors.name = "Number can't be name";
    } else if (!/^[a-zA-Z0-9-_ ]+$/?.test(newItem?.name?.trim())) {
      newErrors.name =
        "Name can only contain letters, numbers, hyphens (-), underscores (_) and spaces";
    } else if (newItem?.name?.trim().length > 35) {
      newErrors.name = "Name is longer than expected";
    }

    if (!newItem?.price?.toString()?.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(newItem?.price)) {
      newErrors.price = "Price must be a number";
    } else if (Number(newItem?.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    } else if (Number(newItem?.price) > 24999) {
      newErrors.price = "Price can't be greater than 24,999";
    } else if (/e/i?.test(newItem?.price?.toString())) {
      newErrors.price = "Scientific notation not allowed";
    }

    if (!newItem?.quantity?.toString()?.trim()) {
      newErrors.quantity = "Quantity is required";
    } else if (isNaN(newItem?.quantity)) {
      newErrors.quantity = "Quantity must be a number";
    } else if (Math?.ceil(Number(newItem?.quantity)) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    } else if (Number(newItem?.quantity) > 9999) {
      newErrors.quantity = "Quantity can't be more than 9999";
    } else if (/e/i?.test(newItem?.quantity?.toString())) {
      newErrors.quantity = "Scientific notation not allowed";
    }

    return newErrors;
  };

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "quantity") {
      const numericValue = Number(value);
      updatedValue = isNaN(numericValue) ? value : Math.ceil(numericValue);
    }

    setNewItem((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const deleteItem = (index) => {
    setInvoiceItems((prev) => prev.filter((_, i) => i !== index));
  };

  const printPDF = async () => {
    setPrintingPDF(true);
    // add printing logic
    setPrintingPDF(false);
  };

  const removeAllInvoiceItems = () => {
    localStorage.removeItem("invoice_items");
    setInvoiceItems([]);
  };

  const getInvoiceItems = () => {
    setIsLoading(true);
    try {
      const storedItems = localStorage.getItem("invoice_items");
      setInvoiceItems(storedItems ? JSON.parse(storedItems) : []);
    } catch (error) {
      console.error("Failed to fetch: ", error);
    }
    setIsLoading(false);
  };

  const syncInvoiceItems = () => {
    localStorage.setItem("invoice_items", JSON.stringify(invoiceItems));
  };

  useEffect(() => {
    getInvoiceItems();
  }, []);

  useEffect(() => {
    syncInvoiceItems();
  }, [invoiceItems]);

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
            {invoiceItems?.length === 0 ? (
              <TableRow>
                <TableCell className={styles.notFoundError} colSpan={5}>
                  {!isLoading && invoiceItems?.length === 0 ? (
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
                  onDelete={() => deleteItem(index)}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!isPrintingPDF && (
        <Button
          onClick={openAddModal}
          variant="contained"
          color="primary"
          className={styles.addButton}
          disabled={isLoading}
        >
          + Add Item
        </Button>
      )}

      <Payment
        invoiceItems={invoiceItems}
        subTotal={subTotal}
        taxAmount={taxAmount}
        grandTotal={grandTotal}
      />

      <div className={styles.printSection}>
        <Button
          onClick={printPDF}
          variant="contained"
          color="primary"
          className={styles.savePDFbutton}
        >
          Save PDF
        </Button>

        <Button
          onClick={removeAllInvoiceItems}
          className={styles.savePDFbutton}
          variant="outlined"
        >
          Reset All
        </Button>
      </div>

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
