import React, { Component } from "react";
import { Link } from "react-router-dom";

class ItemList extends Component {
  state = {
    item: this.props.course,
  };
  render() {
    const { item } = this.state;
    return (
      <div className="col-3 col-md-4 col-sm-6">
        <div className="card mb-4">
          <Link to={`/shop/${item._id}`}>
            <img class="card-img-top" src={item.picture} alt=""></img>

            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>

              <h6 className="card-price">{item.price}</h6>
            </div>
          </Link>
          <div className="card-body">
            {item.tag.map((i) => (
              <Link
                to={`/shop/career/${i._id}`}
                class="badge alert-primary mr-2"
              >
                {i.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ItemList;
// <p className="card-text ellipsis">{item.description}</p>;
