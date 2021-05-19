import http from "./httpService";

class CourseService {
  getAll() {
    return http.get(`/course/`);
  }

  getCourse(id) {
    return http.get(`/course/${id}`);
  }

  getAllbySubCatID(id) {
    return http.get(`/course/all/${id}`);
  }

  createCourse(data) {
    return http.post("/course", data);
  }

  update(id, data) {
    console.log(id);
    return http.put(`/course/${id}`, data);
  }

  delete(id, data) {
    return http.delete(`/course/${id}`, { data: data });
  }
}

export default new CourseService();
