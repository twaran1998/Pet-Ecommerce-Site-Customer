import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../App";

import { Typography } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const initialFromState = [
  {
    petType: "",
    petBreed: "",
    pincode: "",
  },
];

const useStyles = makeStyles((theme) => ({
  redBg: {
    backgroundColor: "#b80000",
    padding:'1vh'
  },
  adoptBox: {
    padding: "5%",
  },
}));

function PetAdoptionForm() {
  // const { token } = useContext(AppContext);
  const [petDdn, setpetDdn] = useState([]);   //for loading pet dropdown
  const [petBreedDdn, setpetBreedDdn] = useState([]);
  const [formValues, setFormValues] = useState(initialFromState);

  const [petType, setpetType] = useState("");   //for pet type on dropdown selectino
  const [petBreed, setpetBreed] = useState(""); //for pet breed on dropdown
  const [pinCode, setPinCode] = useState("");   //for pincode on form
  // const [token, setToken] = useState("");
  const [petData, setPetData] = useState([]);   //for getting 7 setting pet search results
  const [showLoading, setShowLoading] = useState(0); //to show laoding bar

  const [formErrors, setFormErrors] = useState({});

  const [token, setToken] = useState("");
  // Fetch token for petfinder
  async function fetchPetFinderToken(frm) {
    return await fetch("https://api.petfinder.com/v2/oauth2/token", {
      // mode:"no-cors",
      method: "POST",
      // headers: new Headers({ 'content-type': 'application/json' }),     //else will give request {} in server
      body: frm,
    });
  }


  // For petFinder token
  useEffect(() => {
    var frm = new FormData();
    frm.append("grant_type", process.env.REACT_APP_GRANT_TYPE);
    frm.append("client_id", process.env.REACT_APP_CLIENT_ID);
    frm.append("client_secret", process.env.REACT_APP_CLIENT_SECRET);

    fetchPetFinderToken(frm).then((dta) => {
      dta
        .json()
        .then((tk) => {
          // console.log('token ', tk.access_token);
          setToken(tk.access_token);
        })
        .catch((err) => console.log("Faiiled to fetch topen "));
    });
  }, []);

  //   useEffect(() => {
  //   if (token != null && token !== [] && token !== undefined && token !== "") {
  //     console.log("Pet finder token is = >", token);
  //     // AppContext.token = token;
  //   }
  // }, []);

  useEffect(() => {    
    const petType = fetchAnimalDdn(token)
      .then((petData) => {
        const petTypeDdnData = petData.types.map((pet) => {
          return pet.name;
        });
        // console.log("fetched petTypeDdnData", petTypeDdnData);
        setpetDdn(petTypeDdnData);
      })
      .catch((err) => {
        console.log("Error occured while fetching pet dropdown data ", err);
      });
  }, [token]);

  //Fetch Data from Searhc button click
  async function fetchPetData(token, petType, petBreed, postCode) {
    // console.log('token to fetch ', token)
    // "https://api.petfinder.com/v2/animals?type=dog&page=2"
    
    let petData = await fetch(
      `https://api.petfinder.com/v2/animals?type=${petType}&breed=${petBreed}`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + token,
          "content-type": "application/json",
        }),
      }
    );
    return petData;
  }

  //Fetch animal types dropdown
  async function fetchAnimalDdn(petToken) {
    //Don't uncomment this console. Not sure why but token is unefined if I comment below
    // console.log('Token in fetchAnimalDdn = ', petToken);
    let animalTypes = await fetch(`https://api.petfinder.com/v2/types`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + petToken,
        "content-type": "application/json",
      }),
    });
    let petTypes = animalTypes.json();

    return petTypes;
  }

  function hideAdoptionResults() {
    setPetData([]);
  }

  //Search button click to get filtered data
  async function handleSubmit(e) {
    e.preventDefault();
    if (petType === "" || petBreed === "")
      alert("Please enter Pet type and breed");
    else {
      setShowLoading(1);
      //Enable CORS Unblocker extension on Chrome for this to work, else it will say cannot fetch 'API' from localhost:3000

      //getOAuth Token for PetFinder on cURL
      // curl -d "grant_type=client_credentials&client_id=OREMsVHsdqH7Rj2FyAz6Pj3At5TSBNDApFObqt0PjO1ejQl5LI&client_secret=RaxhBa5hzaSPe9KNuR40X7POsUEa13qz3Ai9mMT7" https://api.petfinder.com/v2/oauth2/token
      // console.log("pet type ", petType);
      // console.log("pet breed ", petBreed);
      // console.log("pincde", pinCode);

      try {
        //Pass Access token to reveive pet data
        let petDatas = null;
        fetchPetData(token, petType, petBreed, pinCode)
          .then((petData) => {
            petDatas = petData.json();
            console.log("Pet data received"); //petDatas.then(d => console.log(d)));
            console.log("petdatas ", petDatas);
            petDatas.then((res) => {
              setPetData(res.animals);
            });

            // setPetData(petDatas.animals);
          })
          .catch((err) => {
            console.log("Failed to receive pet data ; ERROR => ", err);
          });
      } catch (err) {
        console.log("Failed to fetch data", err);
      }
    }
  }

  const classes = useStyles();

  //get pet breeds on petType dropdown click
  async function getPetBreed(pet) {
    let breeds = await fetch(
      `https://api.petfinder.com/v2/types/${pet}/breeds`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + token,
          "content-type": "application/json",
        }),
      }
    );
    let petBreeds = breeds.json();

    return petBreeds;
  }

  //handle petType dropdown change
  function onPetTypeChange(e) {
    let selectedPet = e.target.value;
    console.log("selected aninmal :", selectedPet);
    setpetType(e.target.value);

    //call api for petBreed
    getPetBreed(selectedPet)
      .then((resp) => {
        // console.log('pet breeds : ', resp);
        let petBreeds = resp.breeds.map((breed) => {
          return breed.name;
        });
        setpetBreedDdn(petBreeds);    //set pet breed dropdown
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  }

  //function to generate pet type dropdown
  function generateDdn() {
    return (
      <Select
        required
        // onChange={(e) => setpetType(e.target.value)}
        onChange={(e) => onPetTypeChange(e)}
        sx={{
          borderRadius: "20px",
        }}
        labelId="petTypeDdnLbl"
        id="petTypeDdnLbl"
        label="Pet type"
      >
        {petDdn !== [] ? (
          petDdn.map((pet) => {
            return <MenuItem value={pet}>{pet}</MenuItem>;
          })
        ) : (
          <>
            <MenuItem value="">Select a type</MenuItem>
            <MenuItem value="Dog">Dog</MenuItem>
            <MenuItem value="Cat">Cat</MenuItem>
            <MenuItem value="Rabbit">Rabbit</MenuItem>
            <MenuItem value="Fish">Fish</MenuItem>
          </>
        )}
      </Select>
    );
  }

  //to check if pet type is selected before selecting from pet breed dropdown
  
  return (
    <Box sx={{ paddingTop: 6 }}>
      <div className="d-flex flex-column text-center mb-3">
        <div className="display-6 m-0 mt-3">
          <span>Plan to adopt & make a difference ?</span>
        </div>
      </div>
      <Box
        className={classes.redBg}
        component="form"
        sx={{
          textAlign: "center",
        }}
        noValidate
        autoComplete="off"
      >
        {/* <div className="d-flex flex-column text-center mb-3"> */}
          {/* <div className="display-6 m-0 mt-3">
            <h4 style={{ color: "#FFF" }}>Find pets near you</h4>
          </div> */}
        {/* </div> */}
      </Box>
      <>
        {/* Form start */}
        <div className={classes.redBg}>
          <Box sx={{ flexGrow: 1, paddingBottom: 2 }}>
            <Grid container spacing={2} columns={16}>
              <Grid item lg={2} md={2} sm={2}></Grid>
              <Grid item lg={6} md={6} sm={6} xs={16} boxShadow={"none"}>
                <Item sx={{ backgroundColor: "#b80000", boxShadow: "none" }}>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { width: "100%" },
                      boxShadow: "none",
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <FormControl
                      sx={{
                        backgroundColor: "#FFF",
                        borderRadius: "20px",
                      }}
                    >
                      <InputLabel id="petTypeDdn"> Pet type</InputLabel>
                      {generateDdn()}
                    </FormControl>
                  </Box>
                </Item>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={16}>
                <Item sx={{ backgroundColor: "#b80000", boxShadow: "none" }}>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { width: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <FormControl
                      sx={{
                        backgroundColor: "#FFF",
                        borderRadius: "20px",
                      }}
                    >
                      <InputLabel id="petBreedDdn">Breed</InputLabel>
                      <Select
                        required
                        onChange={(e) => setpetBreed(e.target.value)}
                        sx={{
                          borderRadius: "20px",
                        }}
                        labelId="petBreedDdnLbl"
                        id="petBreedDdnLbl"
                        label="Pet Breed"
                      >
                        {
                          petType !=='' ?
                          petBreedDdn.map((breed)=>{
                             return <MenuItem value={breed}>{breed}</MenuItem>
                           })
                           :
                           <></>
                          //  console.log('')
                          // alert('Please select the type')
                        }
                      </Select>
                      {/* {getPetBreedDdnData()} */}
                    </FormControl>
                  </Box>
                </Item>
              </Grid>
              <Grid item lg={2} md={2} sm={2}></Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              columns={16}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item lg={4} xs={16}>
                <Item sx={{ backgroundColor: "#b80000", boxShadow: "none" }}>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { width: "100%" },
                      boxShadow: "none",
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    {/* <TextField
                      label="Enter Postal Code"
                      sx={{
                        backgroundColor: "#FFF",
                      }}
                      onChange={(e) => setPinCode(e.target.value)}
                      disabled
                    />  <h5>**We are working on find by pincode**</h5> */}
                  </Box>
                </Item>
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              {/* <Button variant="contained" color="primary" sx={{ width: '50%' }}>
              Submit
            </Button> */}
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  textAlign: "center",
                  boxShadow: "none",
                }}
                size="large"
              >
                Search
              </Button>
            </Box>
          </Box>
        </div>
      </>
      {console.log(petData)}
      {petData.length !== 0 && petType !== "" && petBreed !== "" ? (
        <div style={{ padding: "3%" }}>
          <button onClick={hideAdoptionResults}> X </button>
          <table className="table table-condensed">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Breed</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Interested?</th>
              </tr>
            </thead>
            <tbody>
              {petData.map((result, index) =>
                petBreed === result.breeds.primary ? (
                  <tr key={index}>
                    <td>{result.name}</td>
                    <td>{result.type}</td>
                    <td>{result.breeds.primary}</td>
                    <td>{result.gender}</td>
                    <td>{result.contact.email}</td>
                    <td>
                      <a href={result.url}>More details</a>
                    </td>
                  </tr>
                ) : (
                  ""
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
      {/* <SimplePaper></SimplePaper> */}
    </Box>
  );
}

export default PetAdoptionForm;
