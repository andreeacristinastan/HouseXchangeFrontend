import Typography from "../utils/Typography";
import ProductHeroLayout from "../home/components/GettingStartedLay";
import backgroundImage from "../utils/images/pexels-curtis-adams-1694007-5071140.jpg";
import { useUserStore } from "../utils/useUserStore";
import { Alert, Box, Snackbar } from "@mui/material";
import SearchProperties from "../utils/SearchProperties";
import { useState } from "react";

const GettingStarted = () => {
  const { user, setUser } = useUserStore();
  const [err, setErr] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
      }}
    >
      <ProductHeroLayout
        className="start-container"
        sxBackground={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center",
        }}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
          rel="stylesheet"
        />
        <Typography
          color="inherit"
          align="center"
          variant="h2"
          marked="center"
          sx={{ fontFamily: '"Oswald", sans-serif' }}
        >
          Welcome back, {user?.username}!
        </Typography>
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          sx={{
            mb: 4,
            mt: { xs: 4 },
            fontFamily: '"Oswald", sans-serif',
          }}
        >
          Start booking your first trip
        </Typography>
        <Box
          sx={{
            width: "950px",
            height: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            borderRadius: "30px",
            background:
              "linear-gradient(rgba(22, 23, 23, 0.4), rgba(185, 206, 211, 0.3))",
            boxShadow: "20px 12px 15px 2px rgba(0, 0, 0, 0.4)",
          }}
        >
          <SearchProperties
            textBtn={true}
            onFormErr={() => {
              setErr(true);
              setOpenSnackbar(true);
              setErrorMessage("You should fill all fields");
            }}
          />
        </Box>
      </ProductHeroLayout>

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
    </div>
  );
};

export default GettingStarted;
