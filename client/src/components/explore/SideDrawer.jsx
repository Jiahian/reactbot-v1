import React, { Component } from "react";

import SideBar from "./SideBar";
//import Content from "../Content/Content";

class SideDrawer extends Component {
  //   state = {
  //     sidebarOpen: false,
  //   };
  //   handleViewSidebar = () =>
  //     this.setState({ sidebarOpen: !this.state.sidebarOpen });

  render() {
    return (
      <div>
        <SideBar
          isOpen={this.props.isOpen}
          toggleSidebar={this.props.toggleSideBar}
        />
      </div>
    );
  }
}

export default SideDrawer;
