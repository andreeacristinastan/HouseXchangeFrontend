import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./login/LoginPage.tsx";
import HomePage from "./home/HomePage.tsx";
import RegisterPage from "./register/RegisterPage.tsx";
import AppBar from "./home/AppBar.tsx";
import Profile from "./profile/Profile.tsx";
import { create } from "zustand";
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
import { lime, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7fc7d9",
    },
  },
});

type PropertyInfo = {
  id: number;
  name: string;
};

type TripInfo = {
  id: number;
  numberOfPersons: number;
  destination: string;
  minRange: number;
  maxRange: number;
  checkInDate: Date;
  checkOutDate: Date;
  userId: number;
  propertyId: number;
};

type userInfo = {
  id: number;
  role: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  language: string;
  phoneNumber: string;
  properties: PropertyInfo[];
  trips: TripInfo[];
};

interface UserStore {
  user: userInfo | null;
  setUser: (user: userInfo) => void;
  removeUser: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: userInfo) => set({ user }),
  removeUser: () => set({ user: null }),
}));

function App() {
  // const { fetchUser } = AuthService();
  const { user, setUser } = useUserStore();
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate fetching data or any other async operation
    setTimeout(() => {
      setShowContent(true); // Display the actual content
    }, 1000); // Wait for 2 seconds (adjust as needed)
  }, []);

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
              <Route path="/profile" element={<Profile />} />
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
