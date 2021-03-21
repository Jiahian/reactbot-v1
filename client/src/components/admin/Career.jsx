import React, { Component, Fragment } from "react";
import IndustryTrackService from "../../services/industryTrackService";
import CareerService from "../../services/careerService";

class Career extends Component {
  state = {
    trackID: null, //id of track for Edit, Delete
    careerID: "", //id of career for Edit, Delete
    selectedIndustryName: "", //for Edit, Delete
    selectedTrackName: "", //for Edit, Delete
    industry: [],
    selectedIndustryID: "",
    selectedTrackID: "",
    name: "",
    desc: "",
    cwf: "",
    tSkill: "",
    gSkill: "",
    trackID: "",
    submitted: false,
  };

  componentDidMount() {
    this.retrieveIndustry();

    //Edit, or Delete mode, id of track is given by params
    let id = this.props.match.params.id;
    if (id) {
      this.setState({ trackID: id, selectedTrackID: id });
    }

    //Edit, or Delete mode, set selected industry via selected track
    let selectedIndustry = this.props.location.selectedIndustry;
    if (selectedIndustry) {
      let selectedIndustryName = selectedIndustry[0].name;

      let selectedTrack = selectedIndustry[0].tracks.filter(
        (t) => t._id === id
      );
      let selectedTrackName = selectedTrack[0].name;

      this.setState({
        selectedIndustryName,
        selectedTrackName,
      });
    }

    let selectedCareer = this.props.location.selectedCareer;
    //Edit, or Delete mode, set selected industry via selected track
    if (selectedCareer) {
      //console.log(selectedCareer);
      this.setState({
        careerID: selectedCareer._id,
        name: selectedCareer.label,
        desc: selectedCareer.desc,
        cwf: selectedCareer.cwf,
        tSkill: selectedCareer.tSkill,
        gSkill: selectedCareer.gSkill,
      });
    }
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

  saveForm = () => {
    console.log("saving");
    const { name, desc, cwf, tSkill, gSkill, selectedTrackID } = this.state;
    let data = {
      label: name,
      desc: desc,
      cwf: cwf,
      tSkill: tSkill,
      gSkill: gSkill,
      trackID: selectedTrackID,
    };

    CareerService.createCareer(data)
      .then((res) => {
        //console.log(res.data);
        this.setState({
          //id: id,
          name: res.data.name,
          label: res.data.name,
          desc: res.data.desc,
          cwf: res.data.cwf,
          tSkill: res.data.tSkill,
          gSkill: res.data.gSkill,
          //selectedTrackID: res.data.trackID,
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //delete Career in career and in track db
  removeForm = () => {
    let data = {
      trackID: this.state.trackID,
      careerID: this.state.careerID,
    };
    //let id = this.state.trackID;

    CareerService.delete(this.state.trackID, data)
      .then((res) => {
        console.log("deleted: ", res.data);
        this.props.history.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //delete Career in career and in track db
  updateForm = () => {
    let data = {
      //trackID: this.state.trackID,
      careerID: this.state.careerID,
      label: this.state.name,
      desc: this.state.desc,
      cwf: this.state.cwf,
      tSkill: this.state.tSkill,
      gSkill: this.state.gSkill,
    };

    CareerService.update(this.state.careerID, data)
      .then((res) => {
        console.log("updated: ", res.data);
        this.props.history.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  newCareer = () => {
    console.log("newcareer");
    this.setState({
      selectedIndustryID: "",
      selectedTrackID: "",
      name: "",
      desc: "",
      cwf: "",
      tSkill: "",
      gSkill: "",
      trackID: "",
      submitted: false,
    });
  };

  render() {
    const {
      trackID,
      careerID,
      selectedIndustryName,
      selectedTrackName,
      industry,
      selectedIndustryID,
      selectedTrackID,
      name,
      desc,
      cwf,
      tSkill,
      gSkill,
      submitted,
    } = this.state;

    const filteredIndustry = industry.filter(
      (i) => i._id === selectedIndustryID
    );

    console.log(this.state);

    return (
      <div className="container mx-auto my-4">
        {submitted ? (
          <div>
            <h4>You have added a career successfully!</h4>
            <div className="flex flex-wrap">
              <button className="my-2 btn btn-success" onClick={this.newCareer}>
                + New Career
              </button>
            </div>
          </div>
        ) : (
          <Fragment>
            <div className="d-flex flex-nowrap justify-content-between align-items-center">
              <h1 className="d-inline-block">
                {trackID ? "Edit" : "Add New"} Career
              </h1>
              <button
                type="button"
                className="ml-2 btn btn btn-danger"
                onClick={() => {
                  this.removeForm();
                }}
              >
                Delete
              </button>
            </div>
            <form className="mt-3">
              <div className="form-group">
                <label htmlFor="formGrouSelect1">Industry</label>
                {trackID && careerID && selectedIndustryName ? (
                  <input
                    type="text"
                    readOnly
                    className="form-control font-weight-bold"
                    id="formGrouSelect1"
                    defaultValue={selectedIndustryName}
                  />
                ) : (
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
                )}
              </div>
              <div className="form-group">
                <label htmlFor="formGrouSelect2">Track</label>
                {trackID && careerID && selectedTrackName ? (
                  <input
                    type="text"
                    readOnly
                    className="form-control font-weight-bold"
                    id="formGrouSelect2"
                    defaultValue={selectedTrackName}
                  />
                ) : (
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
                )}
              </div>
              <div className="form-group">
                <label htmlFor="formGroupName1">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupName1"
                  value={name}
                  required
                  onChange={(e) => this.setState({ name: e.target.value })} //in db it is saved as label
                />
              </div>
              <div className="form-group">
                <label htmlFor="formGroupName2">Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="formGroupName2"
                  value={desc}
                  required
                  onChange={(e) => this.setState({ desc: e.target.value })}
                  rows="5"
                />
              </div>
              <div className="form-group">
                <label htmlFor="formGroupName2">
                  Critical Work Functions & Key Tasks
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="formGroupName2"
                  value={cwf}
                  required
                  onChange={(e) => this.setState({ cwf: e.target.value })}
                  rows="5"
                />
              </div>
              <div className="form-group">
                <label htmlFor="formGroupName2">
                  Technical Skills & Competencies
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="formGroupName2"
                  value={tSkill}
                  required
                  onChange={(e) => this.setState({ tSkill: e.target.value })}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label htmlFor="formGroupName2">
                  Generic Skills & Competencies
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="formGroupName2"
                  value={gSkill}
                  required
                  onChange={(e) => this.setState({ gSkill: e.target.value })}
                  rows="3"
                />
              </div>
            </form>
            {trackID && careerID ? (
              <button
                className="my-2 btn btn-warning"
                onClick={this.updateForm}
              >
                Update
              </button>
            ) : (
              <button className="my-2 btn btn-success" onClick={this.saveForm}>
                + Add
              </button>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

export default Career;
