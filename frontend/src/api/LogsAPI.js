import axios from "axios";

class LogsAPI {
  static #BASE_URL = "http://localhost:8080/api/logs";

  static getLogs() {
    return axios.get(this.#BASE_URL + "/", {
      withCredentials: true,
    });
  }
}

export default LogsAPI;
