import React from "react";
import ProductHeroLayout from "../home/components/GettingStartedLay";
import backgroundImage from "../utils/images/pexels-curtis-adams-1694007-5071140.jpg";
import { useUserStore } from "../utils/useUserStore";
import { Link } from "@mui/material";
import Typography from "../utils/Typography";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};
const GettingStarted = () => {
  const { user } = useUserStore();

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
        ></link>

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
          Start adding your properties
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
      </ProductHeroLayout>
    </div>
  );
};

export default GettingStarted;
