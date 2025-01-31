import axios from "axios";

const axiosInstance = axios.create({
  
      //Local instance of firebase function
  // baseURL: "http://127.0.0.1:5001/mule-e-2024/us-central1/api",

  //  Deployed version of amazon server on render.com

  baseURL:  "https://amazon-api-backend-ohfi.onrender.com/",
});

export { axiosInstance }; //Named. just to avoid confusion with axios
