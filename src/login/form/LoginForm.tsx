import { useState } from "react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { user } from "react-icons-kit/feather/user";
import { Formik, Field, Form } from "formik";
import AuthService from "../../services/AuthService";
import "./LoginForm.css";
import { Password } from "@mui/icons-material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../../home/HomePage";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Userfront from "@userfront/core";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "react-bootstrap";

interface LoginFormProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const LoginForm = ({ activeTab }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [email, setEmail] = useState("");

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const navigate = useNavigate();

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values) => {
          console.log(values);

          const response = await AuthService().login(values);

          setEmail(response.email);

          if (response.fuckingToken.length === 0) {
            values.password = "";
            setErr(true);
            setErrorMessage(response.error);
            setOpenSnackbar(true);
          } else if (activeTab !== response.role && response.role === "GUEST") {
            values.password = "";
            setErr(true);
            setErrorMessage("You should sign in as a GUEST user");
            setOpenSnackbar(true);
          } else if (activeTab !== response.role && response.role === "HOST") {
            values.password = "";
            setErr(true);
            setErrorMessage("You should sign in as a HOST user");
            setOpenSnackbar(true);
          } else {
            localStorage.setItem("user", JSON.stringify(response.fuckingToken));
            navigate("/profile");
          }
        }}
      >
        <Form className="signin-form">
          <div className="title-container">
            {activeTab === "GUEST" && (
              <h2>
                Guest
                <br /> Sign In
              </h2>
            )}
            {activeTab === "HOST" && (
              <h2>
                Host <br /> Sign In
              </h2>
            )}
          </div>

          <div className="username-component">
            <div className="user-icon">
              <Icon icon={user} size={20} />
            </div>
            <Field
              className="form-input"
              required
              type="username"
              placeholder="Username"
              name="username"
            />
          </div>

          <div className="password-component">
            <button
              type="button"
              onClick={() => {
                setShowPassword(!showPassword);
                console.log(showPassword);
              }}
            >
              {showPassword ? (
                <Icon icon={eyeOff} size={20} />
              ) : (
                <Icon icon={eye} size={20} />
              )}
            </button>

            <Field
              className="form-input"
              required
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
            />
          </div>

          <div className="keep-logged-in">
            <div typeof="forgot-password-link">
              <a href="#" className="forgot-password-link">
                Forgot Password
              </a>
            </div>

            <div className="logged-in">
              <label className="keep-logged-in-label">Keep me logged in</label>
              <input type="checkbox" placeholder="Keep me logged in" />
            </div>
          </div>

          <div className="login-component">
            <div typeof="create-an-account-component">
              <Link to="/register" className="create-account-btn">
                Create an account
              </Link>
            </div>
            <input type="submit" value="Login" className="login-btn" />
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
          message={errorMessage}
        />
      )}
    </div>
  );
};

export default LoginForm;
