import "./GuestHome.css";
// import GettingStarted from "./GettingStarted";
import ReceiveOffers from "../home/ReceiveOffers";
import GettingStarted from "../home/GettingStarted";
import { useUserStore } from "../utils/useUserStore";
import GoogleMaps from "../utils/GoogleMaps";
import Typography from "@mui/material/Typography";

const GuestHome = () => {
  const { user, setUser } = useUserStore();

  return (
    <div className="guest-home-container">
      <GettingStarted
        signedIn={true}
        messages={[
          `Welcome back, ${user?.username}!`,
          "Start booking your first trip",
        ]}
        typeOfUser={`${user?.role}`}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "20%",

          maxWidth: "60vw",
          alignItems: "center",
          marginTop: "80px",
          //   width: "100%",
          backgroundColor: "#8ab8c4",
          boxShadow: "30px 12px 15px 2px rgba(0, 0, 0, 0.4)",
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
          // marked="center"
          sx={{
            fontFamily: '"Oswald", sans-serif',
            color: "#fff",
            marginTop: "-50px",
          }}
        >
          Embrace the warmth of hospitality in every destination that you can
          find in our app
        </Typography>
        <div
          style={{
            width: "50vw",
            height: "90vh",
            marginBottom: "50px",
          }}
        >
          <GoogleMaps />
        </div>
      </div>
      <ReceiveOffers />
      {/* </div> */}
    </div>
  );
};

export default GuestHome;
