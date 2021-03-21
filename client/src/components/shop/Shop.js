import React, { Component } from "react";

import ItemList from "./ItemList";
//import { products } from "./../shop/products";
import { courses } from "./../../data/courses";

class Shop extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     products: products.data,
  //   };
  // }
  state = {
    courses: courses.data,
  };

  render() {
    return (
      <div className="container my-4">
        <h2>Courses</h2>
        <div className="row">
          {this.state.courses.map((course) => (
            <ItemList key={course.name} course={course}></ItemList>
          ))}
        </div>
      </div>
    );
  }
}

export default Shop;
