import React, { Component } from "react";
import * as d3 from "d3";
import { dataset3 } from "./dataset3";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    let vis = d3.select("#vis").attr("transform", "translate(20, 20)");
    // var svg = d3
    //   .select(this.myRef.current)
    //   .append("svg")
    //   .attr("transform", "translate(20, 20)");
    //.attr("viewBox", [-width / 2, -height / 2, width, height]);

    // Build initial link elements - Build first so they are under the nodes
    let setlinks = vis.selectAll("line.link").data(dataset3.links);

    setlinks
      .enter()
      .append("line")
      .attr("class", "link") //append "path" next
      .attr("stroke", "#000");

    // Build initial node elements
    let setnodes = vis.selectAll("g.node").data(dataset3.nodes);

    setnodes
      .enter()
      .append("g")
      .attr("class", "node")
      .append("circle")
      .attr("r", 10)
      .append("title")
      .text(function (d) {
        return d.name;
      });

    let nodes = vis.selectAll("g.node");
    let links = vis.selectAll("line.link");

    // Store nodes in a hash by name
    let nodesByName = {};

    nodes.each(function (d) {
      nodesByName[d.name] = d;
    });

    // Convert link references to objects
    links.each(function (link) {
      console.log(nodesByName[link.source]);
      link.source = nodesByName[link.source];
      link.target = nodesByName[link.target];
      if (link.source.links === undefined) {
        link.source.links = [];
      }
      link.source.links.push(link.target);
      if (link.target.links === undefined) {
        link.target.links = [];
      }
      link.target.links.push(link.source);
    });

    // Compute positions based on distance from root
    var setPosition = function (node, i, depth) {
      if (depth === undefined) {
        depth = 0;
      }
      if (node.x === 0) {
        node.x = (i + 1) * 40;
        node.y = (depth + 1) * 40;
        if (depth <= 1) {
          node.links.each(function (d, i2) {
            setPosition(d, i2, depth + 1);
          });
        }
      }
    };

    // nodes.each(setPosition);

    // // Update inserted elements with computed positions
    // nodes.attr("transform", function (d) {
    //   return "translate(" + d.x + ", " + d.y + ")";
    // });

    // links
    //   .attr("x1", function (d) {
    //     return d.source.x;
    //   })
    //   .attr("y1", function (d) {
    //     return d.source.y;
    //   })
    //   .attr("x2", function (d) {
    //     return d.target.x;
    //   })
    //   .attr("y2", function (d) {
    //     return d.target.y;
    //   });
  }

  render() {
    return (
      <svg>
        <g id="vis"></g>
      </svg>
    );
  }
}

export default Graph;
