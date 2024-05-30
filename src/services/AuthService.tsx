import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useUserStore } from "../utils/useUserStore";
// import setUser from "../App";
const API_URL = "http://localhost:8080/api";

type loginCredentials = {
  username: string;
  password: string;
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

type feedbackCreation = {
  feedback: string;
  toTheProperty: boolean;
  toTheApp: boolean;
  other: boolean;
  userId: number;
};

type updateUserValues = {
  email: string;
  // username: string;
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

type createFacility = {
  towel: boolean;
  balcony: boolean;
  airConditioning: boolean;
  tv: boolean;
  // propertyId: number;
};

type createAmenity = {
  gym: boolean;
  swimmingPool: boolean;
  garden: boolean;
  parking: boolean;
  wifi: boolean;
  bikes: boolean;
  kidsZone: boolean;
  petsFriendly: boolean;
  disabilitiesFriendly: boolean;
  // propertyId: number;
};

type createMeal = {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  // propertyId: number;
};

type propertyCreation = {
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
  userId: number | undefined;

  facilities: createFacility;
  amenities: createAmenity;
  meals: createMeal;
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
      // console.log(decodedToken);
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
    const token = localStorage.getItem("user");
    let errorMessage = "";
    let user = null;

    if (token) {
      const decodedToken: userInfos = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        const userId = decodedToken.id;
        // console.log("infos = " + JSON.stringify(updateUserVal));
        // console.log(user?.id);

        await fetch(`${API_URL}/users/${userId}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateUserVal),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(JSON.stringify(data));

            user = data;
          })
          .catch((err) => {
            console.log("err:");

            console.log(JSON.parse(err.message).message);
            errorMessage = JSON.parse(err.message).message;
            //   // errorMessage = JSON.parse(err.message);
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

  const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  };

  const createProperty = async (propertyInfos: propertyCreation) => {
    console.log("my property details= " + JSON.stringify(propertyInfos));

    const token = localStorage.getItem("user");
    let errorMessage = "";
    // let user = null;

    if (token) {
      const decodedToken: userInfos = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        // const userId = decodedToken.id;
        // console.log("infos = " + JSON.stringify(updateUserVal));
        // console.log(user?.id);

        await fetch(`${API_URL}/properties`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(propertyInfos),
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
          // .then((data) => {
          //   console.log(data);

          //   // user = data;
          // })
          .catch((err) => {
            console.log("err:");

            console.log(JSON.parse(err.message).message);
            errorMessage = JSON.parse(err.message).message;
            // errorMessage = JSON.parse(err.message);
          });
      } else {
        localStorage.removeItem("user");
        errorMessage = "Session expired. Please log in again";
        // setUser(null);
      }
    }

    return { error: errorMessage };
  };

  const createFeedback = async (feedbackCreate: feedbackCreation) => {
    console.log("my property details= " + JSON.stringify(feedbackCreate));

    const token = localStorage.getItem("user");
    let errorMessage = "";

    if (token) {
      const decodedToken: userInfos = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        // const userId = decodedToken.id;
        // console.log("infos = " + JSON.stringify(updateUserVal));
        // console.log(user?.id);

        await fetch(`${API_URL}/feedback`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackCreate),
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
          // .then((data) => {
          //   console.log(data);

          //   // user = data;
          // })
          .catch((err) => {
            console.log("err:");

            console.log(JSON.parse(err.message).message);
            errorMessage = JSON.parse(err.message).message;
            // errorMessage = JSON.parse(err.message);
          });
      } else {
        localStorage.removeItem("user");
        errorMessage = "Session expired. Please log in again";
        // setUser(null);
      }
    }

    return { error: errorMessage };
  };

  return {
    login,
    logout,
    register,
    getCurrentUser,
    fetchUser,
    updateUser,
    createProperty,
    createFeedback,
  };
};

export default AuthService;
