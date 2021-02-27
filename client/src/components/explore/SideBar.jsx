import React, { Component } from "react";
import NodeContext from "./../context/nodeContext";
// import leftArrow from "../../../../asset/Images/left.svg";
// import rightArrow from "../../../../asset/Images/right.svg";

class SideBar extends Component {
  render() {
    var sidebarClass = this.props.isOpen ? "sidebar open" : "sidebar";
    return (
      // <NodeContext.Consumer>
      //   {(nodeContext) => (
      <div className={sidebarClass}>
        <div>{this.props.content}</div>

        <button onClick={this.props.toggleSidebar} className="sidebar-toggle">
          {this.props.isOpen ? "<" : ">"}
        </button>
      </div>
      //   )}
      // </NodeContext.Consumer>
    );
  }
}

export default SideBar;
