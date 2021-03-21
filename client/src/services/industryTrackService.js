import http from "./httpService";

class IndustryTrackService {
  getAll() {
    return http.get("/industry-track");
  }

  createIndustry(data) {
    return http.post("/industry-track/add", data);
  }

  createTrack(id, data) {
    return http.post(`/industry-track/add/${id}`, data);
  }

  delete(data) {
    return http.delete("/industry-track", { data: data });
  }
}

export default new IndustryTrackService();
