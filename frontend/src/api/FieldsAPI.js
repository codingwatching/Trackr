import axios from "axios";

class FieldsAPI {
  static #BASE_URL = "http://localhost:8080/api/fields";

  static getFields(projectId) {
    return axios.get(this.#BASE_URL + "/" + projectId, {
      withCredentials: true,
    });
  }

  static addField(projectId, name) {
    return axios.post(
      this.#BASE_URL + "/",
      { projectId, name },
      {
        withCredentials: true,
      }
    );
  }

  static deleteField(fieldId) {
    return axios.delete(this.#BASE_URL + "/" + fieldId, {
      withCredentials: true,
    });
  }
}

export default FieldsAPI;
