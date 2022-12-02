import axios from "axios";

class ProjectsAPI {
  static #BASE_URL = process.env.REACT_APP_API_PATH + "/api/projects";

  static getProjects() {
    return axios.get(this.#BASE_URL + "/", { withCredentials: true });
  }

  static getProject(projectId) {
    return axios.get(this.#BASE_URL + "/" + projectId, {
      withCredentials: true,
    });
  }

  static createProject() {
    return axios.post(this.#BASE_URL + "/", {}, { withCredentials: true });
  }

  static updateProject(id, name, description, resetAPIKey) {
    return axios.put(
      this.#BASE_URL + "/",
      { id, name, description, resetAPIKey },
      { withCredentials: true }
    );
  }

  static deleteProject(projectId) {
    return axios.delete(this.#BASE_URL + "/" + projectId, {
      withCredentials: true,
    });
  }
}

export default ProjectsAPI;
