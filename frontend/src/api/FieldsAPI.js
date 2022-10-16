import axios from "axios";

class FieldsAPI {
  static #BASE_URL = "http://localhost:8080/api/fields";

  static getFields(projectId) {
    return axios.get(this.#BASE_URL + "/" + projectId, {
      withCredentials: true,
    });
  }
}

export default FieldsAPI;
