import http from "./httpService";

class PathwayService {
  getAll() {
    return http.get("/career-pathway");
  }

  createPathway(id, data) {
    return http.post(`/career-pathway/${id}`, data);
  }

  updatePathway(id, data) {
    return http.put(`/career-pathway/${id}`, data);
  }

  //   delete(id, data) {
  //     return http.delete(`/career-pathway/${id}`, { data: data });
  //   }
}

export default new PathwayService();
