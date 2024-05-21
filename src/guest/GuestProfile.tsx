import React, { useEffect, useState } from "react";
import backgroundImage from "../utils/images/layered.png";
import ProductHeroLayout from "../home/components/GettingStartedLay";
import { Theme, styled } from "@mui/material/styles";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, TextField } from "@mui/material";
import profilePicture from "../utils/images/Foto ritratto corporate_ Headshots Portrait_.jpg";
import "./GuestProfile.css";
import { log } from "console";

const BackgroundStyle = styled("section")(({ theme }) => ({
  color: theme.palette.common.white,
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    height: "100vh",
  },
}));

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
  tripInfoDto: TripInfo[];
};

interface MyComponentProps {
  user: userInfo | null;
}

const GuestProfile: React.FC<MyComponentProps> = ({ user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const numOfTrips = user?.tripInfoDto?.length || 0;
  useEffect(() => {
    console.log({ user });
  }, [user]);
  return (
    <BackgroundStyle
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@900&family=Spicy+Rice&display=swap" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          justifyContent: "space-around",
          alignItems: "center",
          width: "70%",
        }}
      >
        <div
          style={{
            width: "80%",
            transition: "transform 3s ease",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            background: "transparent",
            backdropFilter: "blur(10px)",
            height: "500px",
            border: "1px solid white",
            borderRadius: "8px",
            transform: showDetails ? "translateX(-10%)" : "translateX(0)",
          }}
        >
          <div
            className="user-name"
            style={{
              marginTop: "30px",
              fontFamily: "Spicy Rice, cursive",
              fontSize: "60px",
            }}
          >
            {user?.username}
          </div>

          <CardMedia
            component="img"
            height="200"
            image={profilePicture}
            alt="profile picture"
            sx={{
              objectFit: "cover",
              objectPosition: "top",
              borderRadius: "100%",
              boxShadow: "0 0 50px",
              width: "200px",
            }}
          />
          <button onClick={() => setShowDetails(true)} className="show-details">
            Show Details
          </button>
        </div>
        {showDetails && (
          <div>
            <div className="email-component">
              <div className="title-display">Email:</div>
              <div className="info-display"> {user?.email} </div>
            </div>

            <div className="first-name-component">
              <div className="title-display">First Name:</div>
              <div className="info-display">{user?.firstName} </div>
            </div>

            <div className="last-name-component">
              <div className="title-display">Last name:</div>
              <div className="info-display"> {user?.lastName} </div>
            </div>

            <div className="total-trips-component">
              <div className="title-display">Your total trips:</div>
              <div className="info-display">{numOfTrips}</div>
            </div>
          </div>
        )}
      </div>
    </BackgroundStyle>
  );
};

export default GuestProfile;
