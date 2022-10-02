import axios from "axios";

class AuthAPI {
  static #BASE_URL = "http://localhost:8080/api/auth";

  static isLoggedIn() {
    return axios.get(this.#BASE_URL + "/", { withCredentials: true });
  }

  static login(email, password, rememberMe) {
    return axios.post(
      this.#BASE_URL + "/login",
      { email, password, rememberMe },
      { withCredentials: true }
    );
  }
}
export default AuthAPI;
