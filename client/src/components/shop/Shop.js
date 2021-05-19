import React, { Component } from "react";
import ItemList from "./ItemList";
import CourseService from "../../services/courseService";

class Shop extends Component {
  state = {
    course: [],
  };

  componentDidMount() {
    this.retrieveCourse();
  }

  retrieveCourse = () => {
    CourseService.getAll()
      .then((res) => {
        this.setState({ course: res.data });
        //console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { course } = this.state;

    return (
      <div className="container my-4">
        <h2>Discover Courses</h2>
        <hr></hr>
        <div className="row mt-4">
          {course.map((c) => (
            <ItemList key={c._id} course={c}></ItemList>
          ))}
        </div>
      </div>
    );
  }
}

export default Shop;
