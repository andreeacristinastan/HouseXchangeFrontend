import Typography from "../utils/Typography";
import ProductHeroLayout from "../home/components/GettingStartedLay";
import backgroundImage from "../utils/images/pexels-curtis-adams-1694007-5071140.jpg";
import { useUserStore } from "../utils/useUserStore";
import { Box } from "@mui/material";
import SearchProperties from "../utils/SearchProperties";

const GettingStarted = () => {
  const { user, setUser } = useUserStore();
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
            background:
              "linear-gradient(rgba(185, 206, 211, 0.3), rgba(185, 206, 211, 0.3))",
          }}
        >
          <SearchProperties showTitle={false} />
        </Box>
      </ProductHeroLayout>
    </div>
  );
};

export default GettingStarted;
