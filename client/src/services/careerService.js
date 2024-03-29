import http from "./httpService";

class CareerService {
  getAll() {
    return http.get(`/career`);
  }
  getCareer(id) {
    return http.get(`/career/${id}`);
  }

  getAllbyTrackID(id) {
    return http.get(`/career/all/${id}`);
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
