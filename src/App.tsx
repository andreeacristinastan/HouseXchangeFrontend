import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./login/LoginPage.tsx";
import HomePage from "./home/HomePage.tsx";
import RegisterPage from "./register/RegisterPage.tsx";
import AppBar from "./home/AppBar.tsx";
import { useEffect, useState } from "react";
import AuthService from "./services/AuthService.tsx";
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import GuestHome from "./guest/GuestHome.tsx";
import HostHome from "./host/HostHome.tsx";
import GuestAppBar from "./guest/GuestAppBar.tsx";
import HostAppBar from "./host/HostAppBar.tsx";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useUserStore } from "./utils/useUserStore";
import AddProperty from "./host/property/AddProperty.tsx";
import DisplayAllProperties from "./properties/DisplayAllProperties.tsx";
import UserProfile from "./profile/UserProfile.tsx";
import DisplayPropertyDetails from "./properties/DisplayPropertyDetails.tsx";
import TripsPage from "./trips/TripsPage.tsx";
import ImageSearching from "./image_search/ImageSearching.tsx";
import ShowFindProperties from "./image_search/ShowFindProperties.tsx";
import OwnedProperties from "./properties/OwnedProperties.tsx";
import { APIProvider } from "@vis.gl/react-google-maps";
import { createRoot } from "react-dom/client";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7fc7d9",
    },
  },
});

function App() {
  const API_KEY = import.meta.env.VITE_MAPS_API_KEY;

  const { user, setUser } = useUserStore();
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showTitle, setShowTitle] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 400);
  }, []);

  const AppBarComponent =
    user?.role === "GUEST"
      ? GuestAppBar
      : user?.role === "HOST"
      ? HostAppBar
      : AppBar;

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
  }, [setUser]);

  useEffect(() => {
    user?.role === "GUEST"
      ? setShowTitle("Your total trips:")
      : user?.role === "HOST"
      ? setShowTitle("Your total properties:")
      : setShowTitle("");
  }, [user?.role]);

  return (
    <div>
      {showContent ? (
        <APIProvider
          apiKey={API_KEY}
          onLoad={() => console.log("Maps API has loaded.")}
        >
          <Router>
            <AppBarComponent profilePhoto={user?.profileImage?.url} />
            <Routes>
              <Route path="/" element={<PageComponent />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/profile"
                element={<UserProfile showTitle={showTitle} />}
              />
              <Route path="/property/create" element={<AddProperty />} />
              <Route path="/my-properties" element={<OwnedProperties />} />
              <Route path="/image-search" element={<ImageSearching />} />
              <Route path="/properties" element={<ShowFindProperties />} />
              <Route
                path="/properties/all"
                element={<DisplayAllProperties />}
              />
              <Route path="/my-trips" element={<TripsPage />} />
              <Route
                path="/property-details/:id"
                element={<DisplayPropertyDetails />}
              />
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
        </APIProvider>
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
