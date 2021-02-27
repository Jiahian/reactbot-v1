import React, { Component } from "react";
import * as d3 from "d3";
import { dataset } from "./dataset";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    //console.log(this.myRef);
    var width = this.myRef.current.clientWidth;
    var height = this.myRef.current.clientHeight;
    var svg = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 " + width + " " + height)
      .classed("svg-content", true)
      .append("g")
      .attr("transform", "translate(100,0)"); // bit of margin on the left = 40

    // d3.json(
    //   "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram.json",
    //   function (data) {

    // Create the cluster layout(organise nodes of the same depth):
    var cluster = d3.cluster().size([height * 0.6, width * 0.75]); // 100 is the margin I will have on the right side

    // Give the data to this cluster layout:
    var root = d3.hierarchy(dataset, function (d) {
      //console.log(svg);
      return d.children;
    });
    cluster(root);

    // Add the links between nodes:
    svg
      .selectAll("path")
      .data(root.descendants().slice(1))
      .enter()
      .append("path")
      .attr("d", function (d) {
        return (
          "M" +
          d.y +
          "," +
          d.x +
          "C" +
          (d.parent.y + 50) +
          "," +
          d.x +
          " " +
          (d.parent.y + 150) +
          "," +
          d.parent.x + // 50 and 150 are coordinates of inflexion, play with it to change links shape
          " " +
          (d.parent.y + 60) +
          "," +
          d.parent.x
        );
      })
      .style("fill", "none")
      .attr("stroke", "#ccc");

    var rectHeight = 32;
    // Add a circle for each node.
    svg
      .selectAll("g")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
      })
      .append("rect")
      .attr("x", function (d) {
        return -(d.data.name.length * 10) / 2; //align boxX to the middle of its length
      })
      .attr("y", (-rectHeight * 2) / 3)
      .attr("width", function (d) {
        return d.data.name.length * 10;
      })
      .attr("height", rectHeight)
      .style("fill", "#69b3a2")
      .attr("stroke", "black")
      .style("stroke-width", 2);
    svg
      .selectAll("g")
      .data(root.descendants())
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", 0)
      .attr("y", 0)
      .attr("stroke", "#000")
      // .text("Hi");
      .text(function (d) {
        //console.log(d);
        return d.data.name;
      });
    //console.log(svg.selectAll("g").data(root.descendants()));

    //hover tooltip
    var div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    svg
      .selectAll("g")
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration("50").attr("opacity", ".85");
        console.log(d);
        console.log(event);
        //Makes the new div appear on hover:
        div.transition().duration(50).style("opacity", 1);
        div
          .html(d.data.colname)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 15 + "px");
      })
      .on("mouseout", function (d, i) {
        d3.select(this).transition().duration("50").attr("opacity", "1");
        //Makes the new div disappear:
        div.transition().duration("50").style("opacity", 0);
      });
  }

  render() {
    return <div className="svg-container" ref={this.myRef}></div>;
  }
}

export default Graph;
