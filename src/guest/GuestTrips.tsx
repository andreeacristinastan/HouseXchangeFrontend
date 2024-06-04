import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TablePagination,
} from "@mui/material";
import TextField from "../utils/TextField";
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "../utils/useUserStore";
import { json } from "stream/consumers";

interface Trip {
  id: number;
  numberOfPersons: number;
  checkIn: Date;
  checkOut: Date;
  destination: string;
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

type patchProperty = {
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
};

type userInfos = {
  role: string;
  email: string;
  username: string;
  id: number;
  exp: number;
  iat: number;
};

type patchTrip = {
  numberOfPersons: number;
  minRange: number;
  maxRange: number;
  checkInDate: Date;
  checkOutDate: Date;
};

type responseGetAllTrips = {
  id: number;
  numberOfPersons: number;
  destination: string;
  minRange: number;
  maxRange: number;
  checkInDate: Date;
  checkOutDate: Date;
  userId: number;
  propertyId: number;
}[];

const GuestTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const { user } = useUserStore();
  const [editOpen, setEditOpen] = useState(false);
  const [editedTrip, setEditedTrip] = useState<Trip | null>(null);
  const [editedNumberOfPersons, setEditedNumberOfPersons] = useState(0);

  const getTrips = async () => {
    const token = localStorage.getItem("user");

    if (token) {
      const decodedToken: userInfos = jwtDecode(token);
      console.log(token);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        const res = await fetch(
          `http://localhost:8080/api/users/${
            user?.id
          }/trips?page=${0}&size=${8}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token.replace(/"/g, "")}`,
            },
          }
        );
        if (!res.ok) {
          console.log("Eroare cand iei proprietati");
          return;
        }

        const data: responseGetAllTrips = await res.json();
        setTrips(
          data.map((trip) => ({
            id: trip.id,
            numberOfPersons: trip.numberOfPersons,
            checkIn: trip.checkInDate,
            checkOut: trip.checkOutDate,
            destination: trip.destination,
          }))
        );
      }
    }

    // console.log(data);
  };

  useEffect(() => {
    getTrips();
  }, []);

  const handleDelete = (trip: Trip) => {
    setSelectedTrip(trip);
    setOpen(true);
  };

  const handleClose = async (confirm: boolean) => {
    if (confirm && selectedTrip) {
      const token = localStorage.getItem("user");

      if (token) {
        const decodedToken: userInfos = jwtDecode(token);
        console.log(token);

        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          const res = await fetch(
            `http://localhost:8080/api/users/${user?.id}/trips/${selectedTrip.id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token.replace(/"/g, "")}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (!res.ok) {
            console.log("response:" + JSON.stringify(res));

            return;
          }
          getTrips();
          // setTrips(trips.filter((trip) => trip !== selectedTrip));
        }
      }
    }
    setOpen(false);
  };

  const handleEdit = (trip: Trip) => {
    setEditedTrip(trip);
    setEditedNumberOfPersons(trip.numberOfPersons);
    setEditOpen(true);
  };

  const handleEditClose = async (confirm: boolean) => {
    console.log("am intrat aici");

    if (confirm && editedTrip) {
      const token = localStorage.getItem("user");

      if (token) {
        const decodedToken: userInfos = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          const values: patchTrip = {
            numberOfPersons: editedNumberOfPersons,
            minRange: 0,
            maxRange: 0,
            checkInDate: new Date(),
            checkOutDate: new Date(),
          };
          const res = await fetch(
            `http://localhost:8080/api/users/${user?.id}/trips/${editedTrip.id}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token.replace(/"/g, "")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            }
          );
          if (!res.ok) {
            return;
          }

          getTrips();
          // setProperties(
          //   properties.map((property) =>
          //     property.id === editedProperty.id
          //       ? { ...property, name: editedName }
          //       : property
          //   )
          // );
        }
      }
    }
    setEditOpen(false);
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

  const filteredTrips = trips.filter((trip) =>
    trip.destination.toLowerCase().includes(search.toLowerCase())
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
              <TableCell>Destination</TableCell>
              <TableCell>Check In</TableCell>
              <TableCell>Check Out</TableCell>
              <TableCell>Number of Persons</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTrips
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((trip, index) => (
                <TableRow key={index}>
                  <TableCell>{trip.destination}</TableCell>
                  <TableCell>
                    {new Date(trip.checkIn).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(trip.checkOut).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{trip.numberOfPersons}</TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => handleEdit(trip)}>
                      Edit
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => handleDelete(trip)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredTrips.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Dialog open={open} onClose={() => handleClose(false)}>
          <DialogTitle>{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this property?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(false)}>Cancel</Button>
            <Button onClick={() => handleClose(true)} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={editOpen} onClose={() => handleEditClose(false)}>
          <DialogTitle>{"Edit Property"}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Number of persons"
              type="number"
              fullWidth
              value={editedNumberOfPersons}
              onChange={(event) =>
                setEditedNumberOfPersons(parseInt(event.target.value))
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleEditClose(false)}>Cancel</Button>
            <Button onClick={() => handleEditClose(true)}>Save</Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </div>
  );
};

export default GuestTrips;
