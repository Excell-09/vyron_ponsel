import axios from "axios";

const AppAxios = axios.create({
  baseURL: "/api",
});

export default AppAxios;
