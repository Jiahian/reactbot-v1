import React, { Component, Fragment } from "react";
import IndustryTrackService from "../../services/industryTrackService";
import CareerService from "../../services/careerService";
import { Link } from "react-router-dom";

class IndustryTrack extends Component {
  state = {
    industry: [],
    //track: [],
    career: [],
    selectedIndustry: "",
    selectedTrack: "",
    currentIndustryIndex: -1,
    currentTrackIndex: -1,
  };
  componentDidMount() {
    this.retrieveIndustry();
    this.setActiveIndustry(
      this.state.industry,
      this.state.currentIndustryIndex
    );
  }

  retrieveIndustry = () => {
    IndustryTrackService.getAll()
      .then((res) => {
        this.setState({ industry: res.data });
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  retrieveCareer = (trackID) => {
    CareerService.getAllbyTrackID(trackID)
      .then((res) => {
        this.setState({ career: res.data });
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  setActiveIndustry = (industry, index) => {
    //console.log(industry);
    this.setState({
      selectedIndustry: industry,
      selectedTrack: "",
      currentIndustryIndex: index,
      currentTrackIndex: -1,
      career: [],
    });
  };

  setActiveTrack = (track, index) => {
    //console.log(track);
    this.setState({
      selectedTrack: track,
      currentTrackIndex: index,
    });
    this.retrieveCareer(track._id);
  };

  //delete Industry or Track by id
  removeItem = () => {
    let data = {
      selectedIndustryID: this.state.selectedIndustry._id,
      selectedTrackID: this.state.selectedTrack._id,
      selectedTrack: this.state.selectedTrack,
    };
    console.log(data);

    IndustryTrackService.delete(data)
      .then((res) => {
        console.log(res.data);
        this.refreshList();
        console.log("ok");
      })
      .catch((e) => {
        console.log("error");
        console.log(e);
      });
  };

  refreshList = () => {
    this.retrieveIndustry();
    this.setState({
      selectedIndustry: "",
      selectedTrack: "",
      currentIndustryIndex: -1,
      currentTrackIndex: -1,
    });
  };

  render() {
    const {
      industry,
      career,
      selectedIndustry,
      selectedTrack,
      currentIndustryIndex,
      currentTrackIndex,
    } = this.state;

    const filteredIndustry = industry.filter(
      (i, index) => index === currentIndustryIndex
    );

    //console.log(this.state);
    //console.log(filteredIndustry);
    return (
      <div
        className="mx-auto my-4 px-0 row industry-track"
        style={{ maxWidth: "1600px" }}
      >
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div className="d-flex flex-nowrap align-items-center mb-2">
            <h1>Industry</h1>
            <span
              className="text-secondary ml-3"
              data-toggle="tooltip"
              data-placement="bottom"
              title=" Please select on an industry to see tracks or add new industry."
            >
              <i
                className="fas fa-info-circle"
                style={{ fontSize: "1.5rem" }}
              ></i>
            </span>
          </div>
          <ul className="list-group">
            {industry &&
              industry.map((d, index) => (
                <li
                  className={
                    "d-flex flex-nowrap justify-content-between align-items-center list-group-item " +
                    (index === currentIndustryIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveIndustry(d, index)}
                  key={index}
                >
                  {d.name}
                  <div>
                    <button
                      type="button"
                      className="ml-2 btn btn-sm btn-danger"
                      onClick={() => {
                        // this.setActiveIndustry(d, index);
                        this.removeItem();
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
              pathname: "/industry-track/add",
              selectedIndustry: "",
            }}
            className="text-white my-2 btn btn-success"
            role="button"
          >
            + New Industry
          </Link>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div className="d-flex flex-nowrap align-items-center mb-2">
            <h1>Tracks</h1>
            <span
              className="text-secondary ml-3"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Please select on an industry to see tracks or add new tracks."
            >
              <i
                className="fas fa-info-circle"
                style={{ fontSize: "1.5rem" }}
              ></i>
            </span>
          </div>
          {filteredIndustry &&
            filteredIndustry.map((f) =>
              f.tracks.map((t, index) => (
                <li
                  className={
                    "d-flex flex-nowrap justify-content-between align-items-center list-group-item " +
                    (index === currentTrackIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTrack(t, index)}
                  key={index}
                >
                  {t.name}
                  <div>
                    <button
                      type="button"
                      className="ml-2 btn btn-sm btn-danger"
                      onClick={() => {
                        // this.setActiveIndustry(d, index);
                        this.removeItem();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          {currentIndustryIndex > -1 && (
            <Fragment>
              {filteredIndustry[0].tracks.length === 0 && (
                <p className="text-secondary font-italic">
                  {" "}
                  No track created in this industry yet.
                </p>
              )}
              <Link
                to={{
                  pathname: `/industry-track/add/${selectedIndustry._id}`,
                  selectedIndustry: selectedIndustry,
                }}
                className="text-white my-2 btn btn-success"
                role="button"
              >
                + New Track
              </Link>
            </Fragment>
          )}
        </div>
        <div className="col-lg-4 col-md-12 mb-4">
          <div className="d-flex flex-nowrap align-items-center mb-2">
            <h1>Careers</h1>
            <span
              className="text-secondary ml-3"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Please select on a track to see careers or add new careers."
            >
              <i
                className="fas fa-info-circle"
                style={{ fontSize: "1.5rem" }}
              ></i>
            </span>
          </div>
          {career &&
            career.map((c, index) => (
              <li
                className="d-flex flex-nowrap justify-content-between align-items-center list-group-item "
                key={index}
              >
                {c.label}
                <div>
                  <Link
                    to={{
                      pathname: `/career/${selectedTrack._id}`,
                      selectedIndustry: filteredIndustry,
                      selectedCareer: c,
                    }}
                    className="ml-2 btn btn-sm btn-warning"
                    role="button"
                  >
                    Edit/Delete
                  </Link>
                </div>
              </li>
            ))}
          {currentTrackIndex > -1 && (
            <Fragment>
              {career.length === 0 && (
                <p className="text-secondary font-italic">
                  {" "}
                  No career created in this track yet.
                </p>
              )}
              <Link
                to={{
                  pathname: "/career",
                }}
                className="text-white my-2 btn btn-success"
                role="button"
              >
                + New Career
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default IndustryTrack;
