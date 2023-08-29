import axios from "axios";

axios.defaults.baseURL = "http://localhost:8009/api";
axios.defaults.headers.common["Access-Control-Allow-Origin"] =
  "http://localhost:3000";
// axios.defaults.headers.post["Access-Control-Allow-Origin"] =
//   "http://localhost:3000";
// axios.defaults.headers.post["Origin"] =
//   "http://localhost:8009";
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";

let refresh = false;

axios.interceptors.request.use(
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

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    console.log({ responseError: error });

    // if (error.code === "ERR_NETWORK") {
    //   console.log(`AxiosError: ${error.message}`);
    //   return;
    // }

    if (error.response.status === 401 && !refresh) {
      refresh = true;

      const response = await axios.post(
        "/auth/refresh",
        {},
        {
          withCredentials: true,
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
