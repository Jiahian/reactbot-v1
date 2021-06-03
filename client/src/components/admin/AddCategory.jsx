import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../../services/categoryService";

class AddCategory extends Component {
  state = {
    selectedCat: "",
    catId: null,
    title: "",
    submitted: false,
  };
  componentDidMount() {
    let selectedCat = this.props.location.selectedCategory;
    if (selectedCat) this.setState({ selectedCat, catId: selectedCat._id });
  }

  saveForm = () => {
    const { catId, title } = this.state;
    let data = { title: title };
    if (catId) {
      //save in Sub-cat
      CategoryService.createSubCat(catId, data)
        .then((res) => {
          //console.log(res.data);
          this.setState({
            catId: catId,
            title: res.data.title,
            submitted: true,
          });
          //console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      //save in Cat
      CategoryService.createCategory(data)
        .then((res) => {
          //console.log(res.data);
          this.setState({
            selectedCat: res.data,
            catId: res.data._id,
            title: res.data.title,
            submitted: true,
          });
          //console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  newCat = () => {
    this.setState({
      selectedCat: "",
      catId: null,
      title: "",
      submitted: false,
    });
  };

  newSubCat = () => {
    this.setState({
      title: "",
      submitted: false,
    });
  };

  render() {
    const { selectedCat, title, submitted } = this.state;

    return (
      <div className="container mx-auto my-4">
        {submitted ? (
          <div>
            <h4>You have added successfully!</h4>
            <div className="flex flex-wrap">
              {
                <Link
                  to={{
                    pathname: `/cateogory/add/`,
                    selectedCategory: "",
                  }}
                  onClick={this.newCat}
                  className="text-white my-2 mr-2 btn btn-success"
                >
                  + New Category
                </Link>
              }

              <Link
                to={{
                  pathname: `/category/add/${selectedCat._id}`,
                  selectedCategory: selectedCat,
                }}
                onClick={this.newSubCat}
                className="text-white my-2 btn btn-success"
              >
                + New Sub-Category in{" "}
                <span className="font-weight-bold">{selectedCat.title}</span>{" "}
                (Category)
              </Link>
            </div>
          </div>
        ) : (
          <Fragment>
            {selectedCat ? (
              <Fragment>
                <h1>Add New Sub-Category</h1>
                <form>
                  <div className="form-group">
                    <label htmlFor="formGroupName1">
                      Category: {selectedCat.title}
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="formGroupName">Sub-Category Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupName"
                      value={title}
                      placeholder="..."
                      required
                      onChange={(e) => this.setState({ title: e.target.value })}
                    />
                  </div>
                </form>
                <button
                  className="my-2 btn btn-success"
                  onClick={this.saveForm}
                >
                  + Add
                </button>
              </Fragment>
            ) : (
              <Fragment>
                <h1>Add New Category</h1>
                <form>
                  <div className="form-group">
                    <label htmlFor="formGroupName">Category Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupName"
                      value={title}
                      placeholder="..."
                      required
                      onChange={(e) => this.setState({ title: e.target.value })}
                    />
                  </div>
                </form>
                <button
                  className="my-2 btn btn-success"
                  onClick={this.saveForm}
                >
                  + Add
                </button>
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

export default AddCategory;
