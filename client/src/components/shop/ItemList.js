import React, { Component } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/img-1.jpeg";

class ItemList extends Component {
  state = {
    item: this.props.course,
  };

  render() {
    const { item } = this.state;
    return (
      <div className="col-3 col-md-4 col-sm-6">
        <div className="card mb-4">
          <Link to={{ pathname: `/shop/${item._id}`, courseInfo: item }}>
            <img class="card-img-top" src={img} alt="placeholder-img"></img>
            <div className="card-body">
              <h5 className="card-title">{item.label}</h5>
              <h6 className="font-weight-bold">S${item.fee}</h6>
              <p>
                <span className="font-weight-bold">Subcategory: </span> (EEE)
                Electronics | {item.duration} | {item.trainer}
              </p>
            </div>
          </Link>
          <div className="px-3 pb-3">
            <span className="font-weight-bold">Related Careers: </span>
            {item.relatedList.map((i) => (
              <Link
                to={`/explore/detail/${i.id}`}
                class="badge alert-primary mr-2"
                style={{ whiteSpace: "wrap", textAlign: "left" }}
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
