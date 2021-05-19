import React, { Component } from "react";
import { Link } from "react-router-dom";
import CourseService from "../../services/courseService";

class SideBar extends Component {
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
    const { filteredCareer, industryID, trackID } = this.props;
    //console.log(filteredCareer);
    const { course } = this.state;
    console.log(course);

    let relatedCourse = [];

    course.forEach((c) => {
      c.relatedList.forEach((r) => {
        if (r.id === filteredCareer._id) relatedCourse.push(c);
      });
    });
    console.log(relatedCourse);

    return (
      <div className="col-lg-3 col-md-4 col-sm-12 alert alert-primary px-0 py-3">
        {filteredCareer.length === 0 ? (
          <div className="px-3">
            <p>Zoom and drag the graph to see all the career pathways.</p>
            <p>Click on any career node to view more info!</p>
          </div>
        ) : (
          <div>
            <h5 className="text-dark px-3">{filteredCareer.label}</h5>
            <div id="accordion">
              {/**<div className="card">
                <div className="card-header" id="headingZero">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link"
                      data-toggle="collapse"
                      data-target="#collapseZero"
                      aria-expanded="true"
                      aria-controls="collapseZero"
                    >
                      Sub-Tracks
                    </button>
                  </h5>
                </div>

                <div
                  id="collapseZero"
                  className="collapse show"
                  aria-labelledby="headingZero"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    <ul style={{ paddingInlineStart: "28px" }}>
                      {filteredCareer.subgroup.map((n) => (
                        <li>{n.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                      </div>**/}
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Job Description
                    </button>
                  </h5>
                </div>

                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="card-body" style={{ whiteSpace: "pre-line" }}>
                    {filteredCareer.desc}
                  </div>
                  <span className="px-3 pb-2" style={{ float: "right" }}>
                    <Link to={`/explore/detail/${filteredCareer._id}`}>
                      See more
                      <i
                        className="fas fa-chevron-right mx-2"
                        style={{ fontSize: "12px" }}
                      ></i>
                    </Link>
                  </span>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Critical Work Functions
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordion"
                >
                  <div className="card-body" style={{ whiteSpace: "pre-line" }}>
                    {filteredCareer.cwf ? (
                      filteredCareer.cwf
                    ) : (
                      <span className="text-secondary font-italic">
                        No information available.
                      </span>
                    )}
                  </div>
                  <span className="px-3 pb-2" style={{ float: "right" }}>
                    <Link to={`/explore/detail/${filteredCareer._id}`}>
                      See more
                      <i
                        className="fas fa-chevron-right mx-2"
                        style={{ fontSize: "12px" }}
                      ></i>
                    </Link>
                  </span>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingThree">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Technical Skills & Competencies
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseThree"
                  className="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#accordion"
                >
                  <div className="card-body" style={{ whiteSpace: "pre-line" }}>
                    {filteredCareer.tSkill}
                  </div>
                  <span className="px-3 pb-2" style={{ float: "right" }}>
                    <Link to={`/explore/detail/${filteredCareer._id}`}>
                      See more
                      <i
                        className="fas fa-chevron-right mx-2"
                        style={{ fontSize: "12px" }}
                      ></i>
                    </Link>
                  </span>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingFour">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Generic Skills & Competencies
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseFour"
                  className="collapse"
                  aria-labelledby="headingFour"
                  data-parent="#accordion"
                >
                  <div className="card-body" style={{ whiteSpace: "pre-line" }}>
                    {filteredCareer.gSkill}
                  </div>
                  <span className="px-3 pb-2" style={{ float: "right" }}>
                    <Link to={`/explore/detail/${filteredCareer._id}`}>
                      See more
                      <i
                        className="fas fa-chevron-right mx-2"
                        style={{ fontSize: "12px" }}
                      ></i>
                    </Link>
                  </span>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingFive">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Related Courses
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseFive"
                  className="collapse"
                  aria-labelledby="headingFive"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    {relatedCourse.length > 0 ? (
                      <div>
                        {relatedCourse.map((c) => (
                          <Link
                            className="badge alert-primary mr-2"
                            to={{
                              pathname: `/shop/${c._id}`,
                              courseInfo: c,
                            }}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-secondary font-italic">
                        No related courses available at this moment.{" "}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SideBar;
// <button onClick={this.props.toggleSidebar} className="sidebar-toggle">
//   {this.props.isOpen ? "<" : ">"}
// </button>;
