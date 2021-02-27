import React, { Component } from "react";
import { Link } from "react-router-dom";

class ItemList extends Component {
  state = {
    item: this.props.product,
  };
  render() {
    const { item } = this.state;
    return (
      <div className="col s6 m4 l3">
        <div className="card">
          <Link to={`/shop/${item.id}`}>
            <div className="card-image">
              <img src={item.picture}></img>
            </div>
            <div className="card-content">
              <h4 className="card-title ellipsis">{item.name}</h4>
              <p className="ellipsis">{item.description}</p>
              <h5 className="card-price">{item.price}</h5>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default ItemList;
