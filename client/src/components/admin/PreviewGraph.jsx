import React, { Component } from "react";
import VisNetwork from "../explore/Graph4";

class PreviewGraph extends Component {
  state = {
    graph: this.props.graph,
    style: {
      height: "400px",
      width: "100%",
      border: "1px black solid",
      margin: "0",
    },
  };
  render() {
    console.log(this.state.graph);
    return (
      <VisNetwork
        graphProp={this.state.graph}
        onEvent={this.props.onEvent}
        styleProp={this.state.style}
      ></VisNetwork>
    );
  }
}

export default PreviewGraph;
