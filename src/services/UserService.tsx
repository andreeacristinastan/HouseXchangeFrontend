import axios from "axios";
import AuthHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/";

const UserService = () => {
  const { authHeader } = AuthHeader();
  const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
  };
  return { getUserBoard };
};

export default UserService;
