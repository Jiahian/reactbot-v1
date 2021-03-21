import React, { Component, Fragment } from "react";
import IndustryTrackService from "../../services/industryTrackService";
import pathwayService from "../../services/pathwayService";
import { Link } from "react-router-dom";
import PreviewGraph from "./PreviewGraph";

class CareerPathway extends Component {
  state = {
    industry: [],
    track: [],
    selectedIndustryID: "",
    selectedTrackID: "",
  };
  componentDidMount() {
    this.retrieveIndustry();
    this.retrieveTrack();
  }

  //GET
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

  //GET
  retrieveTrack = () => {
    pathwayService
      .getAll()
      .then((res) => {
        this.setState({ track: res.data });
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { industry, track, selectedIndustryID, selectedTrackID } = this.state;

    const filteredIndustry = industry.filter(
      (i) => i._id === selectedIndustryID
    );
    console.log(this.state);

    const filteredTrack = track.filter((t) => t._id === selectedTrackID);
    console.log("filtered tracks", filteredTrack);

    const filteredNode = filteredTrack.map((t) => t.nodes);
    console.log("nodes: ", filteredNode);

    const filteredEdge = filteredTrack.map((t) => t.edges);
    console.log("edges: ", filteredEdge);

    return (
      <Fragment>
        <div className="container mx-auto my-4">
          <div className="d-flex flex-nowrap justify-content-between align-items-center">
            <h1>Career</h1>
            {selectedTrackID && (
              <Link
                to={{
                  pathname: `/career-pathway/${selectedTrackID}`,
                  selectedTrack: filteredTrack,
                }}
                className="btn btn-warning"
                role="button"
              >
                Edit
              </Link>
            )}
          </div>
          <form className="mt-3" style={{ marginBottom: "2rem" }}>
            <div className="form-group">
              <label htmlFor="formGrouSelect1">Industry</label>
              <select
                className="form-control"
                id="formGrouSelect1"
                required
                value={selectedIndustryID}
                onChange={(e) =>
                  this.setState({ selectedIndustryID: e.target.value })
                }
              >
                <option defaultValue>Please select an Industry</option>
                {industry &&
                  industry.map((d) => (
                    <option value={d._id} key={d._id}>
                      {d.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="formGrouSelect2">Track</label>
              <select
                className="form-control"
                id="formGrouSelect2"
                required
                value={selectedTrackID}
                onChange={(e) =>
                  this.setState({ selectedTrackID: e.target.value })
                }
              >
                <option>Please select a Track</option>
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
        </div>
        {selectedIndustryID && selectedTrackID ? (
          filteredNode[0].length > 1 && filteredEdge[0].length > 1 ? (
            <div
              className="d-flex flex-wrap mx-auto"
              style={{ maxWidth: "1600px" }}
            >
              <div className="col-md-4 p-0 pr-3">
                <PreviewGraph
                  graph={{ nodes: filteredNode[0], edges: filteredEdge[0] }}
                />
              </div>
              <div className="col-md-8 p-0 d-flex flex-wrap">
                <div className="col-md-6  p-0 pr-3">
                  <h4>Nodes</h4>

                  <table className="table table-sm table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Career</th>
                        <th scope="col">Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredNode[0].map((n, index) => (
                        <tr>
                          <th scope="row">{index}</th>
                          <td>{n.label}</td>
                          <td>{n.level}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6 p-0">
                  <h4>Edges</h4>
                  <table className="table table-sm table-striped table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEdge[0].map((e) => (
                        <tr>
                          <td>
                            {
                              filteredNode[0].filter((n) => n.id === e.from)[0]
                                .label
                            }
                          </td>
                          <td>
                            {
                              filteredNode[0].filter((n) => n.id === e.to)[0]
                                .label
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="container mx-auto">
              <p
                className="
              text-secondary"
              >
                No career pathway created in the selected industrty and track
                yet.
              </p>
              <Link
                to={{
                  pathname: `/career-pathway/${selectedTrackID}`,
                  selectedTrack: filteredTrack,
                }}
                className="text-white my-2 btn btn-success"
                role="button"
              >
                + Create New Pathway
              </Link>
            </div>
          )
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}

export default CareerPathway;
