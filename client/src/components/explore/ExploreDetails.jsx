import React, { Component } from "react";
import { ICTDataAI } from "./../../data/ICTDataAI";

class ExploreDetail extends Component {
  state = {
    node: ICTDataAI.nodes,
  };

  render() {
    const { id } = this.props.match.params;
    //const { products } = this.state;
    //const filteredProduct = products.filter((p) => p.id === id).map(p=>p);
    console.log(id);
    return (
      <div className="container my-4">
        {this.state.node
          .filter((p) => p._id == id)
          .map((p) => (
            <div>
              <a className="text-secondary" href="#">
                {p.group.name}
                <i
                  className="fas fa-chevron-right mx-2"
                  style={{ fontSize: "12px" }}
                ></i>
                {p.subgroup[0].name}
              </a>
              <h1 className="my-4">{p.label}</h1>
              <h5>Job Description: </h5>
              <p className="text-justify">{p.JobDescription}</p>
            </div>
          ))}
      </div>
    );
  }
}

export default ExploreDetail;
