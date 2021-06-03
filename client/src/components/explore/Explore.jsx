import React, { Component } from "react";
import IndustryTrackService from "../../services/industryTrackService";
import PathwayService from "../../services/pathwayService";
import CareerService from "../../services/careerService";
import SideBar from "./SideBar";
import ExploreGraph from "./ExploreGraph";

class Explore extends Component {
  state = {
    trackID: "",
    industry: [],
    track: [],
    career: [],
    selectedIndustryID: "",
    selectedTrackID: "",
  };

  componentDidMount() {
    this.retrieveIndustry();
    this.retrieveTrack();
  }

  //GET industry
  retrieveIndustry = () => {
    IndustryTrackService.getAll()
      .then((res) => {
        this.setState({ industry: res.data });
        //console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //GET
  retrieveTrack = () => {
    PathwayService.getAll()
      .then((res) => {
        this.setState({ track: res.data });
        //console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  retrieveCareer = (careerID) => {
    CareerService.getCareer(careerID)
      .then((res) => {
        this.setState({ career: res.data });
        // console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleEvents = {
    selectNode: (event) => {
      let { nodes } = event;
      console.log(nodes[0]);
      this.retrieveCareer(nodes[0]);
    },
  };

  render() {
    const { industry, track, career, selectedIndustryID, selectedTrackID } =
      this.state;

    const filteredIndustry = industry.filter(
      (i) => i._id === selectedIndustryID
    );
    const filteredTrack = track.filter((t) => t._id === selectedTrackID);
    const filteredNode = filteredTrack.map((t) => t.nodes);
    const filteredEdge = filteredTrack.map((t) => t.edges);

    return (
      <React.Fragment>
        <div className="row mx-0">
          <div className="col-lg-9 col-md-8 col-sm-12">
            <form className="row g-3 my-3">
              <div className="col-5">
                <select
                  className="form-control"
                  id="formGrouSelect1"
                  required
                  value={selectedIndustryID}
                  onChange={(e) =>
                    this.setState({
                      selectedIndustryID: e.target.value,
                      career: [],
                    })
                  }
                >
                  <option defaultValue>Industry...</option>
                  {industry &&
                    industry.map((d) => (
                      <option value={d._id} key={d._id}>
                        {d.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="align-self-center text-center">
                <i
                  className="fas fa-angle-right"
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </div>
              <div className="col-5">
                <select
                  className="form-control"
                  id="formGrouSelect2"
                  required
                  value={selectedTrackID}
                  onChange={(e) => {
                    this.setState({
                      selectedTrackID: e.target.value,
                      career: [],
                    });
                  }}
                >
                  <option value="">Track...</option>
                  {filteredIndustry &&
                    filteredIndustry.map((d) =>
                      d.tracks.map((t) => (
                        <option value={t._id} key={t._id}>
                          {t.name}
                        </option>
                      ))
                    )}
                </select>
              </div>
            </form>
            {selectedIndustryID && selectedTrackID ? (
              filteredNode[0].length > 1 && filteredEdge[0].length > 1 ? (
                <ExploreGraph
                  graph={{ nodes: filteredNode[0], edges: filteredEdge[0] }}
                  onEvent={this.handleEvents}
                />
              ) : (
                <div
                  className="p-3 pt-4"
                  style={{
                    height: "80vh",
                    width: "100%",
                    border: "1px black solid",
                    margin: "0 10px 10px 0",
                    textAlign: "center",
                  }}
                >
                  <p className="font-italic font-weight-light">
                    No Career Pathway is created in this Industry and Track...
                  </p>
                  <br></br>
                  <p className="font-italic font-weight-light">
                    Please inform admin user to create new career pathways
                  </p>
                </div>
              )
            ) : (
              <div
                className="p-3 pt-4"
                style={{
                  height: "80vh",
                  width: "100%",
                  border: "1px black solid",
                  margin: "0 10px 10px 0",
                  textAlign: "center",
                }}
              >
                <p>Welcome to Careerpedia! 💡</p>
                <p>Your career search begins today!</p>
                <br></br>
                <p className="font-italic font-weight-light">
                  Start by selecting an Industry and Track...
                </p>
              </div>
            )}
          </div>

          <SideBar
            filteredCareer={career}
            industryID={selectedIndustryID}
            trackID={selectedTrackID}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Explore;
