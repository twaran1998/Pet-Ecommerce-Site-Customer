import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { useRef } from "react";
import emailjs from "emailjs-com";

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: 600,
    margin: "0 auto",
    padding: 20,
    // backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  formContainer: {
    paddingBottom: "2%",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFF",
  },
  "MuiOutlinedInput-notchedOutline": {
    border: "0px solid #ffffff3b !important",
  },
  input: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#FFF',
      },
      '&:hover fieldset': {
        borderColor: '#FFF',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FFF',
      },
    },
    width: "100%",
    padding: 10,
    border: "0 solid #FFF !important",
    borderRadius: 5,
    backgroundColor: "#FFF",
  },
  textarea: {
    resize: "vertical",
  },
  button: {
    display: "block",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    backgroundColor: "#D48F36",
    color: "#000",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0062cc",
    },
    submitBtnContainer: {},
  },
  newsletterDesc: {
    "font-size": "44%",
    padding: "3%",
    "text-align": "center",
  },
}));

function validateEmail(email) {
  // Regular expression to validate email address
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function Newletter() {
  function handleEmailChange(event) {
    setEmail(event.target.value);
    setIsValidEmail(validateEmail(event.target.value));
  }

  const classes = useStyles();
  const form = useRef();

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [email, setEmail] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        e.target,
        "fQRh6sPtMe8ZGvvsS"
      ) //account-> API Keys -> Public

      .then(
        (result) => {
          console.log(result.text);
          alert(
            "Thankyou for subscribing to the newsletter. Please check you mail for more details"
          );
          document.forms["newsletterForm"].reset();
          setEmail("");
        },
        (error) => {
          console.log(error.text);
          alert("Failed to register you for the newsletter");
        }
      );
  };

  return (
    <div className={classes.formContainer}>
      <div className="d-flex flex-column text-center mb-3">
        <div className="display-6 m-0 mt-3">
          <span style={{ color: "#FFF" }}>Sign up for our newsletter</span>
          <div className={classes.newsletterDesc}>
            Whether you're looking for advice on pet care or need help choosing
            the right product for your pet, we're here to assist you.
          </div>
        </div>
      </div>
      <form
        name="newsletterForm"
        ref={form}
        className={classes.form}
        onSubmit={sendEmail}
      >
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="name">
            Name:
          </label>
          <TextField
            className={classes.input}
            id="name"
            name="from_name"
            variant="outlined"
            placeholder="Please enter your full name"
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="email">
            Email:
          </label>
          <TextField
            className={classes.input}
            id="email"
            name="reply_to"
            type="email"
            variant="outlined"
            required
            value={email}
            placeholder="Please enter your email"
            onChange={handleEmailChange}
            InputProps={{
              notchedOutline: {
                borderWidth: 0,
              },
            }}
          />
          {!isValidEmail && (
            <p style={{ color: "red" }}>Please enter a valid email address</p>
          )}
        </div>
        <div id="submitBtnContainer" className={classes.submitBtnContainer}>
          <Button className={classes.button} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Newletter;
