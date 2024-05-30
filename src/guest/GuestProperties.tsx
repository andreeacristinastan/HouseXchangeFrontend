import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../utils/useUserStore";
import { jwtDecode } from "jwt-decode";
import Paper from "@mui/material/Paper";

interface Property {
  id: number;
  name: string;
  propertyType: string;
  bathrooms: number;
  rooms: number;
}

type responsePropertyInfo = {
  id: number;
  name: string;
};

type responseFacility = {
  id: number;
  towel: boolean;
  balcony: boolean;
  airConditioning: boolean;
  tv: boolean;
  propertyInfo: responsePropertyInfo;
};

type responseAmenity = {
  id: number;
  gym: boolean;
  swimmingPool: boolean;
  garden: boolean;
  parking: boolean;
  wifi: boolean;
  bikes: boolean;
  kidsZone: boolean;
  petsFriendly: boolean;
  disabilitiesFriendly: boolean;
};

type responseMeal = {
  id: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
};

type responseTrips = {
  id: number;
  numberOfPersons: number;
  destination: string;
  checkInDate: Date;
  checkOutDate: Date;
  userId: number;
};

type responseGetAllProperties = {
  id: number;
  name: string;
  country: string;
  city: string;
  address: string;
  zipCode: number;
  propertyDescription: string;
  propertyType: string;
  numberOfBathrooms: number;
  numberOfRooms: number;
  price: number;
  userId: number;
  trips: responseTrips;
  mealInfo: responseMeal;
  amenityInfo: responseAmenity;
  facilityDto: responseFacility;
}[];

type postTrip = {
  numberOfPersons: number;
  destination: string;
  minRange: number;
  maxRange: number;
  checkInDate: Date;
  checkOutDate: Date;
  userId: number;
  propertyId: number;
};

type userInfos = {
  role: string;
  email: string;
  username: string;
  id: number;
  exp: number;
  iat: number;
};

const GuestProperties = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const [properties, setProperties] = useState<Property[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const { user } = useUserStore();
  const [checkInDate, setCheckInDate] = useState<Date>(currentDate);
  const [checkOutDate, setCheckOutDate] = useState<Date>(currentDate);
  const [num, setNumber] = useState<number>(0);

  const getProperties = async () => {
    const res = await fetch(
      `http://localhost:8080/api/properties?page=${0}&size=${8}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      console.log("Eroare cand iei proprietati");
      return;
    }

    const data: responseGetAllProperties = await res.json();
    setProperties(
      data.map((property) => ({
        id: property.id,
        name: property.name,
        propertyType: property.propertyType,
        bathrooms: property.numberOfBathrooms,
        rooms: property.numberOfRooms,
      }))
    );

    console.log(data);
  };

  useEffect(() => {
    getProperties();
  }, []);

  const handleAdd = (property: Property) => {
    setSelectedProperty(property);
    setOpen(true);
  };

  const handleClose = async (confirm: boolean) => {
    if (confirm && selectedProperty) {
      const token = localStorage.getItem("user");

      if (token) {
        const decodedToken: userInfos = jwtDecode(token);
        console.log(token);

        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime && user) {
          const values: postTrip = {
            numberOfPersons: num,
            destination: selectedProperty.name,
            minRange: 0,
            maxRange: 0,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            userId: user?.id,
            propertyId: selectedProperty.id,
          };
          const res = await fetch(`http://localhost:8080/api/trip`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token.replace(/"/g, "")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          if (!res.ok) {
            return;
          }
          setProperties(
            properties.filter((property) => property !== selectedProperty)
          );
        }
      }
    }
    setOpen(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div style={{ marginTop: "80px" }}>
      <TextField
        style={{ width: "100%" }}
        label="Search by name"
        variant="filled"
        value={search}
        onChange={handleSearch}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Property Type</TableCell>
              <TableCell>Number of Bathrooms</TableCell>
              <TableCell>Number of Rooms</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProperties
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((property, index) => (
                <TableRow key={index}>
                  <TableCell>{property.name}</TableCell>
                  <TableCell>{property.propertyType}</TableCell>
                  <TableCell>{property.bathrooms}</TableCell>
                  <TableCell>{property.rooms}</TableCell>
                  <TableCell>
                    <Button
                      color="secondary"
                      onClick={() => handleAdd(property)}
                    >
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredProperties.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Dialog open={open} onClose={() => handleClose(false)}>
          <DialogTitle>{"Confirm Add"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to add a trip to this property?
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Check-in Date"
              type="date"
              fullWidth
              value={checkInDate.toISOString().substr(0, 10)}
              onChange={(event) => setCheckInDate(new Date(event.target.value))}
            />
            <TextField
              margin="dense"
              label="Check-out Date"
              type="date"
              fullWidth
              value={checkOutDate.toISOString().substr(0, 10)}
              onChange={(event) =>
                setCheckOutDate(new Date(event.target.value))
              }
            />
            <TextField
              margin="dense"
              label="Number of persons"
              type="number"
              fullWidth
              value={num}
              onChange={(event) => setNumber(parseInt(event.target.value, 10))}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(false)}>Cancel</Button>
            <Button onClick={() => handleClose(true)} autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </div>
  );
};

export default GuestProperties;
