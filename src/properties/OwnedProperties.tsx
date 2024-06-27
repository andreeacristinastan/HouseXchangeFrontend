import Typography from "@mui/material/Typography";
import React, { ChangeEvent, useEffect, useState } from "react";
import "./OwnedProperties.css";
import InfiniteLooper from "../utils/InfiniteLooper";
import { useUserStore } from "../utils/useUserStore";
import { UserInfosType } from "../utils/types/UserTypes";
import { jwtDecode } from "jwt-decode";
import { Formik, Field, Form } from "formik";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import {
  Property,
  PropertyCreationType,
  PropertyImageSearch,
  ResponseAddPropertyType,
  ResponseGetAllPropertiesType,
  UpdateUserPropertyType,
} from "../utils/types/PropertyTypes";
import OwnedPropertiesCard from "./OwnedPropertiesCard";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PropertyCard from "./PropertyCard";
import {
  ResponseGetAllTripsType,
  Trip,
  TripInfo,
} from "../utils/types/TripTypes";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import {
  Availability,
  CreateAvailabilityType,
} from "../utils/types/AvailabilityTypes";
import DateRangePicker from "../utils/DateRangePicker";
import {
  ImageCreationType,
  ResponseImageInfoType,
} from "../utils/types/ImageTypes";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import {
  makeDeleteRequest,
  makeUploadRequest,
} from "../utils/CloudinaryHelper";
import { CreateFacilityType } from "../utils/types/FacilityTypes";
import { CreateAmenityType } from "../utils/types/AmenityTypes";
import AuthService from "../services/AuthService";
// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const numberOfRooms = [1, 2, 3, 4, 5, 6];
const numberOfBathrooms = [1, 2, 3, 4, 5, 6];
const facilities = ["Towel", "Balcony", "Air Conditioning", "Tv"];
const amenities = [
  "Pets Friendly",
  "Disabilities Friendly",
  "Swimming Pool",
  "Garden",
  "Parking",
  "Gym",
  "Wifi",
  "Bikes",
  "Kids Zone",
];
const meals = ["Breakfast", "Lunch", "Dinner"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const OwnedProperties = () => {
  const [files, setFiles] = useState([]);
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [property, setProperty] = useState<Property>();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [removedAProperty, setRemovedAProperty] = useState(false);
  const { user } = useUserStore();
  const [editMode, setEditMode] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState([""]);
  const [displayedImages, setDisplayedImages] = useState([""]);
  const [tokens, setTokens] = useState<string[]>([]);
  const [newFacilities, setNewFacilities] = useState<CreateFacilityType>({
    towel: false,
    balcony: false,
    airConditioning: false,
    tv: false,
  });

  const [newAmenities, setNewAmenities] = useState<CreateAmenityType>({
    petsFriendly: false,
    disabilitiesFriendly: false,
    swimmingPool: false,
    garden: false,
    parking: false,
    gym: false,
    wifi: false,
    bikes: false,
    kidsZone: false,
  });

  // const [facilityKeys, setFacilityKeys] = React.useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [selectedAvailabilities, setSelectedAvailabilities] = useState([""]);
  const [displayedAvailabilities, setDisplayedAvailabilities] = useState([""]);
  const [dates, setDates] = useState<{ startDate: string; endDate: string }[]>(
    []
  );

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleAvailabilities = (start: string, end: string, action: string) => {
    if (action === "add") {
      const newDate = { startDate: start, endDate: end };
      const newDisplayedAvailability = `${start}-${end}`;

      setDates((prevDates) => [...prevDates, newDate]);
      setDisplayedAvailabilities((prevDates) => [
        ...prevDates,
        newDisplayedAvailability,
      ]);
    } else if (action === "delete") {
      setDates((prevDates) =>
        prevDates.filter(
          (date) => date.startDate !== start && date.endDate !== end
        )
      );
    }

    // dates.map((d) => {
    //   // console.log("Cand sterg un  range am valorile: ");
    //   // console.log(parts[0]);
    //   // console.log(parts[1]);
    //   console.log(d);
    // });
  };
  const handleAddImages = (image: string) => {
    setDisplayedImages((prevImageVector) => [...prevImageVector, image]);
    setFiles([]);
  };

  const handleCancelBtnClick = () => {
    const newSelectedAvailabilities: string[] = availabilities.map(
      (availability) => {
        return `${availability.startDate}-${availability.endDate}`;
      }
    );
    setDates([]);
    setSelectedAvailabilities(newSelectedAvailabilities);
    setDisplayedAvailabilities(newSelectedAvailabilities);
    const newSelectedImages: string[] = images.map((image) => {
      return `${image}`;
    });
    setSelectedImages(newSelectedImages);
    setDisplayedImages(newSelectedImages);
    window.location.reload();
    setEditMode(false);
  };

  // const handleSaveBtnClick = () => {
  //   setEditMode(false);
  //   const newSelectedAvailabilities: string[] = availabilities.map(
  //     (availability) => {
  //       return `${availability.startDate}-${availability.endDate}`;
  //     }
  //   );
  //   setDates([]);
  //   setSelectedAvailabilities(newSelectedAvailabilities);
  //   setDisplayedAvailabilities(newSelectedAvailabilities);
  //   const newSelectedImages: string[] = images.map((image) => {
  //     return `${image}`;
  //   });
  //   setSelectedImages(newSelectedImages);
  //   setDisplayedImages(newSelectedImages);
  // };

  const revert = (token, successCallback, errorCallback) => {
    makeDeleteRequest({
      token,
      successCallback,
      errorCallback,
    });
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

  useEffect(() => {
    const newSelectedAvailabilities: string[] = availabilities.map(
      (availability) => {
        return `${availability.startDate}-${availability.endDate}`;
      }
    );

    setSelectedAvailabilities(newSelectedAvailabilities);
    setDisplayedAvailabilities(newSelectedAvailabilities);
  }, [availabilities]);

  useEffect(() => {
    const newSelectedImages: string[] = images.map((image) => {
      return `${image}`;
    });
    setSelectedImages(newSelectedImages);
    setDisplayedImages(newSelectedImages);
    // console.log(images);
  }, [images]);

  const handleFacilitiesChange = (
    event: SelectChangeEvent<typeof facilities>
  ) => {
    const {
      target: { value },
    } = event;

    setSelectedFacilities(typeof value === "string" ? value.split(",") : value);
    // console.log(selectedFacilities);
  };

  const handleAmenitiesChange = (
    event: SelectChangeEvent<typeof amenities>
  ) => {
    const {
      target: { value },
    } = event;
    console.log(value);

    setSelectedAmenities(typeof value === "string" ? value.split(",") : value);
  };

  const handleAvailabilitiesChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    setSelectedAvailabilities(
      typeof value === "string" ? value.split(",") : value
    );

    // console.log(typeof value === "string" ? value.split(",") : value);
  };

  const handleImagesChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    setSelectedImages(typeof value === "string" ? value.split(",") : value);

    // console.log(typeof value === "string" ? value.split(",") : value);
  };

  const bookingsByMonth = trips.reduce((acc, trip) => {
    const month = new Date(trip.checkInDate).getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, Array(12).fill(0));

  const monthLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const bookingsData = bookingsByMonth.map((count, index) => ({
    month: monthLabels[index],
    bookings: count,
  }));

  const chartDataTrips = {
    labels: bookingsData.map((entry) => entry.month),
    datasets: [
      {
        label: "Bookings",
        data: bookingsData.map((entry) => entry.bookings),
        backgroundColor: "rgba(75, 192, 192, 1)", // Adjust color as needed
      },
    ],
  };

  const chartOptionsTrips = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white", // Legend label color
          font: {
            size: 16, // Legend label font size
          },
        },
      },
      title: {
        display: true,
        text: "Total Trips Booked for each month this year",
        color: "white", // Title color
        font: {
          size: 20, // Title font size
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // X-axis label color
          font: {
            size: 15, // Title font size
          },
        },
      },
      y: {
        ticks: {
          color: "white", // Y-axis label color
          font: {
            size: 15, // Title font size
          },
        },
      },
    },
  };

  const cities = properties.map((property) => property.city);
  const cityCounts = cities.reduce((acc, city) => {
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const chartData = {
    labels: Object.keys(cityCounts),
    datasets: [
      {
        label: "Number of Properties",

        data: Object.values(cityCounts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    color: "#fff",

    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "white", // Legend label color
          font: {
            size: 16, // Legend label font size
          },
        },
      },
      title: {
        display: true,
        color: "#fff",
        text: "Properties per City",
        font: {
          size: 20, // Title font size
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // X-axis label color
          font: {
            size: 15, // Title font size
          },
        },
      },
      y: {
        ticks: {
          color: "white", // Y-axis label color
          font: {
            size: 15, // Title font size
          },
        },
      },
    },
  };
  const getProperties = async () => {
    const token = localStorage.getItem("user");

    if (token) {
      const decodedToken: UserInfosType = jwtDecode(token);
      // console.log(token);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime && user) {
        const res = await fetch(
          `http://localhost:8080/api/users/${user?.id}/properties`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token.replace(/"/g, "")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          console.log("Eroare cand iei proprietatile userului");
          return;
        }

        const data: ResponseGetAllPropertiesType = await res.json();
        setProperties(
          data.map((property) => ({
            id: property.id,
            name: property.name,
            propertyType: property.propertyType,
            bathrooms: property.numberOfBathrooms,
            rooms: property.numberOfRooms,
            country: property.country,
            city: property.city,
            address: property.address,
            price: property.price,
            images: property.images,
            propertyDescription: property.propertyDescription,
            trips: property.trips,
            amenities: property.amenityInfo,
            facilities: property.facilityDto,
            meals: property.mealInfo,
          }))
        );

        // console.log("Properties:");

        // console.log(properties);
      }
    }
  };

  const getTrips = async () => {
    const token = localStorage.getItem("user");

    if (token) {
      const decodedToken: UserInfosType = jwtDecode(token);
      // console.log(token);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime && user) {
        const res = await fetch(
          `http://localhost:8080/api/users/${user?.id}/trips-all`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token.replace(/"/g, "")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          console.log("Eroare cand iei proprietatile userului");
          return;
        }

        const data: ResponseGetAllTripsType = await res.json();
        setTrips(
          data.map((trip) => ({
            id: trip.id,
            numberOfPersons: trip.numberOfPersons,
            destination: trip.destination,
            minRange: trip.minRange,
            maxRange: trip.maxRange,
            checkInDate: trip.checkInDate,
            checkOutDate: trip.checkOutDate,
            userId: trip.userId,
            propertyId: trip.propertyId,
          }))
        );
      }
    }
  };

  useEffect(() => {
    getProperties();
    getTrips();
  }, []);

  useEffect(() => {
    getProperties();
    getTrips();
    setRemovedAProperty(false);
  }, [removedAProperty]);

  return (
    <div className="owned-properties-container">
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
        rel="stylesheet"
      />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@900&family=Spicy+Rice&display=swap" />

      <div className="center-container">
        <Typography
          color="inherit"
          variant="h2"
          sx={{
            fontFamily: '"Oswald", sans-serif',
            width: "100%",
            color: "#fff",
          }}
        >
          Your beloved properties:
        </Typography>
        {properties.length > 3 ? (
          <InfiniteLooper speed={30} direction="left">
            <div className="container">
              <div className="scroll-container">
                {properties.map((property) => (
                  <div key={property.id}>
                    <OwnedPropertiesCard
                      property={property}
                      setRemovedAProperty={setRemovedAProperty}
                      setEditMode={setEditMode}
                      setEditProperty={setProperty}
                      setSelectedFacilities={setSelectedFacilities}
                      setSelectedAmenities={setSelectedAmenities}
                      setSelectedAvailabilities={setAvailabilities}
                      setImages={setImages}
                    />
                  </div>
                ))}
              </div>
            </div>
          </InfiniteLooper>
        ) : (
          <div className="container-fixed">
            <div className="scroll-container">
              {properties.map((property) => (
                <div key={property.id}>
                  <OwnedPropertiesCard
                    property={property}
                    setRemovedAProperty={setRemovedAProperty}
                    setEditMode={setEditMode}
                    setEditProperty={setProperty}
                    setSelectedFacilities={setSelectedFacilities}
                    setSelectedAmenities={setSelectedAmenities}
                    setSelectedAvailabilities={setAvailabilities}
                    setImages={setImages}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <Typography
          color="inherit"
          align="center"
          variant="h2"
          // marked="center"
          sx={{
            fontFamily: '"Oswald", sans-serif',
            width: "70%",
            color: "#fff",
          }}
        >
          Some insights about your history with us:
        </Typography>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: 1 }}>
            <Bar data={chartData} options={chartOptions} height={200} />
          </div>
          <div style={{ flex: 1 }}>
            <Bar
              data={chartDataTrips}
              options={chartOptionsTrips}
              height={200}
            />
          </div>
        </div>
      </div>

      {editMode && (
        // <div className="bckg">
        <div className="edit-mode-container">
          <Formik
            initialValues={{
              name: property?.name,
              description: property?.propertyDescription,
              price: property?.price,
              numberOfRooms: property?.rooms,
              numberOfBathrooms: property?.bathrooms,
            }}
            onSubmit={async (values) => {
              console.log(values.description);
              console.log(selectedAmenities);
              console.log(selectedAvailabilities);
              console.log(selectedImages);

              const updatedAmenities: CreateAmenityType = { ...newAmenities };
              selectedAmenities.forEach((amenity) => {
                updatedAmenities[
                  amenity.toLowerCase() as keyof typeof newAmenities
                ] = true;
              });

              // setNewAmenities(updatedAmenities);

              const updatedFacilities: CreateFacilityType = {
                ...newFacilities,
              };
              selectedFacilities.forEach((facility) => {
                updatedFacilities[
                  facility.toLowerCase() as keyof typeof newFacilities
                ] = true;
              });

              // setNewFacilities(updatedFacilities);

              const updateProperty: UpdateUserPropertyType = {
                name: values.name,
                propertyDescription: values.description,
                numberOfBathrooms: Number(values.numberOfBathrooms),
                numberOfRooms: Number(values.numberOfRooms),
                price: values.price,
                userId: user?.id,
                propertyId: property?.id,
                facilities: updatedFacilities,
                amenities: updatedAmenities,
              };

              // console.log(updateProperty);
              // return;

              const response: ResponseAddPropertyType =
                await AuthService().updateProperty(updateProperty);
              // console.log("property is: " + addProperty);

              if (response.error.length !== 0) {
                tokens.map((token) => {
                  revert(
                    token,
                    () => {},
                    () => {}
                  );
                });
                setImages([]);
                setFiles([]);
                setErr(true);
                setErrorMessage(response.error);
                setOpenSnackbar(true);
              } else {
                const token = localStorage.getItem("user");

                if (token) {
                  const decodedToken: UserInfosType = jwtDecode(token);
                  const currentTime = Date.now() / 1000;
                  if (decodedToken.exp > currentTime) {
                    const resp = await fetch(
                      `http://localhost:8080/api/properties/${property?.id}/images`,
                      {
                        method: "DELETE",
                        headers: {
                          Authorization: `Bearer ${token.replace(/"/g, "")}`,
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    if (!resp.ok) {
                      setErr(true);
                      setErrorMessage(
                        "An error occured while trying to delete the old images"
                      );
                      setOpenSnackbar(true);

                      return;
                    }

                    selectedImages.map(async (image) => {
                      // console.log("first" + image);
                      const addImage: ImageCreationType = {
                        url: image,
                        propertyId: property?.id,
                      };

                      const response = await AuthService().createImage(
                        addImage
                      );
                      if (response.error.length !== 0) {
                        tokens.map((token) => {
                          revert(
                            token,
                            () => {},
                            () => {}
                          );
                        });
                        setErr(true);
                        setErrorMessage(response.error);
                        setOpenSnackbar(true);
                      }
                      // console.log(response);
                    });
                    availabilities.map(async (availability) => {
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
                        setErr(true);
                        setErrorMessage(
                          "An error occured while trying to delete the old availabilities"
                        );
                        setOpenSnackbar(true);

                        return;
                      }
                    });

                    selectedAvailabilities.map(async (date) => {
                      // console.log(date);
                      const [startDate, endDate] = date.split("-");
                      const addAvailability: CreateAvailabilityType = {
                        userId: user?.id,
                        propertyId: property?.id,
                        startDate: startDate,
                        endDate: endDate,
                      };

                      const response = await AuthService().createAvailability(
                        addAvailability
                      );
                      if (response.error.length !== 0) {
                        setErr(true);
                        setErrorMessage(
                          "An error occured while trying to add new availabilities"
                        );
                        setOpenSnackbar(true);
                      }
                      // console.log(response);
                    });
                  }
                }

                setSuccess(true);
                setSuccessMessage("Property edited successfully!");
                setImages([]);
                setFiles([]);
                handleCancelBtnClick();
              }
            }}
          >
            <Form className="form-edit-property">
              <h2 className="property-label">Edit your property</h2>

              <div className="edit-property-fields">
                <Field
                  as={TextField}
                  name="name"
                  defaultValue={property?.name}
                  sx={{
                    m: 1,
                    width: "100%",
                    height: "30px",
                    color: "#588b97",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "24px",
                      color: "#588b97",
                      "&:hover": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #ccc",
                        },
                      },
                      "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #ccc",
                        },
                      },
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: "#7c7878",
                    },
                  }}
                  label="Name"
                />
                <Field
                  as={TextField}
                  name="description"
                  defaultValue={property?.propertyDescription}
                  sx={{
                    m: 1,
                    width: "100%",
                    height: "30px",
                    marginTop: "30px",
                    color: "#588b97",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "24px",
                      color: "#588b97",
                      "&:hover": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #ccc",
                        },
                      },
                      "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #ccc",
                          width: "auto",
                          height: "auto",
                        },
                      },
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: "#7c7878",
                    },
                  }}
                  label="Description"
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Field
                    as={TextField}
                    name="numberOfRooms"
                    defaultValue={property?.rooms}
                    sx={{
                      m: 1,
                      width: "100%",
                      height: "30px",
                      marginTop: "30px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "24px",
                        color: "#588b97",
                        "&:hover": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid #ccc",
                          },
                        },
                        "&.Mui-focused": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid #ccc",
                          },
                        },
                      },
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: "#7c7878",
                      },
                    }}
                    // id="outlined-select-prefix"
                    select
                    label="Number Of Rooms"
                  >
                    {numberOfRooms.map((option: number) => (
                      <MenuItem
                        key={option.toString()}
                        value={option.toString()}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Field>
                  <Field
                    as={TextField}
                    name="numberOfBathrooms"
                    defaultValue={property?.bathrooms}
                    sx={{
                      m: 1,
                      width: "100%",
                      height: "30px",
                      marginTop: "30px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "24px",
                        color: "#588b97",
                        "&:hover": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid #ccc",
                          },
                        },
                        "&.Mui-focused": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid #ccc",
                          },
                        },
                      },
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: "#7c7878",
                      },
                    }}
                    // id="outlined-select-prefix"
                    select
                    label="Number Of Bathrooms"
                  >
                    {numberOfBathrooms.map((option: number) => (
                      <MenuItem
                        key={option.toString()}
                        value={option.toString()}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Field>
                  <Field
                    as={TextField}
                    name="price"
                    className="textField"
                    sx={{
                      m: 1,
                      width: "100%",
                      height: "30px",
                      marginTop: "30px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "24px",
                        color: "#588b97",
                        "&:hover": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid #ccc",
                          },
                        },
                        "&.Mui-focused": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid #ccc",
                          },
                        },
                      },
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: "#7c7878",
                      },
                    }}
                    defaultValue={property?.price}
                    label="Price (RON)"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FormControl sx={{ m: 1, mt: 5, width: "100%" }}>
                    <InputLabel
                      id="facilities-label"
                      sx={{ color: "#588b97 !important" }}
                    >
                      Facilities
                    </InputLabel>
                    <Select
                      sx={{
                        borderRadius: "24px",

                        color: "#588b97",

                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #ccc",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #ccc",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #ccc",
                        },
                        "&.MuiInputLabel-shrink": { color: "red" },
                      }}
                      labelId="facilities-label"
                      // id="demo-multiple-checkbox"
                      input={<OutlinedInput label="Facilities" />}
                      multiple
                      value={selectedFacilities}
                      onChange={handleFacilitiesChange}
                      placeholder="Facilities"
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {facilities.map((option) => (
                        <MenuItem key={option} value={option}>
                          <Checkbox
                            checked={selectedFacilities.indexOf(option) > -1}
                            sx={{ color: "#588b97 !important" }}
                          />
                          <ListItemText
                            primary={option}
                            sx={{ color: "#588b97 !important" }}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mt: 5, width: "100%" }}>
                    <InputLabel
                      id="amenities-label"
                      sx={{ color: "#588b97 !important" }}
                    >
                      Amenities
                    </InputLabel>
                    <Select
                      name="Amenities"
                      sx={{
                        borderRadius: "24px",
                        color: "#588b97",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #ccc",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #ccc",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #ccc",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#7c7878", // Label color when focused
                        },
                        "& .MuiInputLabel-root": {
                          color: "#ccc", // Default label color
                        },
                      }}
                      labelId="amenities-label"
                      input={<OutlinedInput label="Amenities" />}
                      multiple
                      value={selectedAmenities}
                      onChange={handleAmenitiesChange}
                      placeholder="Amenities"
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {amenities.map((option) => (
                        <MenuItem key={option} value={option}>
                          <Checkbox
                            checked={selectedAmenities.indexOf(option) > -1}
                            sx={{ color: "#588b97 !important" }}
                          />
                          <ListItemText
                            primary={option}
                            sx={{ color: "#588b97 !important" }}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    m: 1,
                  }}
                >
                  <FormControl sx={{ mr: 5, width: 300 }}>
                    <InputLabel
                      id="availabilities-label"
                      sx={{ color: "#588b97 !important" }}
                    >
                      Availabilities
                    </InputLabel>
                    <Select
                      sx={{
                        borderRadius: "24px",

                        color: "#588b97",

                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #ccc",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #ccc",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #ccc",
                        },
                        "&.MuiInputLabel-shrink": { color: "red" },
                      }}
                      labelId="availabilities-label"
                      // id="demo-multiple-checkbox"
                      input={<OutlinedInput label="Availabilities" />}
                      multiple
                      value={selectedAvailabilities}
                      onChange={handleAvailabilitiesChange}
                      placeholder="Availabilities"
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {displayedAvailabilities.map((option) => (
                        <MenuItem key={option} value={option}>
                          <Checkbox
                            checked={
                              selectedAvailabilities.indexOf(option) > -1
                            }
                            sx={{ color: "#588b97 !important" }}
                          />
                          <ListItemText
                            primary={option}
                            // secondary={option.endDate}
                            sx={{ color: "#588b97 !important" }}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <div className="calendar-container">
                    <InputLabel
                      id="availabilities-label"
                      sx={{ color: "#fff !important" }}
                    >
                      Add new availability dates for your property
                    </InputLabel>
                    <DateRangePicker
                      handleAvailabilities={handleAvailabilities}
                    />
                  </div>
                </Box>

                <FormControl sx={{ width: "100%" }}>
                  <InputLabel
                    id="photos-label"
                    sx={{ color: "#588b97 !important" }}
                  >
                    Update property's photos
                  </InputLabel>
                  <Select
                    name="Photos"
                    sx={{
                      borderRadius: "24px",
                      color: "#588b97",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #ccc",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #ccc",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #ccc",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#7c7878", // Label color when focused
                      },
                      "& .MuiInputLabel-root": {
                        color: "#ccc", // Default label color
                      },
                    }}
                    labelId="Photos-label"
                    input={<OutlinedInput label="Amenities" />}
                    multiple
                    value={selectedImages}
                    onChange={handleImagesChange}
                    placeholder="Photos"
                    renderValue={(selected) =>
                      selected.map((value) => (
                        <img
                          style={{
                            marginRight: "3%",
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                          }}
                          src={value}
                          alt={value}
                        />
                      ))
                    }
                    MenuProps={MenuProps}
                  >
                    {displayedImages.map((option) => (
                      <MenuItem key={option} value={option}>
                        <Checkbox
                          checked={selectedImages.indexOf(option) > -1}
                          sx={{ color: "#588b97 !important" }}
                        />
                        {/* <ListItemText
                          primary={option}
                          sx={{ color: "#588b97 !important" }}
                        /> */}
                        <img
                          className="photo-check-box"
                          src={option}
                          alt={option}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div
                  style={{
                    width: "100%",
                    height: "70px",
                    // margin: 1,
                    // padding: "10px",
                    marginTop: "20px",
                    // marginBottom: "30px",
                  }}
                >
                  {/* <div className="title">Insert your property photos:</div> */}
                  <FilePond
                    files={files}
                    acceptedFileTypes="image/*"
                    onupdatefiles={setFiles}
                    allowMultiple={true}
                    server={{ process, revert }}
                    name="file"
                    labelIdle='Drag & Drop your new property photos or <span class="filepond--label-action">Browse</span>'
                  />
                </div>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    // onClick={handleSaveBtnClick}
                    type="submit"
                    // disabled={isFilled()}
                    className="save-property-btn"
                  >
                    Save property
                  </button>
                  <button
                    onClick={handleCancelBtnClick}
                    // disabled={isFilled()}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </Box>
              </div>
            </Form>
          </Formik>
          {err && (
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={openSnackbar}
              className="snackbarError"
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
            >
              <Alert severity="error">{errorMessage}</Alert>
            </Snackbar>
          )}
        </div>
        // </div>
      )}
    </div>
  );
};

export default OwnedProperties;
