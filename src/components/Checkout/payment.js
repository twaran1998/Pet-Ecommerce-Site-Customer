import React, { useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Sheader from "../navbar/navbar";
import Footer from "../footer/footer";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  error: {
    color: "red",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CardDetailsForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const { value, onChange } = useState();
  const handleDateChange = (event) => {
    setAge(event.target.value);
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setFirstNameError(!event.target.value.match(/^(?!\s*$).+/));
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setLastNameError(!event.target.value.match(/^(?!\s*$).+/));
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setPhoneError(!event.target.value.match(/^\d+$/));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(
      !event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    );
  };
  const handleChange = (event) => {
    const input = event.target.value;
    const regex = /^\d+$/; // Regular expression for validation
    if (regex.test(input)) {
      setExpiryDate(input);
    }
  };
  const handleCardNumberChange = (event) => {
    const value = event.target.value;
    // check if value is 10 digits only
    if (/^\d{0,10}$/.test(value)) {
      setCardNumber(value);
    }
  };

  const handleCardHolderNameChange = (event) => {
    const value = event.target.value;
    // check if value is name only (no numbers or special characters)
    if (/^[a-zA-Z ]*$/.test(value)) {
      setCardHolderName(value);
    }
  };

  const handleExpiryDateChange = (date) => {
    setExpiryDate(date);
  };

  const handleSecurityCodeChange = (event) => {
    const value = event.target.value;
    // check if value is 3 digits only
    if (/^\d{0,3}$/.test(value)) {
      setSecurityCode(value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Check for errors before submitting the form
    if (firstNameError || lastNameError || phoneError || emailError) {
      return alert(
        "Error submitting form: Please fix the errors and try again."
      );
    }
    // Submit the form if there are no errors
    goToInvoice();
  };

  const goToInvoice = () => {
    try {
      window.location.href = "/invoice";
    } catch (error) {
      console.error("Error navigating to invoice:", error);
    }
  };

  return (
    <>
      <Sheader></Sheader>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "550px",
            marginBottom: "30px",
            padding: "0 10px",
          }}
        >
          <h6 style={{ textAlign: "Left", marginTop: "15px" }}>
            Personal Details <hr />
          </h6>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label='First Name'
                variant='outlined'
                fullWidth
                margin='normal'
                value={firstName}
                onChange={handleFirstNameChange}
                error={firstNameError}
                helperText={firstNameError && "Please enter your first name."}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Last Name'
                variant='outlined'
                fullWidth
                margin='normal'
                value={lastName}
                onChange={handleLastNameChange}
                error={lastNameError}
                helperText={lastNameError && "Please enter your last name."}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Phone Number'
                variant='outlined'
                fullWidth
                margin='normal'
                value={phone}
                onChange={handlePhoneChange}
                error={phoneError}
                helperText={phoneError && "Please enter a valid phone number."}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Email Address'
                variant='outlined'
                fullWidth
                margin='normal'
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                helperText={emailError && "Please enter a valid email address."}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Select
                value={age}
                onChange={handleDateChange}
                displayEmpty
                inputProps={{ "aria-label": "Select Country" }}
                fullWidth
                style={{ fontSize: "16px", marginTop: "35px" }}
              >
                <MenuItem value='' disabled>
                  Select Country
                </MenuItem>
                <MenuItem value={10}>Canada</MenuItem>
                <MenuItem value={20}>India</MenuItem>
                <MenuItem value={30}>Bangladesh</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Pincode'
                variant='outlined'
                fullWidth
                margin='normal'
                inputProps={{
                  maxLength: 6,
                  pattern: "^\\w{1,6}$",
                  title: "Please enter a valid pincode",
                }}
                required
              />
            </Grid>
          </Grid>

          <h6 style={{ textAlign: "Left", marginTop: "55px" }}>
            Card Details <hr />
          </h6>
          <TextField
            label='Name of Card Holder'
            variant='outlined'
            fullWidth
            margin='normal'
            value={cardHolderName}
            onChange={handleCardHolderNameChange}
            required
          />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                value='credit'
                control={<Radio />}
                label='Credit Card'
                checked={value === "credit"}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                value='debit'
                control={<Radio />}
                label='Debit Card'
                checked={value === "debit"}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                value='gift'
                control={<Radio />}
                label='Gift Card'
                checked={value === "gift"}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                label='Card Number'
                variant='outlined'
                fullWidth
                margin='normal'
                value={cardNumber}
                onChange={handleCardNumberChange}
                required
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <TextField
                label='Security Code'
                variant='outlined'
                fullWidth
                margin='normal'
                value={securityCode}
                onChange={handleSecurityCodeChange}
                type='password'
                required
                inputProps={{ maxLength: 3 }}
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <TextField
                label='Expiry Date'
                variant='outlined'
                fullWidth
                margin='normal'
                value={expiryDate}
                onChange={handleChange}
                placeholder='MM/YYYY'
                inputProps={{
                  maxLength: 6,
                  title: "Expiry date should be in the format MM/YYYY",
                }}
                required
              />
            </Grid>
          </Grid>

          <TextField
            label='$ 100'
            variant='outlined'
            fullWidth
            margin='normal'
            type='number'
            InputProps={{
              inputProps: {
                min: 0,
                style: { color: "black", fontWeight: "bold" },
              },
            }}
            disabled={true}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Button
              type='submit'
              style={{
                borderRadius: 50,
                width: 600,
                height: 50,
                backgroundColor: "green",
              }}
              variant='contained'
              color='primary'
              onClick={goToInvoice}
            >
              PAYMENT ORDER
            </Button>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </>
  );
};

export default CardDetailsForm;