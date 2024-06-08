import Typography from "../utils/Typography";

import ProductHeroLayout from "./components//GettingStartedLay";
import backgroundImage from "../utils/images/pexels-curtis-adams-1694007-5071140.jpg";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import SearchProperties from "../utils/SearchProperties";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { useUserStore } from "../utils/useUserStore";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

const GettingStarted = ({
  signedIn,
  messages,
  typeOfUser,
}: {
  signedIn: boolean;
  messages: string[];
  typeOfUser?: string;
}) => {
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
          variant="h1"
          marked="center"
          sx={{ fontFamily: '"Oswald", sans-serif' }}
        >
          {/* Embrace the warmth of hospitality in every destination */}
          {messages[0]}
        </Typography>
        <Typography
          color="inherit"
          align="center"
          variant="h4"
          // marked="center"
          sx={{
            mb: 4,
            mt: { xs: 4, sm: 6 },
            fontFamily: '"Oswald", sans-serif',
          }}
        >
          {/* Enjoy us and discover your desired home */}
          {messages[1]}
        </Typography>
        {signedIn ? (
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
        ) : (
          <Link
            variant="h6"
            underline="none"
            href="/register"
            className="create-acc-btn"
            sx={{
              ...rightLink,
              fontSize: 25,
              border: "1px solid white",
              padding: "10px 15px",
              display: "inline-block",
              fontFamily: '"Oswald", sans-serif',
              textAlign: "center",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            {"Create an account"}
          </Link>
        )}
        {typeOfUser === "HOST" && (
          <>
            <Typography
              color="inherit"
              align="center"
              variant="h4"
              marked="center"
              sx={{
                mb: 4,
                mt: { xs: 4 },
                fontFamily: '"Oswald", sans-serif',
              }}
            >
              Or add your property
            </Typography>
            <Link
              variant="h6"
              underline="none"
              href="/property/create"
              className="create-acc-btn"
              sx={{
                ...rightLink,
                fontSize: 25,
                border: "1px solid white",
                padding: "10px 15px",
                display: "inline-block",
                fontFamily: '"Oswald", sans-serif',
                textAlign: "center",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {"Add a property"}
            </Link>
          </>
        )}

        {/* <Typography variant="body2" align="center" color="inherit" sx={{ mt: 6, fontSize:'20px', fontFamily: '"Oswald", sans-serif'}}>
        &try the experience
      </Typography> */}
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
