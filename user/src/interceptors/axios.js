import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8009/api";
// axios.defaults.withCredentials = true;  

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8009/api", 
  // withCredentials: true
})

let refresh = false;

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "authToken"
    )}`;
    return config;
  },
  async (error) => {
    console.log({ requestError: error });
    return error;
  }
);

axiosInstance.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    console.log({ responseError: error });

    if (error.response.status === 401 && !refresh) {
      refresh = true;

      const response = await axiosInstance.post(
        "/auth/refresh",
        {},
        {
          // withCredentials: true,
          headers: {
            "X-Refresh-Token": `${localStorage.getItem("X-Refresh-Token")}`,
          },
        }
      );
      console.log({ response });

      if (response.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.data.token}`;

        localStorage.setItem("authToken", response.data.data.token);

        return axios(error.config);
      }
    }
    refresh = false;
    return error;
  }
);
