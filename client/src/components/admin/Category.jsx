import React, { Component, Fragment } from "react";
import CategoryService from "../../services/categoryService";
import { Link } from "react-router-dom";
import CourseService from "../../services/courseService";

class Category extends Component {
  state = {
    category: [],
    course: [],
    selectedCategory: "",
    selectedSubCat: "",
    currentCatIndex: -1,
    currentSubCatIndex: -1,
  };

  componentDidMount() {
    this.retrieveCategory();
    this.setActiveCat(this.state.category, this.state.currentCatIndex);
  }

  retrieveCategory = () => {
    CategoryService.getAll()
      .then((res) => {
        this.setState({ category: res.data });
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  retrieveCourse = (subCatID) => {
    CourseService.getAllbySubCatID(subCatID)
      .then((res) => {
        this.setState({ course: res.data });
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  setActiveCat = (category, index) => {
    this.setState({
      selectedCategory: category,
      selectedSubCat: "",
      currentCatIndex: index,
      currentSubCatIndex: -1,
      course: [],
    });
  };

  setActiveSubCat = (subcat, index) => {
    this.setState({
      selectedSubCat: subcat,
      currentSubCatIndex: index,
    });
    this.retrieveCourse(subcat._id);
  };

  //delete Cat id
  removeCategory = () => {
    let id = this.state.selectedCategory._id;

    CategoryService.deleteCat(id)
      .then((res) => {
        console.log(res.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //delete Subcat id
  removeSubCat = () => {
    let id = this.state.selectedSubCat._id;
    let data = { categoryID: this.state.selectedCategory._id };

    CategoryService.deleteSubCat(id, data)
      .then((res) => {
        console.log(res.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  refreshList = () => {
    this.retrieveCategory();
    this.setState({
      selectedCategory: "",
      selectedSubCat: "",
      currentCatIndex: -1,
      currentSubCatIndex: -1,
    });
  };

  render() {
    const {
      category,
      course,
      selectedCategory,
      selectedSubCat,
      currentCatIndex,
      currentSubCatIndex,
    } = this.state;

    //console.log(this.state);
    //console.log(selectedSubCat);

    const filteredCat = category.filter(
      (i, index) => index === currentCatIndex
    );

    return (
      <div
        className="mx-auto my-4 px-0 row industry-track"
        style={{ maxWidth: "1600px" }}
      >
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div className="d-flex flex-nowrap align-items-center mb-2">
            <h1>Category</h1>
            <span
              className="text-secondary ml-3"
              data-toggle="tooltip"
              data-placement="bottom"
              title=" Please select on a category to see sub-category or add new category."
            >
              <i
                className="fas fa-info-circle"
                style={{ fontSize: "1.5rem" }}
              ></i>
            </span>
          </div>
          <ul className="list-group">
            {category &&
              category.map((c, index) => (
                <li
                  className={
                    "d-flex flex-nowrap justify-content-between align-items-center list-group-item " +
                    (index === currentCatIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCat(c, index)}
                  key={index}
                >
                  {c.title}
                  <div>
                    <button
                      type="button"
                      className="ml-2 btn btn-sm btn-danger"
                      onClick={() => {
                        this.removeCategory();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
          <Link
            to={{
              pathname: "/category/add",
              selectedCategory: "",
            }}
            className="text-white my-2 btn btn-success"
            role="button"
          >
            + New Category
          </Link>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div className="d-flex flex-nowrap align-items-center mb-2">
            <h1>Sub-Category</h1>
            <span
              className="text-secondary ml-3"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Please select on a sub-category to see courses or add new
            sub-category."
            >
              <i
                className="fas fa-info-circle"
                style={{ fontSize: "1.5rem" }}
              ></i>
            </span>
          </div>
          <ul className="list-group">
            {filteredCat &&
              filteredCat.map((f) =>
                f.subcategory.map((s, index) => (
                  <li
                    className={
                      "d-flex flex-nowrap justify-content-between align-items-center list-group-item " +
                      (index === currentSubCatIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveSubCat(s, index)}
                    key={index}
                  >
                    {s.title}
                    <div>
                      <button
                        type="button"
                        className="ml-2 btn btn-sm btn-danger"
                        onClick={() => {
                          this.removeSubCat();
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              )}
          </ul>
          {currentCatIndex > -1 && (
            <Fragment>
              {filteredCat[0].subcategory.length == 0 && (
                <p className="text-secondary font-italic">
                  No sub-category created in this category yet.
                </p>
              )}
              <Link
                to={{
                  pathname: `/category/add/${selectedCategory._id}`,
                  selectedCategory: selectedCategory,
                }}
                className="text-white my-2 btn btn-success"
                role="button"
              >
                + New Sub-Category
              </Link>
            </Fragment>
          )}
        </div>
        <div className="col-lg-4 col-md-12 mb-4">
          <div className="d-flex flex-nowrap align-items-center mb-2">
            <h1>Course</h1>
            <span
              className="text-secondary ml-3"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Please select on a sub-category to see course or add new course."
            >
              <i
                className="fas fa-info-circle"
                style={{ fontSize: "1.5rem" }}
              ></i>
            </span>
          </div>

          {course &&
            course.map((c, index) => (
              <li
                className="d-flex flex-nowrap justify-content-between align-items-center list-group-item "
                key={index}
              >
                {c.label}
                <div>
                  <Link
                    to={{
                      pathname: `/course/${selectedSubCat._id}`,

                      selectedCategory: selectedCategory,
                      selectedCourse: c,
                    }}
                    className="ml-2 btn btn-sm btn-warning"
                    role="button"
                  >
                    Edit/Delete
                  </Link>
                </div>
              </li>
            ))}

          {currentSubCatIndex > -1 && (
            <Fragment>
              {course.length == 0 && (
                <p className="text-secondary font-italic">
                  {" "}
                  No course created in this sub-category yet.
                </p>
              )}
              <Link
                to={{
                  pathname: "/course",
                }}
                className="text-white my-2 btn btn-success"
                role="button"
              >
                + New Course
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Category;
