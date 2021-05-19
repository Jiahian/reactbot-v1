import http from "./httpService";
import authHeader from "./auth-header";

class UserService {
  displayAdminControl() {
    return http.get("/test/admin", { headers: authHeader() });
  }
}

export default new UserService();
