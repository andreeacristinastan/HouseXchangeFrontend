import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
  phoneNumber: string;
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

        console.log(JSON.parse(err.message));
        errorMessage = JSON.parse(err.message).message;
        // errorMessage = JSON.parse(err.message);
      });

    // return axios
    //   .post(API_URL + "login", {
    //     username,
    //     password,
    //   })
    //   .then((response) => {
    //     if (response.data.accessToken) {
    //       localStorage.setItem("user", JSON.stringify(response.data));
    //     }

    //     return response.data;
    //   });
    return {
      fuckingToken: token,
      error: errorMessage,
      role: userRole,
      email: userEmail,
    };
  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  const register = (regCredentials: registerCredentials) => {
    const {
      role,
      email,
      username,
      password,
      firstName,
      lastName,
      language,
      phoneNumber,
    } = regCredentials;
    return axios.post(API_URL + "register", {
      role,
      email,
      username,
      password,
      firstName,
      lastName,
      language,
      phoneNumber,
    });
  };

  const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  };

  return { login, logout, register, getCurrentUser };
};

export default AuthService;
