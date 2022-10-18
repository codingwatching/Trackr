import axios from "axios";

class VisualizationsAPI {
  static #BASE_URL = "http://localhost:8080/api/visualizations";

  static addVisualization(projectId, metadata) {
    return axios.post(
      this.#BASE_URL + "/",
      { projectId, metadata },
      { withCredentials: true }
    );
  }

  static getVisualizations(projectId) {
    return axios.get(this.#BASE_URL + "/" + projectId, {
      withCredentials: true,
    });
  }

  static updateVisualization(id, metadata) {
    return axios.put(
      this.#BASE_URL + "/",
      { id, metadata },
      { withCredentials: true }
    );
  }
}

export default VisualizationsAPI;
