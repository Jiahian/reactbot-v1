import React, { Component } from "react";
import VisNetwork from "./Graph4";

class ExploreGraph extends Component {
  state = {
    graph: this.props.graph,
    style: {
      height: "80vh",
      width: "100%",
      border: "1px black solid",
      margin: "0 10px 10px 0",
    },
  };
  render() {
    return (
      <VisNetwork
        graphProp={this.state.graph}
        onEvent={this.props.onEvent}
        styleProp={this.state.style}
      ></VisNetwork>
    );
  }
}

export default ExploreGraph;
