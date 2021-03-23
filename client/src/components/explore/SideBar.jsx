import React, { Component } from "react";
import { Link } from "react-router-dom";

import { related } from "./../../data/relatedCourse";
// import leftArrow from "../../../../asset/Images/left.svg";
// import rightArrow from "../../../../asset/Images/right.svg";

class SideBar extends Component {
  state = {
    allRelated: related.data,
  };

  render() {
    //var sidebarClass = this.props.isOpen ? "sidebar open" : "sidebar";
    const { filteredCareer, industryID, trackID } = this.props;
    console.log(filteredCareer);
    let relatedCourse = [];
    // this.state.allRelated.forEach((c) => {
    //   c.tag.forEach((p) => {
    //     //console.log(p._id);
    //     if (p._id === node._id) relatedCourse.push(c);
    //   });
    // });
    //console.log(relatedCourse);

    return (
      <div className="col-lg-3 col-md-4 col-sm-12 alert alert-primary px-0 py-3">
        {filteredCareer ? (
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
                  className="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="card-body">{filteredCareer.desc}</div>
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
                  <div className="card-body">{filteredCareer.cwf}</div>
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
                  <div className="card-body">{filteredCareer.tSkill}</div>
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
                  <div className="card-body">{filteredCareer.gSkill}</div>
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
                          <a
                            class="badge alert-primary mr-2"
                            href={`/shop/${c._id}`}
                          >
                            {c.name}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-secondary">
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
