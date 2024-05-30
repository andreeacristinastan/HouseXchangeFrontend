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
import TextField from "../../utils/TextField";
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "../../utils/useUserStore";

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
const HostProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const { user } = useUserStore();
  const [editOpen, setEditOpen] = useState(false);
  const [editedProperty, setEditedProperty] = useState<Property | null>(null);
  const [editedName, setEditedName] = useState("");

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

  const handleDelete = (property: Property) => {
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
        if (decodedToken.exp > currentTime) {
          const res = await fetch(
            `http://localhost:8080/api/users/${user?.id}/properties/${selectedProperty.id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token.replace(/"/g, "")}`,
                "Content-Type": "application/json",
              },
            }
          );
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

  const handleEdit = (property: Property) => {
    setEditedProperty(property);
    setEditedName(property.name);
    setEditOpen(true);
  };

  const handleEditClose = async (confirm: boolean) => {
    console.log("am intrat aici");

    if (confirm && editedProperty) {
      const token = localStorage.getItem("user");

      if (token) {
        const decodedToken: userInfos = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          const values: patchProperty = {
            name: editedName,
            country: "",
            city: "",
            address: "",
            zipCode: 0,
            propertyDescription: "",
            propertyType: "",
            numberOfBathrooms: 0,
            numberOfRooms: 0,
            price: 0,
          };
          const res = await fetch(
            `http://localhost:8080/api/users/${user?.id}/properties/${editedProperty.id}`,
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
          setProperties(
            properties.map((property) =>
              property.id === editedProperty.id
                ? { ...property, name: editedName }
                : property
            )
          );
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
                      color="primary"
                      onClick={() => handleEdit(property)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => handleDelete(property)}
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
          count={filteredProperties.length}
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
              label="Name"
              type="text"
              fullWidth
              value={editedName}
              onChange={(event) => setEditedName(event.target.value)}
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

export default HostProperties;
