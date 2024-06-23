import { jwtDecode } from "jwt-decode";
import {
  LoginCredentialsType,
  LoginRespType,
  RegisterCredentialsType,
  UpdateUserValuesType,
  UserInfosType,
} from "../utils/types/UserTypes";
import {
  ImageCreationType,
  PropertyCreationType,
} from "../utils/types/PropertyTypes";
import { FeedbackCreationType } from "../utils/types/FeedbackTypes";
import { ProfileImageCreationType } from "../utils/types/ProfileImageTypes";
import { CreateAvailabilityType } from "../utils/types/AvailabilityTypes";
// import setUser from "../App";
const API_URL = "http://localhost:8080/api";

const AuthService = () => {
  const login = async (logCredentials: LoginCredentialsType) => {
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
      .then((data: LoginRespType) => {
        console.log(data);
        token = data.jwt;

        const userInfo: UserInfosType = jwtDecode(data.jwt);
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
      const decodedToken: UserInfosType = jwtDecode(token);
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

  const register = async (regCredentials: RegisterCredentialsType) => {
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

  const updateUser = async (updateUserVal: UpdateUserValuesType) => {
    console.log("user details" + updateUserVal);

    const token = localStorage.getItem("user");
    let errorMessage = "";
    let user = null;

    if (token) {
      const decodedToken: UserInfosType = jwtDecode(token);
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
            // console.log(JSON.stringify(data));

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

  const createProperty = async (propertyInfos: PropertyCreationType) => {
    console.log("my property details= " + JSON.stringify(propertyInfos));

    const token = localStorage.getItem("user");
    let errorMessage = "";
    let property = null;

    if (token) {
      const decodedToken: UserInfosType = jwtDecode(token);
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
          .then((data) => {
            console.log(data);

            property = data;
          })
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

    return { propertyDetails: property, error: errorMessage };
  };

  const createFeedback = async (feedbackCreate: FeedbackCreationType) => {
    console.log("my property details= " + JSON.stringify(feedbackCreate));

    const token = localStorage.getItem("user");
    let errorMessage = "";

    if (token) {
      const decodedToken: UserInfosType = jwtDecode(token);
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

  const createImage = async (imageCreate: ImageCreationType) => {
    // console.log("my property details= " + JSON.stringify(feedbackCreate));

    const token = localStorage.getItem("user");
    let errorMessage = "";

    if (token) {
      const decodedToken: UserInfosType = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        // const userId = decodedToken.id;
        // console.log("infos = " + JSON.stringify(updateUserVal));
        // console.log(user?.id);

        await fetch(`${API_URL}/images`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(imageCreate),
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

  const createAvailability = async (
    availabilityCreate: CreateAvailabilityType
  ) => {
    // console.log("my property details= " + JSON.stringify(feedbackCreate));

    const token = localStorage.getItem("user");
    let errorMessage = "";

    if (token) {
      const decodedToken: UserInfosType = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        // const userId = decodedToken.id;
        // console.log("infos = " + JSON.stringify(updateUserVal));
        // console.log(user?.id);

        await fetch(`${API_URL}/availabilities`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(availabilityCreate),
        })
          .then(async (res) => {
            // console.log(res);

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

  const createProfileImage = async (imageCreate: ProfileImageCreationType) => {
    // console.log("my property details= " + JSON.stringify(feedbackCreate));

    const token = localStorage.getItem("user");
    let errorMessage = "";

    if (token) {
      const decodedToken: UserInfosType = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        // const userId = decodedToken.id;
        // console.log("infos = " + JSON.stringify(updateUserVal));
        // console.log(user?.id);

        await fetch(`${API_URL}/profile-images`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(imageCreate),
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

  const updateProfileImage = async (
    imageCreate: ProfileImageCreationType,
    imageId: number
  ) => {
    // console.log("my property details= " + JSON.stringify(feedbackCreate));

    const token = localStorage.getItem("user");
    let errorMessage = "";

    if (token) {
      const decodedToken: UserInfosType = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        const userId = decodedToken.id;
        // console.log("infos = " + JSON.stringify(updateUserVal));
        // console.log(user?.id);

        await fetch(`${API_URL}/users/${userId}/profile-images/${imageId}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(imageCreate),
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
    createImage,
    createProfileImage,
    updateProfileImage,
    createAvailability,
  };
};

export default AuthService;
