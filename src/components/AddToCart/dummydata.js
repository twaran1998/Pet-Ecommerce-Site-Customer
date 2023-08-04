import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginBottom: 40,
  },
});

const InvoiceTable = () => {
  const classes = useStyles();

  const invoiceData = [
    {
      productId: "6412495e0e423b6ecbfac0fa",
      productName: "test234",
      productPrice: "34",
    },
  ];

  const taxRate = 0.13;

  const subtotal =
    parseFloat(invoiceData[0].productPrice) +
    parseFloat(invoiceData[0].productPrice) * taxRate;
  const tax = parseFloat(invoiceData[0].productPrice) * taxRate;

  return (
    <>
      <TableContainer component={Paper}>
        <Typography variant='h4' component='h1'>
          Invoice Of Swagimals
        </Typography>
        <Table className={classes.table} aria-label='invoice table'>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              style={{ height: "200px", width: "100%" }}
            >
              <Table style={{ height: "100%", width: "100%" }}>
                <TableBody>
                  <TableRow>
                    <TableCell>Name:</TableCell>
                    <TableCell>twaran sahai</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ID:</TableCell>
                    <TableCell>123232</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{ height: "200px", width: "100%" }}
            >
              <div style={{ height: "100%", width: "100%" }}>
                <Table style={{ height: "100%", width: "100%" }}>
                  <TableBody>
                    <TableRow>
                      <TableCell>Mobile Number:</TableCell>
                      <TableCell>123131231</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email Address:</TableCell>
                      <TableCell>TSAHAI2677@GMAIL.COM</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Grid>
          </Grid>

          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>

          <TableBody>
            <TableRow>
              <TableCell>{invoiceData[0].productName}</TableCell>
              <TableCell>${invoiceData[0].productPrice}</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={1}>Subtotal:</TableCell>
              <TableCell>${subtotal.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={1}>
                Tax ({(taxRate * 100).toFixed(0)}%):
              </TableCell>
              <TableCell>${tax.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={1}>Total:</TableCell>
              <TableCell>${(subtotal + tax).toFixed(2)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default InvoiceTable;
