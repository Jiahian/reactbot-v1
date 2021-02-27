import React, { Component } from "react";

import ItemList from "./ItemList";
import { products } from "./../shop/products";

class Shop extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     products: products.data,
  //   };
  // }
  state = {
    products: products.data,
  };

  render() {
    return (
      <div className="container">
        <h2>Courses</h2>
        <div className="row">
          {this.state.products.map((product) => (
            <ItemList key={product.name} product={product}></ItemList>
          ))}
        </div>
      </div>
    );
  }
}

export default Shop;
