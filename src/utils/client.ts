import axios from "axios";

const client = axios.create({
  baseURL: "https://dummyjson.com/products/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
