import React, { Component } from "react";
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
    CareerService.getAll(trackID)
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
      //track,
      career,
      selectedIndustry,
      selectedTrack,
      currentIndustryIndex,
      currentTrackIndex,
    } = this.state;
    //console.log(track);

    const filteredIndustry = industry.filter(
      (i, index) => index === currentIndustryIndex
    );

    // /console.log(this.state);
    console.log(filteredIndustry);
    return (
      <div
        className="mx-auto my-4 px-0 row industry-track"
        style={{ maxWidth: "1600px" }}
      >
        <div className="col-4">
          <h1>Industry</h1>
          <p className="text-secondary my-2">
            Please select on an industry to see tracks or add new industry.
          </p>
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
        <div className="col-4">
          <h1>Tracks</h1>
          <p className="text-secondary my-2">
            Please select on an industry to see tracks or add new tracks.
          </p>
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
        </div>
        <div className="col-4">
          <h1>Careers</h1>
          <p className="text-secondary my-2">
            Please select on a track to see careers or add new careers.
          </p>
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

          <Link
            to={{
              pathname: "/career",
            }}
            className="text-white my-2 btn btn-success"
            role="button"
          >
            + New Career
          </Link>
        </div>
      </div>
    );
  }
}

export default IndustryTrack;
