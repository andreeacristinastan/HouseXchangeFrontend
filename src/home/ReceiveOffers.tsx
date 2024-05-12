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

type CountryApi = {
  name: {
    common: string;
  };
};

const ReceiveOffers = () => {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(true);
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

  return (
    <Container component="section" sx={{ mt: 20, display: "flex" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
        rel="stylesheet"
      ></link>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              bgcolor: "#468899",
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
                sx={{ fontFamily: '"Oswald", sans-serif' }}
              >
                Taste the holidays of the everyday close to home.
              </Typography>
              <TextField
                noBorder
                placeholder=" Your email"
                variant="standard"
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
                  backgroundColor: "#74c0d3",
                  borderRadius: "48px",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#74c0d3",
                  },
                }}
              >
                Keep me updated
              </Button>
            </Box>
          </Box>
        </Grid>

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
              bgcolor: "#519fb3",
            }}
          >
            <div
              className="feedback-container"
              style={{ marginBottom: "100px" }}
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
                    color: "magenta",
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
                  required
                  sx={{ color: "white", "&.Mui-focused": { color: "white" } }}
                >
                  Country
                </InputLabel>
                <Select
                  value={selectedCountry}
                  label="Countries"
                  onChange={handleChange}
                  sx={{
                    width: "420px",
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

              <Button
                type="submit"
                color="primary"
                variant="contained"
                // disabled={!typeOfAcc}
                sx={{
                  width: "80%",
                  backgroundColor: "#74c0d3",
                  borderRadius: "20px",
                  // marginLeft: "10px",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#74c0d3",
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
