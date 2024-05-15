import { useForm } from "react-hook-form";
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

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: unknown) => console.log(data);
  const [showPassword, setShowPassword] = React.useState(false);
  const [typeOfAcc, setTypeOfAcc] = React.useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleTypeOfAcc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeOfAcc(event.target.value);
  };

  console.log(errors);

  // const [selectedLanguage, setSelectedLanguage] = useState("Select a country");

  return (
    <div className="register-container">
      <div className="form-register">
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="register-label">Register</h2>

          <div className="register-fields">
            <FormLabel
              id="row-radio-buttons-group-label"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "-40px",
              }}
            >
              Choose your type of account
            </FormLabel>
            <RadioGroup
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              row
              aria-labelledby="row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={typeOfAcc}
              onChange={handleTypeOfAcc}
            >
              <FormControlLabel
                value="Guest"
                control={<Radio />}
                label="Guest"
                sx={{ "& .MuiTypography-root": { color: "#666666" } }}
              />
              <FormControlLabel
                value="Host"
                control={<Radio />}
                label="Host"
                sx={{ "& .MuiTypography-root": { color: "#666666" } }}
              />
            </RadioGroup>

            <div>
              <TextField
                {...register("FirstName")}
                sx={{
                  m: 1,
                  width: "100%",
                  height: "30px",
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
                required
                id="outlined-required"
                label="First Name"
              />
            </div>
            <div>
              <TextField
                {...register("LastName")}
                sx={{
                  m: 1,
                  width: "100%",
                  height: "30px",
                  marginTop: "30px",
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
                required
                id="outlined-required"
                label="Last Name"
              />
            </div>
            <div>
              <TextField
                {...register("Email")}
                sx={{
                  m: 1,
                  width: "100%",
                  height: "30px",
                  marginTop: "30px",
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
                required
                id="outlined-required"
                label="Email"
              />
            </div>
            <div>
              <TextField
                {...register("Username")}
                sx={{
                  m: 1,
                  width: "100%",
                  height: "30px",
                  marginTop: "30px",
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
                required
                id="outlined-required"
                label="Username"
              />
            </div>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                {...register("Prefix")}
                sx={{
                  m: 1,
                  width: "70%",
                  height: "30px",
                  marginTop: "30px",
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
                required
                id="outlined-select-prefix"
                select
                label="Prefix"
              >
                {prefixes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                {...register("PhoneNumber")}
                className="textField"
                sx={{
                  m: 1,
                  width: "100%",
                  height: "30px",
                  marginTop: "30px",
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
                required
                id="outlined-number"
                label="Phone Number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <FormControl
              {...register("Password")}
              required
              variant="outlined"
              sx={{
                m: 1,
                width: "100%",
                height: "30px",
                marginTop: "30px",
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
              <OutlinedInput
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
            </FormControl>

            <div>
              <TextField
                {...register("Language")}
                sx={{
                  m: 1,
                  width: "100%",
                  height: "30px",
                  marginTop: "30px",
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
                required
                id="outlined-select-prefix"
                select
                label="Language"
                // value={selectedLanguage}
                // onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                {languages.map((language) => (
                  <MenuItem key={language} value={language}>
                    {language}
                  </MenuItem>
                ))}
              </TextField>
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
        </Box>
      </div>
    </div>
  );
};

export default RegisterPage;
