import axios from "axios";

const APIUrl = axios.create({
    baseURL: "http://localhost:3000/",
});

export default APIUrl