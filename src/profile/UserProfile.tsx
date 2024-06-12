import React, { useEffect, useRef, useState } from "react";
import backgroundImage from "../utils/images/layered.png";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import profilePicture from "../utils/images/Foto ritratto corporate_ Headshots Portrait_.jpg";
import "./UserProfile.css";
import Language from "./utils/Language";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AuthService from "../services/AuthService";
import { useUserStore } from "../utils/useUserStore";
import { EditUserType } from "../utils/types/UserTypes";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";
import { appendDefaultEditor } from "@pqina/pintura";
import "@pqina/pintura/pintura.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css";
import CheckIcon from "@mui/icons-material/Check";

registerPlugin(FilePondPluginFilePoster, FilePondPluginFileValidateType);
import {
  makeDeleteRequest,
  makeUploadRequest,
} from "../utils/CloudinaryHelper";
import { ImageCreationType } from "../utils/types/ImageTypes";
import { ProfileImageCreationType } from "../utils/types/ProfileImageTypes";

const BackgroundStyle = styled("section")(({ theme }) => ({
  color: theme.palette.common.white,
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    height: "100vh",
  },
}));

const UserProfile = ({ showTitle }: { showTitle: string }) => {
  const { user, setUser } = useUserStore();
  const [showDetails, setShowDetails] = useState(false);
  const [profileButton, setProfileButton] = useState("Show Details");
  const totalElem = user?.tripInfoDto?.length || user?.properties?.length;
  const [editMode, setEditMode] = useState(false);
  const [err, setErr] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newLanguage, setNewLanguage] = React.useState("");
  const [tokens, setTokens] = useState<string[]>([]);
  const [files, setFiles] = useState([]);
  const editorRef = useRef<HTMLDivElement>(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [oldToken, setOldToken] = useState("");

  const handleChangeLanguage = (selectedLanguage: string) => {
    setNewLanguage(selectedLanguage);
  };

  const revert = (token, successCallback, errorCallback) => {
    makeDeleteRequest({
      token,
      successCallback,
      errorCallback,
    });
  };
  const [image, setImage] = useState("");

  useEffect(() => {
    if (editorRef.current) {
      appendDefaultEditor(editorRef.current, {
        src: image,
        imageCropAspectRatio: 1,
      });
    }

    // const addImage: ProfileImageCreationType = {
    //   url: image,
    //   userId: user?.id,
    // };

    // async function createProfileImage() {
    //   const response = await AuthService().createProfileImage(addImage);
    //   if (response.error.length !== 0) {
    //     tokens.map((token) => {
    //       revert(token, "succes", "error");
    //     });
    //     setErr(true);
    //     setErrorMessage(response.error);
    //     setOpenSnackbar(true);
    //   }
    //   console.log(response);
    // }

    // createProfileImage();
  }, [image]);

  const handleAddImages = (image: string) => {
    setImage(image);
  };

  const process = (
    fieldName,
    file,
    metadata,
    load,
    error,
    progress,
    abort,
    transfer,
    options
  ) => {
    const abortRequest = makeUploadRequest({
      file,
      fieldName,
      successCallback: load,
      errorCallback: error,
      progressCallback: progress,
      addImages: handleAddImages,
      setTokens,
    });
    return {
      abort: () => {
        abortRequest();
        abort();
      },
    };
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

  const editUserDetails = async (values: EditUserType) => {
    if (image && !user?.profileImage) {
      const addImage: ProfileImageCreationType = {
        url: image,
        userId: user?.id,
      };

      const response = await AuthService().createProfileImage(addImage);
      if (response.error.length !== 0) {
        revert(
          tokens[0],
          () => {},
          () => {}
        );
        // setTokens([]);
        setTokens((prevTokenVector) => prevTokenVector.slice(1));
        setErr(true);
        setErrorMessage(response.error);
        setOpenSnackbar(true);
      } else {
        console.log(response);
        setSuccess(true);
        setSuccessMessage("User updated successfully!");
        setImage("");
        setFiles([]);
      }
    } else if (image && user?.profileImage) {
      const addImage: ProfileImageCreationType = {
        url: image,
        userId: user?.id,
      };
      // setOldToken(user.profileImage.url);

      const response = await AuthService().updateProfileImage(
        addImage,
        user.profileImage.id
      );
      if (response.error.length !== 0) {
        // tokens.map((token) => {
        revert(
          tokens[0],
          () => {},
          () => {}
        );
        setTokens((prevTokenVector) => prevTokenVector.slice(1));
        // });
        // setTokens([]);

        setErr(true);
        setErrorMessage(response.error);
        setOpenSnackbar(true);
      } else {
        console.log(tokens);
        revert(
          tokens[0],
          () => {},
          () => {}
        );
        setTokens((prevTokenVector) => prevTokenVector.slice(1));
        // setTokens([]);

        setSuccess(true);
        setSuccessMessage("User updated successfully!");
        setImage("");
        setFiles([]);
      }
    }
    try {
      const response = await AuthService().updateUser(values);

      if (response.userDetails) {
        setNewUserInfos({
          email: "",
          firstName: "",
          lastName: "",
          language: "",
        });
        setUser(response.userDetails);
        setSuccess(true);
        setSuccessMessage("User updated successfully!");
      } else if (response.error) {
        console.log("error:", response.error.length);

        setErr(true);
        setErrorMessage(response.error);
        setOpenSnackbar(true);
      }
    } catch (error) {
      if (error instanceof Error) {
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
      const updatedUser: EditUserType = {
        email: newUserInfos.email,
        firstName: newUserInfos.firstName,
        lastName: newUserInfos.lastName,
        language: newLanguage,
      };
      if (
        updatedUser.email.length === 0 &&
        updatedUser.firstName.length === 0 &&
        updatedUser.lastName.length === 0 &&
        updatedUser.language.length === 0 &&
        !image
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

          <div
            style={{
              width: "auto",
              height: "auto",
            }}
          >
            {user?.profileImage && !editMode ? (
              <CardMedia
                component="img"
                height="200"
                image={user.profileImage.url}
                alt="profile picture"
                sx={{
                  objectFit: "cover",
                  objectPosition: "top",
                  borderRadius: "100%",
                  boxShadow: "0 0 50px",
                  width: "200px",
                }}
              />
            ) : // afisez imaginea
            !user?.profileImage && !editMode ? (
              <CardMedia
                // component="img"
                // height="200"
                // image={profilePicture}
                // alt="profile picture"
                sx={{
                  objectFit: "cover",
                  objectPosition: "top",
                  borderRadius: "100%",
                  // boxShadow: "0 0 50px",
                  width: "200px",
                }}
              >
                <AccountCircleIcon style={{ fontSize: 200 }} />
              </CardMedia>
            ) : (
              <FilePond
                files={files}
                acceptedFileTypes="image/*"
                onupdatefiles={setFiles}
                allowMultiple={false}
                maxFiles={1}
                server={{ process, revert }}
                name="file"
                labelIdle='Drag & Drop your picture or <span class="filepond--label-action">Browse</span>'
                imagePreviewHeight={170}
                imageCropAspectRatio="1:1"
                imageResizeTargetWidth={200}
                imageResizeTargetHeight={200}
                imageResizeMode="contain"
                stylePanelLayout="compact circle"
                styleLoadIndicatorPosition="center bottom"
                styleProgressIndicatorPosition="right bottom"
                styleButtonRemoveItemPosition="left bottom"
                styleButtonProcessItemPosition="right bottom"
              />
            )}

            <button onClick={handleButtonClick} className="show-details">
              {profileButton}
            </button>
          </div>
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
              <div className="title-display">{showTitle}</div>
              <div className="info-display">{totalElem}</div>
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
              </div>
            </div>
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

      {success && (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={success}
          className="snackbarSuccess"
          autoHideDuration={5000}
          onClose={() => setSuccess(false)}
          sx={{ width: "100%" }}
        >
          <Alert severity="success" icon={<CheckIcon fontSize="inherit" />}>
            {successMessage}
          </Alert>
        </Snackbar>
      )}
    </BackgroundStyle>
  );
};

export default UserProfile;
