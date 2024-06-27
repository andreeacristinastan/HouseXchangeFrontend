import React, { useEffect, useRef, useState } from "react";
import "./ImageSearch.css";
import Typography from "@mui/material/Typography";
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
import CircularProgress from "@mui/material/CircularProgress";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

registerPlugin(FilePondPluginFilePoster, FilePondPluginFileValidateType);
import {
  makeDeleteRequest,
  makeUploadRequest,
} from "../utils/CloudinaryHelper";
import {
  PropertyImageSearch,
  ResponseGetAllPropertiesType,
} from "../utils/types/PropertyTypes";
import {
  ImageSearchType,
  ResponseImageSearch,
} from "../utils/types/ImageTypes";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useFilterStore } from "../utils/useFilterStore";

const ImageSearching = () => {
  const revert = (token, successCallback, errorCallback) => {
    makeDeleteRequest({
      token,
      successCallback,
      errorCallback,
    });
  };
  const [image, setImage] = useState("");
  const [files, setFiles] = useState([]);
  const editorRef = useRef<HTMLDivElement>(null);
  const [tokens, setTokens] = useState<string[]>([]);
  const [properties, setProperties] = useState<PropertyImageSearch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [propertiesNotFoundErr, setPropertiesNotFoundErr] = useState(false);
  const filters = useFilterStore((state) => state.searchDetails);
  const setFilters = useFilterStore((state) => state.setSearchDetails);

  useEffect(() => {
    if (editorRef.current) {
      appendDefaultEditor(editorRef.current, {
        src: image,
        imageCropAspectRatio: 1,
      });
    }
  }, [image]);

  useEffect(() => {
    getAllProperties();
  }, []);

  const getAllProperties = async () => {
    const res = await fetch(`http://localhost:8080/api/properties-all`, {
      method: "GET",
    });
    if (!res.ok) {
      console.log("Eroare cand iei proprietati pentru image search");
      // console.log(await res);

      return;
    }

    const data: ResponseGetAllPropertiesType = await res.json();
    // setTotalPages(data.totalPages);
    // const totalProperties: ResponseGetAllPropertiesType = data.content;
    setProperties(
      data.map((property) => ({
        id: property.id,
        images: property.images,
      }))
    );
  };

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

  //   useEffect(() => {
  //     console.log(properties);
  //   }, [properties]);

  const handleButtonClick = async () => {
    // console.log(properties);

    const values: ImageSearchType = {
      properties: properties,
      to_be_compared_img: image,
    };
    setIsLoading(true);
    const res = await fetch(`http://localhost:5000/compare-images`, {
      method: "POST",
      headers: {
        //   Authorization: `Bearer ${token.replace(/"/g, "")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      setIsLoading(false);

      return;
    }

    const data: ResponseImageSearch = await res.json();
    setIsLoading(false);
    revert(
      tokens[0],
      () => {},
      () => {}
    );
    setFiles([]);

    // if (Array.isArray(data)) {
    //   console.log("data is array");
    console.log(data);
    //   console.log(data.length);
    // } else {
    //   console.log("data is not an array");
    // }

    if (data.length === 0) {
      setPropertiesNotFoundErr(true);
    } else {
      setFilters("similarProperties", data);
      navigate("/properties/all");
    }
  };

  const handleClose = () => {
    setPropertiesNotFoundErr(false);
  };

  const handleSeeProperties = () => {
    setPropertiesNotFoundErr(false);
    navigate("/properties/all");
  };

  return (
    <div className="principal-container">
      <Typography
        color="inherit"
        align="center"
        variant="h1"
        // marked="center"
        sx={{
          fontFamily: '"Oswald", sans-serif',
          textShadow: "1px 1px 2px black,  0 0 5px white, 0 0 5px cyan",
          //   marginTop: "100px",

          //   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))`,
          //   paddingTop: "rem ",
          //   position: "absolute", // Add this line
          //   top: "50%", // Add this line
          //   left: "50%", // Add this line
          //   transform: "translate(-50%, 200%)", // Modify this line
          //   transform: "translateY(200%)",
          //   justif: "center",
          //   width: "1100px",
          color: "#fff",
          borderRadius: "48px",
          backdropFilter: "blur(10px)",
        }}
      >
        Welcome to your intelligent searching environment!
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h4"
        // marked="center"
        sx={{
          fontFamily: '"Oswald", sans-serif',
          textShadow: "1px 1px 2px black,  0 0 5px white, 0 0 5px cyan",
          marginTop: "20px",
          //   transform: "translate(0%, 200%)",
          //   transform: "translateY(450%)",
          width: "100%",
          color: "#fff",
          borderRadius: "48px",
        }}
      >
        You can upload your desired home or place picture for a perfect vacay
        and we'll find your perfect match homes for you!
      </Typography>
      <div
        style={{
          width: "20%",
          minWidth: "280px",
          //   transition: "transform 3s ease",
          //   display: "flex",
          //   flexDirection: "column",
          //   alignItems: "center",
          //   background: "transparent",
          height: "500px",
          marginTop: "20px",
        }}
      >
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
        <button onClick={handleButtonClick} className="start-searching">
          Start searching
        </button>
      </div>

      {isLoading && (
        <div className="loading-background">
          <div>
            <CircularProgress style={{ color: "#fff" }} />{" "}
            {/* This is your loading icon */}
            <p
              style={{
                color: "#fff",
                width: "auto",
                fontSize: "50px",
                textShadow: "12px 12px 15px #588b97",
              }}
            >
              Finding best properties for you..
            </p>
          </div>
        </div>
      )}

      <Dialog open={propertiesNotFoundErr} onClose={() => handleClose()}>
        <DialogTitle color={"#f58989"}>{"Bad news! 🥺"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            There is no property matching your desires at the moment!
          </DialogContentText>
          <DialogContentText>
            You can try see other properties!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button onClick={() => handleSeeProperties()}>
            See other properties
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImageSearching;
