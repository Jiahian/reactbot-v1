import React, { Component } from "react";
import VisNetwork from "./Graph4";
import vis from "vis-react";
//import { dataIT } from "./../../data/dataIT2";
import { dataIT, getGraph } from "./../../data/dataIT2";
import SideDrawer from "./SideDrawer";
import SideBar from "./SideBar";
import Dropdown from "./../common/Dropdown";
import { getGroups } from "../../data/fakeGroupService";

class Explore extends Component {
  state = {
    graph: getGraph() || [],
    groups: [], //in real world app, shd be initialize at the componentDidMount lifecycle hook
    nodeGet: "",
    style: {
      height: "90vh",
      width: "100%",
    },
    selectedGroup: null,
    sidebarOpen: false,
  };

  componentDidMount() {
    this.setState({ graph: getGraph(), groups: getGroups() });
  }

  handleEvents = {
    // select: function (event) {
    //   var { nodes, edges } = event;
    //   console.log("node:", nodes, "edge:", edges);
    // },
    selectNode: (event) => {
      let { nodes } = event;
      const nodeSelected = this.state.graph.nodes.filter(
        (n) => n.id === nodes[0]
      );
      // console.log(nodeSelected[0]);
      this.setState({ nodeGet: nodeSelected[0].label });
      this.setState({ sidebarOpen: true });
    },
  };

  handleViewSidebar = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };

  handleGroupSelect = (group) => {
    this.setState({ selectedGroup: group });
    console.log(group);
  };

  render() {
    //const { graph, selectedGroup } = this.state;
    const filtered = this.state.selectedGroup
      ? this.state.graph.nodes.filter(
          (m) => m.group._id === this.state.selectedGroup._id
        )
      : this.state.graph;

    var contentClass = this.state.sidebarOpen ? "content open" : "content";
    return (
      <React.Fragment>
        <div className="row" style={{ position: "relative", height: "100%" }}>
          <div className={contentClass} isOpen={this.state.sidebarOpen}>
            <Dropdown
              items={this.state.groups}
              selectedItem={this.state.selectedGroup}
              onItemSelect={this.handleGroupSelect}
            />
            <VisNetwork
              onEvent={this.handleEvents}
              graphProp={this.state.graph}
              styleProp={this.state.style}
            ></VisNetwork>
          </div>
        </div>
        <SideBar
          isOpen={this.state.sidebarOpen}
          content={this.state.nodeGet}
          toggleSidebar={this.handleViewSidebar}
        />
      </React.Fragment>
    );
  }
}

export default Explore;
