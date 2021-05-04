import axios from "axios";
import Cookies from "js-cookie";

const ENDPOINT_PATH = "localhost:8080/api/v1/";

export default {
  setUserLogged(userLogged) {
    Cookies.set("userLogged", userLogged);
  },
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  register(user, password) {
    //const data = { user, password };
    return axios.post(ENDPOINT_PATH + "regiser", {
      "user": user,
      "password": password
    });
  },
  login(user, password) {
    //const data = { user, password };
    return axios.get(ENDPOINT_PATH + "login", {
      "user": user,
      "password": password
    });
  }
};
