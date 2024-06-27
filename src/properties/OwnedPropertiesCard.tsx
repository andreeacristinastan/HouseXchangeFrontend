import React, { useEffect, useState } from "react";
import { Property, PropertyImageSearch } from "../utils/types/PropertyTypes";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./OwnedPropertiesCard.css";
import { UserInfosType } from "../utils/types/UserTypes";
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "../utils/useUserStore";
import { ResponseGetAllTripsType } from "../utils/types/TripTypes";
import {
  Availability,
  ResponseAllAvailabilitiesType,
} from "../utils/types/AvailabilityTypes";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { ResponseImageInfoType } from "../utils/types/ImageTypes";

const styleBtn = () => ({
  fontSize: "20px",
  color: "#fff",
  display: "flex",
  flexDirection: "row",
  width: "100px",
  height: "50px",
  marginTop: "20px",
  fontFamily: '"Oswald", sans-serif',
  boxShadow: "4px 4px",
  bottom: 22,
  border: "1px solid #fff !important", // Add a border
  borderRadius: "4px",
  background: "transparent",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});

const OwnedPropertiesCard = ({
  property,
  setRemovedAProperty,
  setEditMode,
  setEditProperty,
  setSelectedFacilities,
  setSelectedAmenities,
  setSelectedAvailabilities,
  setImages,
}: {
  property: Property;
  setRemovedAProperty: (val: boolean) => void;
  setEditMode: (val: boolean) => void;
  setEditProperty: (val: Property) => void;
  setSelectedFacilities: (val: string[]) => void;
  setSelectedAmenities: (val: string[]) => void;
  setSelectedAvailabilities: (val: Availability[]) => void;
  setImages: (val: string[]) => void;
}) => {
  const imageUrl = property?.images?.[0]?.url;
  const { user } = useUserStore();
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [removedProperty, setRemovedProperty] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCloseBtn = () => {
    setRemovedProperty(false);
    // setRemovedAProperty(true);
  };
  const handleEditButtonClick = () => {
    setEditMode(true);
    setEditProperty(property);
    setSelectedAvailabilities(availabilities);
    const propertyImages = property.images;
    const newImages = propertyImages.map(
      (image: ResponseImageInfoType) => image.url
    );

    setImages(newImages);

    let selectedKeys = Object.entries(property.facilities)
      .filter(([key, value]) => value === true)
      .map(([key, value]) => key);

    let formattedKeys = selectedKeys.map(
      (key) =>
        key.charAt(0).toUpperCase() +
        key.slice(1).replace(/(?<=.)(?=[A-Z])/g, " ")
    );

    setSelectedFacilities(formattedKeys);

    selectedKeys = Object.entries(property.amenities)
      .filter(([key, value]) => value === true)
      .map(([key, value]) => key);

    formattedKeys = selectedKeys.map(
      (key) =>
        key.charAt(0).toUpperCase() +
        key.slice(1).replace(/(?<=.)(?=[A-Z])/g, " ")
    );

    setSelectedAmenities(formattedKeys);

    console.log(property.amenities);
  };

  const handleOkBtn = () => {
    setRemovedProperty(false);
    setRemovedAProperty(true);
  };

  const handleDeleteBtn = async () => {
    const token = localStorage.getItem("user");

    if (token) {
      const decodedToken: UserInfosType = jwtDecode(token);
      console.log(token);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime && user) {
        const r = await fetch(`http://localhost:8080/api/trips`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json",
          },
        });
        if (!r.ok) {
          console.log("Eroare cand iei calatorii");
          return;
        }

        const data: ResponseGetAllTripsType = await r.json();
        for (const tripPropertyUser of data) {
          console.log("curr trip is: " + tripPropertyUser);

          if (user.id === tripPropertyUser.userId) {
            const res = await fetch(
              `http://localhost:8080/api/users/${tripPropertyUser.userId}/trips/${tripPropertyUser.id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token.replace(/"/g, "")}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (!res.ok) {
              console.log("eroare cand stergi tripuri curent user logat");

              return;
            }
          }
        }

        for (const availability of availabilities) {
          if (availability.propertyId === property.id) {
            const resp = await fetch(
              `http://localhost:8080/api/availabilities/${availability.id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token.replace(/"/g, "")}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (!resp.ok) {
              console.log("eroare cand stergi disponibilitatea veche");

              return;
            }
          }
        }

        const res = await fetch(
          `http://localhost:8080/api/properties/${property.id}/trips`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token.replace(/"/g, "")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          console.log("eroare cand stergi proprietate user logat");

          return;
        }

        const resp = await fetch(
          `http://localhost:8080/api/users/${user?.id}/properties/${property.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token.replace(/"/g, "")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!resp.ok) {
          console.log("eroare cand stergi proprietate user logat");

          return;
        }
      }
      // setRemovedProperty(false);
      // setRemovedAProperty(true);
      setShowSuccess(true);
    }
  };

  useEffect(() => {
    getAllAvailabilities();
  }, []);

  const getAllAvailabilities = async () => {
    const res = await fetch(`http://localhost:8080/api/availabilities`, {
      method: "GET",
    });
    if (!res.ok) {
      console.log("Eroare cand iei proprietati");
      return;
    }

    const data: ResponseAllAvailabilitiesType = await res.json();
    // setTotalPages(data.totalPages);

    // const totalProperties: ResponseGetAllPropertiesType = data.content;
    setAvailabilities(
      data.map((availability) => ({
        id: availability.id,
        userId: availability.userId,
        propertyId: availability.propertyId,
        startDate: availability.startDate,
        endDate: availability.endDate,
      }))
    );
    // console.log(data);
  };

  const handleDeletePropertyClick = () => {
    setRemovedProperty(true);
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          position: "relative",
          margin: "10px",
          borderRadius: "14px",
          height: "400px",
          overflow: "hidden",
          width: "400px",
        }}
      >
        <div className="prop-details">
          {imageUrl ? (
            <img className="photo-prop" src={imageUrl} alt={property?.name} />
          ) : (
            <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
              No images available
            </Typography>
          )}
          <div className="name-of-prop">
            <Typography
              variant="h6"
              component="span"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                mt: 1,
              }}
            >
              {property?.name}
            </Typography>
          </div>

          <div className="edit-prop-btns">
            <Button
              variant="outlined"
              onClick={() => handleDeletePropertyClick()}
              sx={styleBtn()}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleEditButtonClick()}
              sx={styleBtn()}
            >
              Edit
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={removedProperty} onClose={() => handleCloseBtn()}>
        <DialogTitle color={"#f58989"}>{"Attention! 🥺"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the property?
          </DialogContentText>
          <DialogContentText>
            {" "}
            All trips planned for it will be automatically cancelled!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDeleteBtn()}>Delete</Button>
          <Button onClick={() => handleCloseBtn()}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showSuccess} onClose={() => handleOkBtn()}>
        <DialogTitle color={"rgb(8, 124, 8)"}>{"Great news! 🥳"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your property has been deleted successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleOkBtn()}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OwnedPropertiesCard;
