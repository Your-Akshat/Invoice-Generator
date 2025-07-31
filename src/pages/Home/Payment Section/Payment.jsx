import React from "react";
import {
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import styles from "./Payment.module.scss";

const Payment = ({ invoiceItems, subTotal, taxAmount, grandTotal }) => {
  return (
    <>
      <h2 className={styles.heading}>Payment Details</h2>
      {invoiceItems?.length === 0 ? (
        <Typography className={styles.notFoundError}>
          No items available
        </Typography>
      ) : (
        <TableContainer className={styles.totalTable}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography className={styles.subTotalText}>
                    Sub Total
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography className={styles.subTotalText}>
                    {subTotal.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>Taxes (5% of subtotal amount)</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{taxAmount.toFixed(2)}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography className={styles.grandTotalText}>
                    Grand Total
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography className={styles.grandTotalText}>
                    {grandTotal.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Payment;
