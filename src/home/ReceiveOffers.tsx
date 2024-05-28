import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "../utils/Typography";
import TextField from "../utils/TextField";
import SnackBar from "../utils/SnackBar";
import Button from "../utils/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";

type CountryApi = {
  name: {
    common: string;
  };
};

const ReceiveOffers = () => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateEmail(email)) {
      setSnackbarMessage("Success! You will be kept updated.");
    } else {
      setSnackbarMessage("Error: Please enter a valid email address.");
    }
    setOpen(true);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [typeOfAcc, setTypeOfAcc] = React.useState("");

  const handleTypeOfAcc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeOfAcc(event.target.value);
  };

  const [countries, setCountries] = useState<string[]>([]); // replace any with your data type
  const [selectedCountry, setSelectedCountry] = useState("");
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data: CountryApi[]) =>
        setCountries(data.map((d) => d.name.common).sort())
      )
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCountry(event.target.value);
  };

  const [state, setState] = React.useState({
    app: true,
    property: false,
    other: false,
  });

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { app, property, other } = state;
  const error = [app, property, other].filter((v) => v).length !== 1;

  return (
    <Container component="section" sx={{ mt: 20, display: "flex" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
        rel="stylesheet"
      ></link>
      <Grid container>
        <Grid item xs={12} md={6} mb={10} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              bgcolor: "#779fa9",
              boxShadow: "20px 12px 15px 2px rgba(0, 0, 0, 0.4)",

              // boxShadow: "#fff",
              py: 8,
              px: 3,
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ maxWidth: 400, color: "#fff" }}
            >
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontFamily: '"Oswald", sans-serif',
                  position: "relative",
                  top: "-100px",
                }}
              >
                RECEIVE OFFERS
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontFamily: '"Oswald", sans-serif', marginTop: "-40px" }}
              >
                Taste the holidays of the everyday.
              </Typography>
              <TextField
                noBorder
                placeholder=" Your email"
                variant="standard"
                value={email}
                onChange={handleEmailChange}
                sx={{
                  width: "100%",
                  padding: "10px",
                  mt: 3,
                  mb: 2,
                  border: "3px solid #fff",
                  borderRadius: "48px",
                  input: {
                    "&::placeholder": {
                      color: "#fff",
                    },
                  },
                  "& input": { color: "white" },
                }}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{
                  width: "420px",
                  backgroundColor: "#588b97",
                  borderRadius: "48px",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#588b97",
                  },
                }}
              >
                Keep me updated
              </Button>
            </Box>
          </Box>
        </Grid>
        <SnackBar open={open} onClose={handleClose} message={snackbarMessage} />
        <Grid
          item
          xs={6}
          md={6}
          sx={{
            display: { md: "block" },
            position: "relative",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              //   top: -28,
              left: -28,
              right: 0,
              bottom: 35,
              alignItems: "center",
              //   width: "100%",
              height: "500px",
              maxWidth: 600,
              bgcolor: "#8ab8c4",
              boxShadow: "30px 12px 15px 2px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div
              className="feedback-container"
              style={{ marginBottom: "50px" }}
            >
              <Typography
                variant="h2"
                component="h2"
                //   gutterBottom
                sx={{
                  fontFamily: '"Oswald", sans-serif',
                  color: "#fff",

                  // width: "120px",
                }}
              >
                YOUR FEEDBACK MATTERS TO US
              </Typography>

              <RadioGroup
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "&, &.Mui-checked": {
                    color: "white",
                  },
                }}
                row
                aria-labelledby="row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={typeOfAcc}
                onChange={handleTypeOfAcc}
              >
                <FormControlLabel
                  value="Guest"
                  control={
                    <Radio
                      required={true}
                      sx={{
                        "&, &.Mui-checked": {
                          color: "white",
                        },
                      }}
                    />
                  }
                  label="Guest"
                  sx={{ "& .MuiTypography-root": { color: "#FFF" } }}
                />
                <FormControlLabel
                  value="Host"
                  control={
                    <Radio
                      required={true}
                      sx={{
                        "&, &.Mui-checked": {
                          color: "white",
                        },
                      }}
                    />
                  }
                  label="Host"
                  sx={{ "& .MuiTypography-root": { color: "#fff" } }}
                />
              </RadioGroup>

              <TextField
                noBorder
                required
                placeholder=" Username"
                variant="standard"
                sx={{
                  width: "390px",
                  padding: "10px",
                  mb: 2,
                  border: "3px solid #fff",
                  borderRadius: "48px",
                  input: {
                    "&::placeholder": {
                      color: "#fff",
                    },
                  },
                  "& input": { color: "white" },
                }}
              />

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel
                  sx={{ color: "white", "&.Mui-focused": { color: "white" } }}
                >
                  Country
                </InputLabel>
                <Select
                  required
                  value={selectedCountry}
                  label="Countries"
                  onChange={handleChange}
                  sx={{
                    width: "420px",
                    // maxHeight: "20px",
                    color: "white",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(228, 219, 233, 0.25)",
                      border: 3,
                      borderRadius: "48px",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(228, 219, 233, 0.25)",
                      border: 3,
                      borderRadius: "48px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(228, 219, 233, 0.25)",
                      border: 3,
                      borderRadius: "48px",
                    },
                    ".MuiSvgIcon-root ": {
                      fill: "white !important",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: "0.875rem",
                        boxSizing: "border-box",
                        padding: "6px",
                        margin: "12px 0",
                        minWidth: "290px",
                        maxHeight: "150px",
                        borderRadius: "12px",
                        overflow: "auto",
                        outline: "0px",
                        color: "#588b97",
                        background: "#fff",
                        border: "1px solid  #DAE2ED",

                        "&.closed": {
                          opacity: 0,
                          transform: "scale(0.95, 0.8)",
                          transition:
                            "opacity 200ms ease-in, transform 200ms ease-in",
                        },
                        "&.open": {
                          opacity: 1,
                          transform: "scale(1, 1)",
                          transition:
                            "opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48)",
                        },
                        "&.placement-top": {
                          transformOrigin: "bottom",
                        },
                        "&.placement-bottom": {
                          transformOrigin: "top",
                        },
                      },
                    },
                  }}
                >
                  {countries.map((c) => (
                    <MenuItem value={c}> {c} </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                noBorder
                required
                placeholder=" Your feedback"
                variant="standard"
                sx={{
                  width: "390px",
                  padding: "10px",
                  mb: 2,
                  border: "3px solid #fff",
                  borderRadius: "48px",
                  input: {
                    "&::placeholder": {
                      color: "#fff",
                    },
                  },
                  "& input": { color: "white" },
                }}
              />

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <FormControl
                  error={error}
                  required
                  // sx={{ m: 0 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel
                    component="legend"
                    sx={{
                      color: "white",
                      "&, &.Mui-checked": {
                        color: "white",
                      },
                      "&, &.Mui-focused": {
                        color: "white",
                      },
                    }}
                  >
                    Choose one
                  </FormLabel>
                  <FormGroup
                    aria-label="position"
                    row
                    sx={{
                      "&, &.Mui-checked": {
                        color: "white",
                      },
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{
                            color: "white",
                          }}
                          checked={app}
                          onChange={handleChange2}
                          name="app"
                        />
                      }
                      label="to the aplication"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{
                            color: "white",
                          }}
                          checked={property}
                          onChange={handleChange2}
                          name="property"
                        />
                      }
                      label="to the property"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{
                            color: "white",
                          }}
                          checked={other}
                          onChange={handleChange2}
                          name="other"
                        />
                      }
                      label="other"
                    />
                  </FormGroup>
                </FormControl>
              </Box>

              <Button
                type="submit"
                color="primary"
                variant="contained"
                // disabled={!typeOfAcc}
                sx={{
                  width: "420px",
                  backgroundColor: "#588b97",
                  borderRadius: "48px",
                  // marginLeft: "10px",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#588b97",
                  },
                }}
              >
                Submit
              </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
      <SnackBar
        open={open}
        closeFunc={handleClose}
        // disabled={!typeOfAcc}
        message="We will send you our response as soon as possible."
      />
    </Container>
  );
};

export default ReceiveOffers;
