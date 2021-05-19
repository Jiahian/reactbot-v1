import Graph from "vis-react";
import React, { Component, Fragment } from "react";

var options = {
  //configure: { enabled: true, filter: "physics", showButton: true },
  autoResize: true,
  layout: {
    hierarchical: {
      enabled: true,
      levelSeparation: 150,
      //nodeSpacing: 300, //need to turn off physics
      //treeSpacing: 400,
      //blockShifting: false, //dk what this does
      //edgeMinimization: false,
      //parentCentralization: true, //no diff
      direction: "DU",
      sortMethod: "directed",
      //shakeTowards: "roots", //no diff
    },
  },
  physics: {
    hierarchicalRepulsion: {
      springLength: 250,
      nodeDistance: 350,
      springConstant: 0.5,
      damping: 0.2,
      //avoidOverlap: 0.9, //doesnt recognise?
    },
    minVelocity: 0.75,
    solver: "hierarchicalRepulsion",
  },
  nodes: {
    shape: "box",
    shapeProperties: {
      borderRadius: 8, // only for box shape
    },
    margin: 10,
    heightConstraint: {
      valign: "middle",
    },
    widthConstraint: {
      minimum: 25,
      maximum: 160,
    },
    // function({ ctx, x, y }) {
    //   return {
    //     drawOutside() {
    //       console.log(ctx);
    //     },
    //   };
    // },
  },
  edges: {
    //length: 400,
    color: "#000000",
    smooth: {
      type: "dynamic",
      roundness: 0.5,
    },
  },
  // groups: {
  //   useDefaultGroups: false,
  //   BizIntel: {
  //     color: { background: "red" },
  //     //image: {''}
  //   },
  // },
  interaction: {
    hover: true,
    //dragView: false,
  },
};

// let events = {
//   // select: function (event) {
//   //   var { nodes, edges } = event;
//   //   console.log("node:", nodes, "edge:", edges);
//   // },
//   selectNode: (event) => {
//     let { nodes } = event;
//     console.log(nodes[0]);
//     //return nodes[0];
//   },
// };

//style of this.appRef
// let style = {
//   width: "100%",
//   height: "100vh",
// };

class VisNetwork extends Component {
  state = {
    options: options,
  };

  render() {
    return (
      <Fragment>
        <Graph
          //ref={this.myRef}
          graph={this.props.graphProp}
          options={this.state.options}
          events={this.props.onEvent}
          style={this.props.styleProp}
          // getNetwork={this.getNetwork}
          // getEdges={this.getEdges}
          // vis={(vis) => (this.vis = vis)}
        />
      </Fragment>
    );
  }
}

export default VisNetwork;
