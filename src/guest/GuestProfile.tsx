import React, { useEffect, useState } from "react";
import backgroundImage from "../utils/images/layered.png";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import profilePicture from "../utils/images/Foto ritratto corporate_ Headshots Portrait_.jpg";
import "./GuestProfile.css";
import Language from "./utils/Language";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AuthService from "../services/AuthService";
import { useUserStore } from "../utils/useUserStore";

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

type editUser = {
  email: string;
  firstName: string;
  lastName: string;
  language: string;
};

// interface MyComponentProps {
//   user: userInfo | null;
//   setUser: (user: userInfo) => void;
// }

const GuestProfile = () => {
  const { user, setUser } = useUserStore();
  const [showDetails, setShowDetails] = useState(false);
  const [profileButton, setProfileButton] = useState("Show Details");
  const numOfTrips = user?.tripInfoDto?.length || 0;
  const [editMode, setEditMode] = useState(false);
  const [err, setErr] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newLanguage, setNewLanguage] = React.useState("");

  const handleChangeLanguage = (selectedLanguage: string) => {
    // console.log(selectedLanguage);
    setNewLanguage(selectedLanguage);
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const [newUserInfos, setNewUserInfos] = useState({
    email: "",
    firstName: "",
    lastName: "",
    language: "",
  });

  const editUserDetails = async (values: editUser) => {
    // console.log(JSON.stringify(values));
    // AuthService().updateUser(values);
    // setEditMode(!editMode);
    try {
      const response = await AuthService().updateUser(values);

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
  };

  const handleInfosChange = (event: {
    target: { value: string; name?: any };
  }) => {
    const { name, value } = event.target;
    setNewUserInfos({ ...newUserInfos, [name]: value });
  };

  const handleButtonClick = () => {
    if (profileButton === "Show Details") {
      setShowDetails(true);
      setProfileButton("Edit Details");
    } else if (profileButton === "Edit Details") {
      setEditMode(true);
      setShowDetails(false);
      setProfileButton("Save Changes");
    } else if (profileButton === "Save Changes") {
      const updatedUser: editUser = {
        email: newUserInfos.email,
        firstName: newUserInfos.firstName,
        lastName: newUserInfos.lastName,
        language: newLanguage,
      };
      if (
        updatedUser.email.length === 0 &&
        updatedUser.firstName.length === 0 &&
        updatedUser.lastName.length === 0 &&
        updatedUser.language.length === 0
      ) {
        setErr(true);
        setErrorMessage("You should fill at least one field");
        setOpenSnackbar(true);
      } else {
        setProfileButton("Edit Details");
        setEditMode(false);
        setShowDetails(true);

        editUserDetails(updatedUser);
      }
    }
  };

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
            minWidth: "280px",
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
          <button onClick={handleButtonClick} className="show-details">
            {profileButton}
          </button>
        </div>
        {showDetails && (
          <div className="profile-details-component">
            <div
              className="profile-details"
              style={{
                marginTop: "-30px",
                fontFamily: "Spicy Rice, cursive",
                fontSize: "60px",
              }}
            >
              Details
            </div>
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

        {editMode && (
          <div className="profile-edit-component">
            <div
              className="profile-edit-details"
              style={{
                marginTop: "-30px",
                fontFamily: "Spicy Rice, cursive",
                fontSize: "60px",
              }}
            >
              Edit Details
            </div>
            <div className="email-component">
              <div className="title-display">Email:</div>
              <input
                className="info-display"
                name="email"
                value={newUserInfos.email}
                onChange={handleInfosChange}
              />
            </div>

            <div className="first-name-component">
              <div className="title-display">First Name:</div>
              <input
                className="info-display"
                name="firstName"
                value={newUserInfos.firstName}
                onChange={handleInfosChange}
              />
            </div>

            <div className="last-name-component">
              <div className="title-display">Last name:</div>
              <input
                className="info-display"
                name="lastName"
                value={newUserInfos.lastName}
                onChange={handleInfosChange}
              />
            </div>

            <div className="language-component">
              <div className="title-display">Language:</div>
              <div className="info-display">
                <Language handleChangeLanguage={handleChangeLanguage} />
                {/* {console.log(response)} */}
              </div>
            </div>

            {/* <button>Save</button> */}
          </div>
        )}
      </div>

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
    </BackgroundStyle>
  );
};

export default GuestProfile;
