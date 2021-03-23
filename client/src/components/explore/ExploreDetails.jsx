import React, { Component } from "react";
import CareerService from "../../services/careerService";

class ExploreDetail extends Component {
  state = {
    careerID: this.props.match.params.id,
    career: [],
  };
  componentDidMount() {
    this.retrieveCareer(this.state.careerID);
  }

  retrieveCareer = (careerID) => {
    CareerService.getCareer(careerID)
      .then((res) => {
        this.setState({ career: res.data });
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { career } = this.state;

    return (
      <div className="container my-4">
        <div>
          <h1 className="my-4">{career.label}</h1>
          <hr />
          <h5>Job Description: </h5>
          <p className="text-justify">{career.desc}</p>
          <h5>Critical Work Function: </h5>

          <p className="text-justify text-">{career.cwf}</p>

          <div className="row">
            <div className="col-sm-6">
              <h5>Technical Skills & Competencies: </h5>
              <p className="text-justify">{career.tSkill}</p>
            </div>
            <div className="col-sm-6">
              <h5>Generic Skills & Competencies: </h5>
              <p className="text-justify">{career.gSkill}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExploreDetail;
