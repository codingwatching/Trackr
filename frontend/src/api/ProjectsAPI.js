import axios from "axios";

class ProjectsAPI {
  static #BASE_URL = "http://localhost:8080/api/projects";

  static getProjects() {
    return axios.get(this.#BASE_URL + "/", { withCredentials: true });
  }
}

export default ProjectsAPI;
