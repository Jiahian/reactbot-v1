import http from "./httpService";

class CategoryService {
  getAll() {
    return http.get("/category");
  }

  createCategory(data) {
    return http.post("/category/add", data);
  }

  createSubCat(id, data) {
    return http.post(`/category/add/${id}`, data);
  }

  deleteCat(id) {
    return http.delete(`/category/${id}`);
  }

  deleteSubCat(id, data) {
    return http.delete(`/category/subcat/${id}`, { data: data });
  }
}

export default new CategoryService();
