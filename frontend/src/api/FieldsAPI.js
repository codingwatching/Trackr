import axios from "axios";

class FieldsAPI {
  static #BASE_URL = process.env.REACT_APP_API_PATH + "/api/fields";

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

  static updateField(id, name) {
    return axios.put(
      this.#BASE_URL + "/",
      { id, name },
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
