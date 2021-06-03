import React, { Component, Fragment } from "react";
import IndustryTrackService from "../../services/industryTrackService";
import { Link } from "react-router-dom";

class AddIndustryTrack extends Component {
  state = {
    selectedIndustry: "",
    //selectedTrack: "",
    id: null, //id of Industry
    name: "",
    submitted: false,
  };
  componentDidMount() {
    let selectedIndustry = this.props.location.selectedIndustry;
    if (selectedIndustry)
      this.setState({ selectedIndustry, id: selectedIndustry._id });
    // let selectedTrack = this.props.location.selectedTrack;
    // if (selectedTrack) this.setState({ selectedTrack });
  }

  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  saveForm = () => {
    const { name, id } = this.state;
    let data = {
      name: name,
    };

    if (id) {
      //console.log(id);
      IndustryTrackService.createTrack(id, data)
        .then((res) => {
          //console.log(res.data);
          this.setState({
            id: id,
            name: res.data.name,
            submitted: true,
          });
          //console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      IndustryTrackService.createIndustry(data)
        .then((res) => {
          this.setState({
            selectedIndustry: res.data,
            id: res.data._id,
            name: res.data.name,
            submitted: true,
          });
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  newIndustry = () => {
    this.setState({
      selectedIndustry: "",
      id: null,
      name: "",
      submitted: false,
    });
  };

  newTrack = () => {
    this.setState({
      name: "",
      submitted: false,
    });
  };

  render() {
    //console.log(this.state);
    //console.log(this.state.selectedIndustry);
    //console.log(this.props.location.selectedIndustry);
    const { selectedIndustry, name, submitted } = this.state;
    return (
      <div className="container mx-auto my-4">
        {submitted ? (
          <div>
            <h4>You have added successfully!</h4>
            <div className="flex flex-wrap">
              {
                <Link
                  to={{
                    pathname: `/industry-track/add/`,
                    selectedIndustry: "",
                  }}
                  onClick={this.newIndustry}
                  className="text-white my-2 mr-2 btn btn-success"
                >
                  + New Industry
                </Link>
              }

              <Link
                to={{
                  pathname: `/industry-track/add/${selectedIndustry._id}`,
                  selectedIndustry: selectedIndustry,
                }}
                onClick={this.newTrack}
                className="text-white my-2 btn btn-success"
              >
                + New Track in{" "}
                <span className="font-weight-bold">
                  {selectedIndustry.name}
                </span>{" "}
                (Industry)
              </Link>
            </div>
          </div>
        ) : (
          <Fragment>
            {selectedIndustry ? (
              <Fragment>
                <h1>Add New Track</h1>
                <form className="mt-3">
                  <div className="form-group">
                    <label htmlFor="formGroupName1">
                      Industry: {selectedIndustry.name}
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="formGroupName">Track Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupName"
                      value={name}
                      placeholder="..."
                      required
                      onChange={this.onChangeName}
                    />
                  </div>
                </form>
                <button
                  className="my-2 btn btn-success"
                  onClick={this.saveForm}
                >
                  + Add
                </button>
              </Fragment>
            ) : (
              <Fragment>
                <h1>Add New Industry</h1>
                <form className="mt-3">
                  <div className="form-group">
                    <label htmlFor="formGroupName">Industry Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupName"
                      value={name}
                      placeholder="..."
                      required
                      onChange={this.onChangeName}
                    />
                  </div>
                </form>
                <button
                  className="my-2 btn btn-success"
                  onClick={this.saveForm}
                >
                  + Add
                </button>
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

export default AddIndustryTrack;
