import React, { Component } from "react";

class DropdownMenu extends Component {
  state = {
    industry: this.props.industry,
  };

  getMenuItemTitle = (menuItem, index, depthLevel) => {
    return menuItem.name;
  };

  getMenuItem = (menuItem, depthLevel, index) => {
    let name = this.getMenuItemTitle(menuItem, index, depthLevel);
    //console.log(name);
    if (menuItem.tracks && menuItem.tracks.length > 0) {
      return (
        <li>
          {name}
          <DropdownMenu industry={menuItem.tracks} tracks={true} />
        </li>
      );
    } else {
      return <li>{name}</li>;
    }
  };
  render() {
    let { industry } = this.state;
    //console.log(industry);
    let options = [];
    industry.map((item, index) => {
      console.log(item);
      options.push(this.getMenuItem(item, 0, index));
    });
    console.log(options);

    if (this.props.tracks && this.props.tracks === true)
      return <ul>{options}</ul>;

    return <ul className="dropdown-menu">{options}</ul>;
  }
}

export default DropdownMenu;
