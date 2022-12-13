import axios from "axios";

class VisualizationsAPI {
  static #BASE_URL = process.env.REACT_APP_API_PATH + "/api/visualizations";
  static QUERY_KEY = "visualizations";

  static createVisualization = (fieldId, metadata) => {
    return axios.post(
      this.#BASE_URL + "/",
      { fieldId, metadata },
      { withCredentials: true }
    );
  };

  static getVisualizations = (projectId) => {
    return axios.get(this.#BASE_URL + "/" + projectId, {
      withCredentials: true,
    });
  };

  static updateVisualization = (id, fieldId, metadata) => {
    return axios.put(
      this.#BASE_URL + "/",
      { id, fieldId, metadata },
      { withCredentials: true }
    );
  };

  static deleteVisualization = (id) => {
    return axios.delete(this.#BASE_URL + "/" + id, {
      withCredentials: true,
    });
  };
}

export default VisualizationsAPI;
