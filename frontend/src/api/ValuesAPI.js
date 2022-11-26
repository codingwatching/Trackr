import axios from "axios";

class ValuesAPI {
  static #BASE_URL = "http://localhost:8080/api/values";

  static getValues(fieldId, order, offset, limit) {
    return axios.get(this.#BASE_URL + "/", {
      params: {
        fieldId,
        order,
        offset,
        limit,
      },
      withCredentials: true,
    });
  }

   static deleteValues(fieldId) {
    return axios.delete(this.#BASE_URL + "/" + fieldId, {
      withCredentials: true,
    });
  }
}

export default ValuesAPI;
