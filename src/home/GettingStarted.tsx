import Typography from "../utils/Typography";

import ProductHeroLayout from "./components//GettingStartedLay";
import backgroundImage from "../utils/images/pexels-curtis-adams-1694007-5071140.jpg";
import Link from "@mui/material/Link";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

const GettingStarted = () => {
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
          Embrace the warmth of hospitality in every destination
        </Typography>
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          sx={{
            mb: 4,
            mt: { xs: 4, sm: 6 },
            fontFamily: '"Oswald", sans-serif',
          }}
        >
          Enjoy us and discover your desired home
        </Typography>
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
        {/* <Typography variant="body2" align="center" color="inherit" sx={{ mt: 6, fontSize:'20px', fontFamily: '"Oswald", sans-serif'}}>
        &try the experience
      </Typography> */}
      </ProductHeroLayout>
    </div>
  );
};

export default GettingStarted;
