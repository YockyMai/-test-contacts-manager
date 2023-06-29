import axios from "axios";

const instance = axios.create({
  baseURL: "https://6304f38b697408f7edbee328.mockapi.io/",
  timeout: 3000,
});

export { instance as $http };
