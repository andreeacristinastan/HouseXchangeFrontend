import React, { useEffect } from "react";
import AuthService from "../services/AuthService";
import { jwtDecode } from "jwt-decode";
const API_URL = "http://localhost:8080/api";

type userInfos = {
  role: string;
  email: string;
  username: string;
  id: number;
  exp: number;
  iat: number;
};

const Profile = ({ user }) => {
  // const { fetchUser } = AuthService();

  // useEffect(() => {
  //   // const token = localStorage.getItem("user");
  //   // if (token) {
  //   //   const decodedToken: userInfos = jwtDecode(token);
  //   //   const userId = decodedToken.id;
  //   //   console.log(userId);
  //   //   console.log(token);
  //   //   fetch(`${API_URL}/users/${userId}`, {
  //   //     method: "GET",
  //   //     headers: {
  //   //       Authorization: `Bearer ${token.replace(/"/g, "")}`,
  //   //     },
  //   //   })
  //   //     .then((res) => {
  //   //       console.log("my response:");
  //   //       console.log(res.json());
  //   //     })
  //   //     .then((data) => {
  //   //       // setCountries(data.data);
  //   //       console.log(data);
  //   //     })
  //   //     .catch((err) => console.log(err));
  //   // }
  // }, []);

  return <div>Profile</div>;
};

export default Profile;
