import React, { Component, Fragment } from "react";
import { courses } from "./../../data/courses";
import { Link } from "react-router-dom";

class ItemDetails extends Component {
  state = {
    courses: courses.data,
  };

  render() {
    const { id } = this.props.match.params;
    //const { products } = this.state;
    //const filteredProduct = products.filter((p) => p.id === id).map(p=>p);
    return (
      <div className="container mt-5 d-flex flex-wrap">
        {this.state.courses
          .filter((p) => p._id == id)
          .map((p) => (
            <Fragment>
              <div className="col-9 col-md-12">
                <h1 className="mb-4">{p.name}</h1>
                <a className="text-secondary" href="#">
                  Course Category: {p.category}
                </a>
                <h4 className="my-3">Introduction</h4>
                <p className="text-justify">{p.description}</p>
                <p className="text-primary font-weight-bold">{p.price}</p>
              </div>
              <div className="col-3">
                <p className="text-secondary  ">Related careers:</p>
                {p.tag.map((i) => (
                  <Link
                    to={`/shop/career/${i._id}`}
                    class="badge alert-primary mr-2"
                  >
                    {i.label}
                  </Link>
                ))}
              </div>
            </Fragment>
          ))}
      </div>
    );
  }
}

export default ItemDetails;
