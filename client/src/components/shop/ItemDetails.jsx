import React, { Component } from "react";
import { Link } from "react-router-dom";

class ItemDetails extends Component {
  state = {
    course: [],
    related: [],
  };
  componentDidMount() {
    let info = this.props.location.courseInfo;
    if (info) {
      this.setState({ course: info, related: info.relatedList });
    }
  }

  render() {
    //const { id } = this.props.match.params;
    const { course, related } = this.state;
    console.log(this.state);
    return (
      <div className="container mt-5 d-flex flex-wrap course-detail">
        <div className="col-9 col-md-12">
          <h1 className="mb-4">{course.label}</h1>
          <hr />
          <h4 className="my-3">Introduction</h4>
          <p className="text-justify" style={{ whiteSpace: "pre-line" }}>
            {course.desc}
          </p>
          <h4 className="mb-3 mt-5">Details</h4>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th scope="row">Date(s):</th>
                <td>{course.date}</td>
              </tr>
              <tr>
                <th scope="row">Time:</th>
                <td>{course.time ? "To be advised" : course.time}</td>
              </tr>
              <tr>
                <th scope="row">Venue:</th>
                <td>{course.venue}</td>
              </tr>
              <tr>
                <th scope="row">Registration Closing Date:</th>
                <td>{course.regBy}</td>
              </tr>
              <tr>
                <th scope="row">Course Trainer:</th>
                <td>{course.trainer}</td>
              </tr>
              <tr>
                <th scope="row">Course Fee:</th>
                <td>S${course.fee}</td>
              </tr>
            </tbody>
          </table>
          <h4 className="mb-3 mt-5">Course Objective</h4>
          <p className="text-justify" style={{ whiteSpace: "pre-line" }}>
            {course.objective}
          </p>
          <h4 className="mb-3 mt-5">Course Outline</h4>
          <div className="alert alert-primary" role="alert">
            <p className="text-justify" style={{ whiteSpace: "pre-line" }}>
              {course.outline}
            </p>
          </div>
          <p className="mb-3 mt-4">
            Sign up link:{" "}
            <a
              href={course.link}
              target="_blank"
              rrel="noreferrer"
              style={{ textDecoration: "underline" }}
            >
              {course.link}
            </a>
          </p>

          <div className="mb-3 mt-4">
            <p className="text-secondary">
              Related careers:
              <span style={{ fontSize: "1.3rem" }}>
                {course.relatedList
                  ? course.relatedList.map((i) => (
                      <Link
                        to={`/explore/detail/${i.id}`}
                        class="badge alert-primary ml-2 mr-1"
                      >
                        {i.label}
                      </Link>
                    ))
                  : "No related careers at the moment"}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetails;
