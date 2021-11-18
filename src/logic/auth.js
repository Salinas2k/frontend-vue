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
    var data = JSON.stringify({
      "username": user,
      "password": password
    });

    var config = {
      method: 'get',
      url: ENDPOINT_PATH + "login",
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    return axios(config)
    .then (response => {
      console.log(JSON.stringify(response.data));
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
