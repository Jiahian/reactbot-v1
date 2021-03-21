import React, { Component } from "react";
import { courses } from "./../../data/courses";
import { Link } from "react-router-dom";

class RelatedCareer extends Component {
  state = {
    course: courses.data,
  };
  render() {
    const { id } = this.props.match.params;
    // const filteredCourses = this.state.courses.map((p) =>
    //   p.tag.filter((p) => p._id == id)
    // );
    let filteredCourses = [];
    let filteredCourseLabel = "";
    this.state.course.forEach((c) => {
      c.tag.forEach((p) => {
        if (p._id == id) {
          filteredCourseLabel = p.label;
          filteredCourses.push(c);
        }
      });
    });
    //console.log(filteredCourseLabel);
    return (
      <div className="container my-4">
        <h2>{filteredCourseLabel}</h2>
        <Link to={`/explore/detail/${id}`} className="text-secondary">
          See Career Details
          <i
            className="fas fa-chevron-right mx-2"
            style={{ fontSize: "12px" }}
          ></i>
        </Link>
        <div className="row my-4">
          {filteredCourses.map((c) => (
            <div className="col-3 col-md-4 col-sm-6">
              <div className="card mb-4">
                <Link to={`/shop/${c._id}`}>
                  <img class="card-img-top" src={c.picture} alt=""></img>
                  <div className="card-body">
                    <h5 className="card-title">{c.name}</h5>

                    <h6 className="card-price">{c.price}</h6>
                  </div>
                </Link>
                <div className="card-body">
                  {c.tag.map((i) => (
                    <Link
                      to={`/shop/career/${i._id}`}
                      class="badge alert-primary mr-2"
                    >
                      {i.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default RelatedCareer;
