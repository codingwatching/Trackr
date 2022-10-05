import axios from "axios";

class ProjectsAPI {
  static #BASE_URL = "http://localhost:8080/api/projects";

  static getProjects() {
    return axios.get(this.#BASE_URL + "/", { withCredentials: true });
  }

  static createProject() {
    return axios.post(this.#BASE_URL + "/", {}, { withCredentials: true });
  }

  static deleteProject(projectId) {
    return axios.delete(this.#BASE_URL + "/" + projectId, {
      withCredentials: true,
    });
  }
}

export default ProjectsAPI;
