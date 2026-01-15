import axios from "axios";

const APIUrl = axios.create({
    baseURL: "http://localhost:3000/",
});

APIUrl.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("@auth:token");

        if(token){
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config
    },

    (error) => {
        return Promise.reject(error);
    }
)

export default APIUrl