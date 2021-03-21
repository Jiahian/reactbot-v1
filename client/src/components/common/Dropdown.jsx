import { disconnect } from "mongoose";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Dropdown extends Component {
  state = {
    isOpen: false,
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const {
      buttonLabel,
      items,
      industryID,
      selectedItem,
      onItemSelect,
      onItemChange,
    } = this.props;
    const dropdownClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;

    return (
      <div className="dropdown mr-2" onClick={this.toggleOpen}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {buttonLabel}
        </button>
        <ul className={dropdownClass} aria-labelledby="dropdownMenuButton1">
          {items.map((item) => (
            <li
              className="text-muted"
              //onClick={() => onItemSelect(item)}

              key={item._id}
              style={{ cursor: "pointer", padding: "0.25rem 1.5rem" }}
            >
              {item.name}

              <div>
                <ul>
                  {item.group.map((n) => (
                    <a href={`/explore/${n._id}`}>
                      <li className="dropdown-item" key={n._id}>
                        {n.name}
                      </li>
                    </a>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>

      // <div className="form-group">
      //   <label for="exampleFormControlSelect1"></label>
      //   <select
      //     className="form-control"
      //     id="exampleFormControlSelect1"
      //     onChange={(e) => onItemChange(e)}
      //   >
      //     {items.map((item) => (
      //       <option key={item._id}>{item.name}</option>
      //     ))}
      //   </select>
      // </div>
    );
  }
}

export default Dropdown;
