import React, { Component } from "react";
import { ICTDataAI } from "../../data/ICTDataAI";
import SideBar from "./SideBar";
import Dropdown from "./../common/Dropdown";
import { getGroups, getIndustry } from "../../data/fakeGroupService";
import { Link } from "react-router-dom";
import ExploreGraph from "./ExploreGraph";

class Explore extends Component {
  state = {
    id: this.props.match.params.id || "5b21ca3eeb7f6fbccd471818",
    graph: ICTDataAI,
    industrygroup: [],
    groups: [],
    //subgroups: [], //in real world app, shd be initialize at the componentDidMount lifecycle hook
    nodeGet: "",
    //selectedGroup: null,
    //selectedSubgroup: null,
  };

  componentDidMount() {
    //this.setState({ graph: getGraph(), groups: getGroups() });
    this.setState({
      industrygroup: getIndustry(),
      //groups: getGroups(this.state.id),
      //subgroups: getSubgroup(),
    });
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
      this.setState({ nodeGet: nodeSelected[0] });
    },
  };

  handleGroupSelect = (group) => {
    console.log(group);
    // this.setState({ graph: ICTDataAI });
    // console.log(ICTDataAI);
    // console.log(this.state.graph);
    // const { graph, selectedGroup } = this.state;
    const graphData = { ...ICTDataAI };
    console.log(graphData);

    const filteredNodes = graphData.nodes.filter(
      (m) => m.group._id === group._id
    );

    console.log(filteredNodes);

    const filtered = { nodes: [...filteredNodes], edges: [...graphData.edges] };
    console.log(filtered);
    this.setState({ graph: filtered }); //why giving me errrors?
  };

  handleSubgroupSelect = (group) => {
    console.log(group);
    this.setState({ selectedSubgroup: group });
    // const { graph, selectedGroup } = this.state;
    const graphData = { ...this.state.graph };

    const filteredNodes = graphData.nodes.map((n) =>
      n.subgroup.filter((s) => s._id === group._id)
    );

    console.log(filteredNodes);
    const filtered = { nodes: [...filteredNodes], edges: [...graphData.edges] };
    this.setState({ graph: filtered }); //why giving me errrors?
  };

  handleChange = (e) => {
    console.log(e.currentTarget.value);
  };

  render() {
    //const { id } = this.props.match.params;

    const { id } = this.state;
    //console.log(id);

    const filteredNodes = this.state.graph.nodes.filter(
      (n) => n.group._id === id
    );

    //console.log(filteredNodes);
    const filtered = {
      nodes: [...filteredNodes],
      edges: [...this.state.graph.edges],
    };

    return (
      <React.Fragment>
        <div className="row mx-0">
          <div className="col-lg-9 col-md-8 col-sm-12">
            <div className="row mx-0 my-2">
              <Dropdown
                buttonLabel="Industry > Tracks"
                items={this.state.industrygroup}
                //selectedItem={this.state.selectedGroup}
                //onItemSelect={this.handleGroupSelect}
                //onItemChange={this.handleChange}
              />
            </div>
            <ExploreGraph
              //graph={this.state.graph}
              graph={filtered}
              onEvent={this.handleEvents}
            ></ExploreGraph>
          </div>
          <SideBar
            //isOpen={this.state.sidebarOpen}
            node={this.state.nodeGet}
            //toggleSidebar={this.handleViewSidebar}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Explore;
//<div className={contentClass} isOpen={this.state.sidebarOpen}>

// <Dropdown
//   buttonLabel="Tracks"
//   industryID={this.state.id}
//   items={this.state.groups}
//   //selectedItem={this.state.selectedGroup}
//   //onItemSelect={this.handleGroupSelect}
//   //onItemChange={this.handleChange}
// />;

// <Dropdown
//   buttonLabel="Sub-Tracks"
//   items={this.state.subgroups}
//   selectedItem={this.state.selectedSubgroup}
//   // onItemSelect={this.handleSubgroupSelect}
//   // onItemChange={this.handleChange}
// />;
