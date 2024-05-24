import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import setUser from "../App";
const API_URL = "http://localhost:8080/api";
import { useUserStore } from "../App";

type loginCredentials = {
  username: string;
  password: string;
};

type userId = {
  id: number;
};

type registerCredentials = {
  role: string;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  language: string;
  phoneNumber: number;
  prefixNumber: string;
};

type updateUserValues = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  language: string;
};

type loginResp = {
  jwt: string;
};

type userInfos = {
  role: string;
  email: string;
  username: string;
  id: number;
  exp: number;
  iat: number;
};

const AuthService = () => {
  const login = async (logCredentials: loginCredentials) => {
    console.log(logCredentials);
    let token = "";
    let errorMessage = "";
    let userRole = "";
    let userEmail = "";

    await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logCredentials),
    })
      .then(async (res) => {
        console.log(res);

        if (!res.ok) {
          const apiError = await res.json();
          console.log(apiError);
          throw new Error(JSON.stringify(apiError));
        }
        return res.json();
      })
      .then((data: loginResp) => {
        console.log(data);
        token = data.jwt;

        const userInfo: userInfos = jwtDecode(data.jwt);
        userRole = userInfo.role;
        userEmail = userInfo.email;

        console.log(userInfo.role);
      })
      .catch((err) => {
        console.log("err:");

        console.log(JSON.parse(err.message).message);
        errorMessage = JSON.parse(err.message).message;
        // errorMessage = JSON.parse(err.message);
      });
    return {
      fuckingToken: token,
      error: errorMessage,
      role: userRole,
      email: userEmail,
    };
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("user");
    let user = null;
    let errorMessage = "";

    if (token) {
      const decodedToken: userInfos = jwtDecode(token);
      console.log(decodedToken);
      const currentTime = Date.now() / 1000;
      // console.log(userId);
      if (decodedToken.exp > currentTime) {
        const userId = decodedToken.id;
        await fetch(`${API_URL}/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            user = data;
          })
          .catch((err) => {
            console.log("err:");
            console.log(err);
            errorMessage = JSON.parse(err.message).message;
          });
      } else {
        localStorage.removeItem("user");
        errorMessage = "Session expired. Please log in again";
        // setUser(null);
      }
    }
    return {
      userDetails: user,
      error: errorMessage,
    };
  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  const register = async (regCredentials: registerCredentials) => {
    console.log("mycredentials= " + JSON.stringify(regCredentials));
    // registerCredentials.phoneNumber = regCredentials.prefix;
    // let token = "";
    // let userRole = "";
    // let userEmail = "";
    let errorMessage = "";

    await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regCredentials),
    })
      .then(async (res) => {
        console.log(res);

        if (!res.ok) {
          const apiError = await res.json();
          console.log(apiError);
          throw new Error(JSON.stringify(apiError));
        }
        return res.json();
      })
      .catch((err) => {
        console.log("err:");

        console.log(JSON.parse(err.message).message);
        errorMessage = JSON.parse(err.message).message;
        // errorMessage = JSON.parse(err.message);
      });

    return { error: errorMessage };
  };

  const updateUser = async (updateUserVal: updateUserValues) => {
    await fetch(`${API_URL}/register`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUserVal),
    })
      .then(async (res) => {
        console.log(res);

        if (!res.ok) {
          const apiError = await res.json();
          console.log(apiError);
          throw new Error(JSON.stringify(apiError));
        }
        return res.json();
      })
      .catch((err) => {
        console.log("err:");

        console.log(JSON.parse(err.message).message);
        // errorMessage = JSON.parse(err.message).message;
        // errorMessage = JSON.parse(err.message);
      });

    // return { error: errorMessage };s
  };

  const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  };

  return { login, logout, register, getCurrentUser, fetchUser };
};

export default AuthService;
