import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./login/LoginPage.tsx";
import HomePage from "./home/HomePage.tsx";
import RegisterPage from "./register/RegisterPage.tsx";
import AppBar from "./home/AppBar.tsx";
import Profile from "./profile/Profile.tsx";

import { useEffect, useState } from "react";
import AuthService from "./services/AuthService.tsx";
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import GuestHome from "./guest/GuestHome.tsx";
import HostHome from "./host/HostHome.tsx";
import HostProfile from "./host/HostProfile.tsx";
import GuestAppBar from "./guest/GuestAppBar.tsx";
import GuestProfile from "./guest/GuestProfile.tsx";
import HostAppBar from "./host/HostAppBar.tsx";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lime, purple } from "@mui/material/colors";
import { log } from "console";
import { useUserStore } from "./utils/useUserStore";
import AddProperty from "./host/property/AddProperty.tsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7fc7d9",
    },
  },
});

function App() {
  const { user, setUser } = useUserStore();
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 1000);
  }, []);

  const AppBarComponent =
    user?.role === "GUEST"
      ? GuestAppBar
      : user?.role === "HOST"
      ? HostAppBar
      : AppBar;
  // useUserStore.getState().user?.role === "GUEST"
  //   ? GuestAppBar
  //   : useUserStore.getState().user?.role === "HOST"
  //   ? HostAppBar
  //   : AppBar;

  const ProfileComponent =
    user?.role === "GUEST" ? (
      <GuestProfile />
    ) : user?.role === "HOST" ? (
      <HostProfile />
    ) : (
      <Profile />
    );

  const PageComponent =
    user?.role === "GUEST"
      ? GuestHome
      : user?.role === "HOST"
      ? HostHome
      : HomePage;

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await AuthService().fetchUser();

        if (response.userDetails) {
          // useUserStore.setState(response.userDetails);
          // console.log(currUser);

          setUser(response.userDetails);
        } else if (response.error) {
          console.log("error:", response.error.length);

          setErr(true);
          setErrorMessage(response.error);
          setOpenSnackbar(true);
        }

        // console.log("my responseeee:");
        // console.log(response);
      } catch (error) {
        if (error instanceof Error) {
          // console.log("Error message:", JSON.parse(error.message).message);
          setErr(true);
          setErrorMessage(JSON.parse(error.message).message);
          setOpenSnackbar(true);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useUserStore.getState().user?.role === "GUEST"
  //   ? GuestHome
  //   : useUserStore.getState().user?.role === "HOST"
  //   ? HostHome
  //   : HomePage;

  // let ProfileComponent =
  //   user?.role === "GUEST" ? (
  //     <GuestProfile />
  //   ) : user?.role === "HOST" ? (
  //     <HostProfile />
  //   ) : (
  //     <Profile />
  //   );

  //   useUserStore.getState().user?.role === "GUEST" ? (
  //     <GuestProfile />
  //   ) : useUserStore.getState().user?.role === "HOST" ? (
  //     <HostProfile />
  //   ) : (
  //     <Profile />
  //   );

  return (
    <div>
      {showContent ? (
        <>
          <Router>
            <AppBarComponent />
            <Routes>
              <Route path="/" element={<PageComponent />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={ProfileComponent} />
              <Route path="/property/create" element={<AddProperty />} />
            </Routes>
          </Router>

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
        </>
      ) : (
        <ThemeProvider theme={theme}>
          <Box sx={{ width: "100%" }}>
            <LinearProgress color="primary" />
          </Box>
        </ThemeProvider>
      )}
    </div>
  );
}

export default App;
