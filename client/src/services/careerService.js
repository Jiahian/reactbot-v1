import http from "./httpService";

class CareerService {
  getAll(id) {
    return http.get(`/career/${id}`);
  }

  createCareer(data) {
    return http.post("/career", data);
  }

  update(id, data) {
    return http.put(`/career/${id}`, data);
  }

  delete(id, data) {
    return http.delete(`/career/${id}`, { data: data });
  }
}

export default new CareerService();
