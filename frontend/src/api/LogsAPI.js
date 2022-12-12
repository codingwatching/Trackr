import axios from "axios";

class LogsAPI {
  static #BASE_URL = process.env.REACT_APP_API_PATH + "/api/logs";
  static QUERY_KEY = "logs";

  static getLogs = () => {
    return axios.get(this.#BASE_URL + "/", {
      withCredentials: true,
    });
  };
}

export default LogsAPI;
