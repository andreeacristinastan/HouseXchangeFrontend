import TextField from "@mui/material/TextField";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MenuItem from "@mui/material/MenuItem";
import { prefixes } from "../utils/constants/Prefixes";
import { languages } from "../utils/constants/Languages";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import "./RegisterPage.css";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import AuthService from "../services/AuthService";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const RegisterPage = () => {
  // const onSubmit = (data: unknown) => console.log(data);
  const [showPassword, setShowPassword] = React.useState(false);
  const [typeOfAcc, setTypeOfAcc] = React.useState("");
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleTypeOfAcc = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("HERE", event.target.value);

    setTypeOfAcc(event.target.value);
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  // const [selectedLanguage, setSelectedLanguage] = useState("Select a country");

  return (
    <div className="register-container">
      <Formik
        initialValues={{
          role: "",
          email: "",
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          language: "",
          prefixNumber: "",
          phoneNumber: 0,
        }}
        onSubmit={async (values) => {
          const response = await AuthService().register(values);
          // console.log(response);
          values.email = "";
          values.firstName = "";
          values.language = "";
          values.language = "";
          values.lastName = "";
          values.password = "";
          values.prefixNumber = "";
          values.phoneNumber = 0;
          values.role = "";
          values.username = "";
          if (response.error.length !== 0) {
            setErr(true);
            setErrorMessage(response.error);
            setOpenSnackbar(true);
          } else {
            setSuccess(true);
            setSuccessMessage("User created successfully!");
          }
        }}
      >
        <Form className="form-register">
          <h2 className="register-label">Register</h2>

          <div className="register-fields">
            <Field
              as={FormLabel}
              id="row-radio-buttons-group-label"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "-40px",
                color: "#588b97",
              }}
            >
              Choose your type of account
            </Field>
            <Field
              as={RadioGroup}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              row
              aria-labelledby="row-radio-buttons-group-label"
              name="role"
              value={typeOfAcc}
              onChange={handleTypeOfAcc}
            >
              <FormControlLabel
                value="GUEST"
                control={<Field as={Radio} />}
                label="Guest"
                sx={{ "& .MuiTypography-root": { color: "#666666" } }}
              />
              <FormControlLabel
                value="HOST"
                control={<Field as={Radio} />}
                label="Host"
                sx={{ "& .MuiTypography-root": { color: "#666666" } }}
              />
            </Field>

            <div>
              <Field
                as={TextField}
                name="firstName"
                sx={{
                  m: 1,
                  width: "100%",
                  height: "30px",
                  color: "#588b97",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "24px",
                    color: "#588b97",
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #ccc",
                      },
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #ccc",
                      },
                    },
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "#7c7878",
                  },
                }}
                required
                id="outlined-required"
                label="First Name"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="lastName"
                sx={{
                  m: 1,
                  width: "100%",
                  height: "30px",
                  marginTop: "30px",
                  color: "#588b97",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "24px",
                    color: "#588b97",
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #ccc",
                      },
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #ccc",
                      },
                    },
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "#7c7878",
                  },
                }}
                required
                id="outlined-required"
                label="Last Name"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="email"
                sx={{
                  m: 1,
                  width: "100%",
                  height: "30px",
                  marginTop: "30px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "24px",
                    color: "#588b97",
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #ccc",
                      },
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #ccc",
                      },
                    },
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "#7c7878",
                  },
                }}
                required
                id="outlined-required"
                label="Email"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="username"
                sx={{
                  m: 1,
                  width: "100%",
                  height: "30px",
                  marginTop: "30px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "24px",
                    color: "#588b97",
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #ccc",
                      },
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #ccc",
                      },
                    },
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "#7c7878",
                  },
                }}
                required
                id="outlined-required"
                label="Username"
              />
            </div>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Field
                as={TextField}
                name="prefixNumber"
                sx={{
                  m: 1,
                  width: "70%",
                  height: "30px",
                  marginTop: "30px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "24px",
                    color: "#588b97",
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #ccc",
                      },
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #ccc",
                      },
                    },
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "#7c7878",
                  },
                }}
                required
                id="outlined-select-prefix"
                select
                label="Prefix"
              >
                {prefixes.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>

              <Field
                as={TextField}
                name="phoneNumber"
                className="textField"
                sx={{
                  m: 1,
                  width: "100%",
                  height: "30px",
                  marginTop: "30px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "24px",
                    color: "#588b97",
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #ccc",
                      },
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #ccc",
                      },
                    },
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "#7c7878",
                  },
                }}
                required
                id="outlined-number"
                label="Phone Number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <Field
              as={FormControl}
              name="password"
              required
              variant="outlined"
              sx={{
                m: 1,
                width: "100%",
                height: "30px",
                marginTop: "30px",
                color: "#588b97",

                "& .MuiOutlinedInput-root": {
                  borderRadius: "24px",
                  "&:hover": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #ccc",
                    },
                  },
                  "&.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #ccc",
                    },
                  },
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "#7c7878",
                },
              }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <Field
                as={OutlinedInput}
                name="password"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="start"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </Field>

            <div>
              <Field
                as={TextField}
                name="language"
                sx={{
                  m: 1,
                  width: "100%",
                  height: "30px",
                  marginTop: "30px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "24px",
                    color: "#588b97",
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #ccc",
                      },
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #ccc",
                      },
                    },
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "#7c7878",
                  },
                }}
                required
                id="outlined-select-prefix"
                select
                label="Language"
              >
                {languages.map((language) => (
                  <MenuItem key={language} value={language}>
                    {language}
                  </MenuItem>
                ))}
              </Field>
            </div>

            <div className="already-have-account-component">
              <Link to="/login" className="already-have-account-btn">
                Already have an account?
              </Link>
              <input
                type="submit"
                className="submit-btn"
                disabled={!typeOfAcc}
              />
            </div>
          </div>
        </Form>
      </Formik>
      {err && (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={openSnackbar}
          className="snackbarError"
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
      )}

      {success && (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={success}
          className="snackbarSuccess"
          autoHideDuration={5000}
          onClose={() => setSuccess(false)}
          sx={{ width: "100%" }}
        >
          <Alert severity="success" icon={<CheckIcon fontSize="inherit" />}>
            {successMessage}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default RegisterPage;
