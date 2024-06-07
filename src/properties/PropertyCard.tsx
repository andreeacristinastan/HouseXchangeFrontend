import React from "react";
import { Property } from "../utils/types/PropertyTypes";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./PropertyCard.css";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const labels: { [index: string]: string } = {
  0.5: "",
  1: "",
  1.5: "",
  2: "",
  2.5: "",
  3: "",
  3.5: "",
  4: "",
  4.5: "",
  5: "",
};

const PropertyCard = ({
  property,
  imageUrl,
}: {
  property: Property;
  imageUrl: string;
}) => {
  const navigate = useNavigate();

  const pathName = window.location.pathname;
  const isMyProperties = pathName.includes("my-properties");

  const handlePropertyDetails = () => {
    navigate(`/property-details/${property.id}`);
  };
  const value = 3.5;
  return (
    // <div
    //   onClick={() => !isMyProperties && handlePropertyDetails()}
    //   className="property-details-component"
    // >
    <Card
      sx={{
        maxWidth: 345,
        minHeight: 450,
        minWidth: 385,
        boxShadow: "20px 12px 15px 2px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* <CardActionArea> */}
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={property.name}
      />
      <CardContent
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          padding: "2%",
        }}
      >
        <Typography gutterBottom variant="h5" component="div" color={"#588b97"}>
          {property.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          minHeight={"40px"}
          maxHeight={"40px"}
          overflow={"hidden"}
          align="left"
        >
          {property.propertyDescription}
        </Typography>
        <Box
          sx={{
            width: 200,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Rating
            name="text-feedback"
            value={value}
            readOnly
            precision={0.5}
            emptyIcon={<StarIcon fontSize="inherit" />}
          />
          <Box>{labels[value]}</Box>
        </Box>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ marginTop: "20px", color: "#588b97" }}
        >
          RON{property.price} /Night
        </Typography>
      </CardContent>
      {/* </CardActionArea> */}
      <CardActions sx={{ padding: "0%", justifyContent: "center" }}>
        <button
          // size="small"
          // color="primary"
          onClick={() => !isMyProperties && handlePropertyDetails()}
          className="see-details"
        >
          See details
        </button>
      </CardActions>
    </Card>
    // </div>
  );
};

export default PropertyCard;
