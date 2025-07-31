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
}from "@mui/material";
import ItemRow from "./ItemRow/ItemRow";

const tempItems = [
    {name : "Item1", price: 10, quantity: 5},
    {name : "Item2", price: 20, quantity: 4},
    {name : "Item3", price: 30, quantity: 3},
    {name : "Item4", price: 40, quantity: 2},
    {name : "Item5", price: 50, quantity: 1}
]

const Home = () => {
  
  const [invoiceItems, setInvoiceItems] = useState([]);

  const getInvoiceItems = async () => {
    setInvoiceItems(tempItems);
  };

  useEffect(() => {
    getInvoiceItems();
  }, [])

  return (
    <Paper elevation={4} className={styles.paper_container}>
      <h1 className={styles.main_heading}>Invoice Generator</h1>

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
                <TableCell colSpan={4} align="center">
                    No invoiceItems
                </TableCell>
                </TableRow>
            ) : (
                invoiceItems.map((item, index) => <ItemRow key={index} item={item} fetchUpdates={getInvoiceItems} />)
            )}
          </TableBody>
        </Table>
      </TableContainer>


    </Paper>
  );
};

export default Home;
