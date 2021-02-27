import React, { Component } from "react";
import * as d3 from "d3";
import { dataset2 } from "./dataset2";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    //console.log(this.myRef);
    var width = this.myRef.current.clientWidth;
    var height = this.myRef.current.clientHeight;

    const root = d3.hierarchy(dataset2);
    const links = root.links();
    const nodes = root.descendants();

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(0)
          .strength(1)
      )
      .force("charge", d3.forceManyBody().strength(-50))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    var svg = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

    var link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line");

    var node = svg
      .append("g")
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("fill", (d) => (d.children ? null : "#000"))
      .attr("stroke", (d) => (d.children ? null : "#fff"))
      .attr("r", 3.5);
    //.call(() => simulation);

    //simulation.on("tick", () => {
    link
      .attr("x1", (d) => {
        console.log(d.source);
        return d.source.x;
      })
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    //invalidation.then(() => simulation.stop());
    //});

    //

    // // Add the links between nodes:
    // svg
    //   .selectAll("path")
    //   .data(root.descendants().slice(1))
    //   .enter()
    //   .append("path")
    //   .attr("d", function (d) {
    //     return (
    //       "M" +
    //       d.y +
    //       "," +
    //       d.x +
    //       "C" +
    //       (d.parent.y + 50) +
    //       "," +
    //       d.x +
    //       " " +
    //       (d.parent.y + 150) +
    //       "," +
    //       d.parent.x + // 50 and 150 are coordinates of inflexion, play with it to change links shape
    //       " " +
    //       (d.parent.y + 60) +
    //       "," +
    //       d.parent.x
    //     );
    //   })
    //   .style("fill", "none")
    //   .attr("stroke", "#ccc");

    // var rectHeight = 32;
    // // Add a circle for each node.
    // svg
    //   .selectAll("g")
    //   .data(root.descendants())
    //   .enter()
    //   .append("g")
    //   .attr("transform", function (d) {
    //     return "translate(" + d.y + "," + d.x + ")";
    //   })
    //   .append("rect")
    //   .attr("x", function (d) {
    //     return -(d.data.name.length * 10) / 2; //align boxX to the middle of its length
    //   })
    //   .attr("y", (-rectHeight * 2) / 3)
    //   .attr("width", function (d) {
    //     return d.data.name.length * 10;
    //   })
    //   .attr("height", rectHeight)
    //   .style("fill", "#69b3a2")
    //   .attr("stroke", "black")
    //   .style("stroke-width", 2);
    // svg
    //   .selectAll("g")
    //   .data(root.descendants())
    //   .append("text")
    //   .attr("text-anchor", "middle")
    //   .attr("x", 0)
    //   .attr("y", 0)
    //   .attr("stroke", "#000")
    //   // .text("Hi");
    //   .text(function (d) {
    //     //console.log(d);
    //     return d.data.name;
    //   });
    //console.log(svg.selectAll("g").data(root.descendants()));

    //hover tooltip
    // var div = d3
    //   .select("body")
    //   .append("div")
    //   .attr("class", "tooltip")
    //   .style("opacity", 0);

    // svg
    //   .selectAll("g")
    //   .on("mouseover", function (event, d) {
    //     d3.select(this).transition().duration("50").attr("opacity", ".85");
    //     console.log(d);
    //     console.log(event);
    //     //Makes the new div appear on hover:
    //     div.transition().duration(50).style("opacity", 1);
    //     div
    //       .html(d.data.colname)
    //       .style("left", event.pageX + 10 + "px")
    //       .style("top", event.pageY - 15 + "px");
    //   })
    //   .on("mouseout", function (d, i) {
    //     d3.select(this).transition().duration("50").attr("opacity", "1");
    //     //Makes the new div disappear:
    //     div.transition().duration("50").style("opacity", 0);
    //   });
  }

  render() {
    return <div className="svg-container" ref={this.myRef}></div>;
  }
}

export default Graph;
