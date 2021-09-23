import axios from 'axios';

const ENDPOINT_PATH = "http://localhost:8080/api/v1/";

export default {
  register(user, password) {
    let data = {};
    data.username = user;
    data.password = password;
    return axios.post(ENDPOINT_PATH + "regiser", data);
  },

  login(user, password) {
    let data = {};
    data.username = user;
    data.password = password;
    return axios.post(ENDPOINT_PATH + "login", data)
    .then ((response) => {
      console.log(response.status);
      console.log(response.headers);
      return response;
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    })
    .then(() => {
      console.log();
    });
    
  }
};
