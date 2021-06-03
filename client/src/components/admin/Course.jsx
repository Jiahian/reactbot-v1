import React, { Component, Fragment } from "react";
import CategoryService from "../../services/categoryService";
import CourseService from "../../services/courseService";
import CareerService from "../../services/careerService";

class Course extends Component {
  state = {
    subCatID: null, //for edit,delete
    courseID: "", //for Edit, Delete
    selectedCatName: "", //for Edit, Delete
    selectedSubCatName: "", //for Edit, Delete

    career: [], //for relatedList
    category: [],
    selectedCatID: "",
    selectedSubCatID: "",

    label: "", //course
    desc: "",
    objective: "",
    outline: "",
    duration: "",
    fee: "",
    trainer: "",
    date: "",
    time: "",
    venue: "",
    regBy: "",
    link: "",
    relatedList: [{ id: "", label: "" }],

    submitted: false,
  };
  componentDidMount() {
    this.retrieveCategory();
    this.retrieveCareer();

    //Edit, or Delete mode, subCatID is given by params
    let subCatID = this.props.match.params.id;
    if (subCatID) {
      this.setState({ subCatID, selectedSubCatID: subCatID });
    }

    //Edit, or Delete mode, set selected industry via selected track
    let selectedCat = this.props.location.selectedCategory;

    if (selectedCat) {
      let selectedCatName = selectedCat.title;

      let selectedSubCat = selectedCat.subcategory.filter(
        (t) => t._id === subCatID
      );

      let selectedSubCatName = selectedSubCat[0].title;

      this.setState({
        selectedCatName,
        selectedSubCatName,
      });
    }

    let selectedCourse = this.props.location.selectedCourse;
    //Edit, or Delete mode, set selected industry via selected track
    if (selectedCourse) {
      console.log("selectedCourse: ", selectedCourse);
      this.setState({
        courseID: selectedCourse._id,
        label: selectedCourse.label,
        desc: selectedCourse.desc,
        objective: selectedCourse.objective,
        outline: selectedCourse.outline,
        duration: selectedCourse.duration,
        fee: selectedCourse.fee,
        trainer: selectedCourse.trainer,
        date: selectedCourse.date,
        time: selectedCourse.time,
        venue: selectedCourse.venue,
        regBy: selectedCourse.regBy,
        link: selectedCourse.link,
        //relatedList: selectedCourse.relatedList,
      });
      if (selectedCourse.relatedList.length > 0) {
        this.setState({ relatedList: selectedCourse.relatedList });
      }
    }
  }

  retrieveCategory = () => {
    CategoryService.getAll()
      .then((res) => {
        this.setState({ category: res.data });
        //console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  retrieveCareer = () => {
    CareerService.getAll()
      .then((res) => {
        this.setState({ career: res.data });
        //console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  saveForm = () => {
    console.log("saving");
    const {
      label,
      desc,
      objective,
      outline,
      duration,
      fee,
      trainer,
      date,
      time,
      venue,
      regBy,
      link,
      relatedList,
      selectedSubCatID,
    } = this.state;
    let data = {
      label: label,
      desc: desc,
      objective: objective,
      outline: outline,
      duration: duration,
      fee: fee,
      trainer: trainer,
      date: date,
      time: time,
      venue: venue,
      regBy: regBy,
      link: link,
      relatedList: relatedList,
      subCatID: selectedSubCatID,
    };
    CourseService.createCourse(data)
      .then((res) => {
        console.log(res.data);
        this.setState({
          //id: id,
          //selectedTrackID: res.data.trackID,
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //Delete course in course db and subcat db
  removeForm = () => {
    let data = {
      subCatID: this.state.subCatID,
      courseID: this.state.courseID,
    };
    //let id = this.state.trackID;

    CourseService.delete(this.state.subCatID, data)
      .then((res) => {
        console.log("deleted: ", res.data);
        this.props.history.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //update course in course
  updateForm = () => {
    const {
      courseID,
      label,
      desc,
      objective,
      outline,
      duration,
      fee,
      trainer,
      date,
      time,
      venue,
      regBy,
      link,
      relatedList,
    } = this.state;
    let data = {
      label: label,
      desc: desc,
      objective: objective,
      outline: outline,
      duration: duration,
      fee: fee,
      trainer: trainer,
      date: date,
      time: time,
      venue: venue,
      regBy: regBy,
      link: link,
      relatedList: relatedList,
    };
    console.log(data);
    CourseService.update(courseID, data)
      .then((res) => {
        console.log("updated: ", res.data);
        this.props.history.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  newCourse = () => {
    console.log("new course");
    this.setState({
      selectedCatID: "",
      selectedSubCatID: "",
      label: "", //course
      desc: "",
      objective: "",
      outline: "",
      duration: "",
      fee: "",
      trainer: "",
      date: "",
      time: "",
      venue: "",
      regBy: "",
      link: "",
      relatedList: [{ id: "", label: "" }],
      submitted: false,
    });
  };

  //handle relatedList change
  handleListChange = (e, index, career) => {
    const { name, value } = e.target;
    const list = [...this.state.relatedList];
    list[index][name] = value;

    if (career) {
      const selectedCareer = career.filter((c) => c._id === value);
      console.log(selectedCareer);
      list[index].label = selectedCareer[0].label;
    }

    this.setState({ relatedList: list });
  };

  handleRemoveClick = (e, index) => {
    e.preventDefault();
    const list = [...this.state.relatedList];
    list.splice(index, 1);
    this.setState({ relatedList: list });
  };
  // handle click event of the Add button
  handleAddClick = () => {
    //setInputList([...inputList, { firstName: "", lastName: "" }]);
    let list = [...this.state.relatedList, { id: "", label: "" }];
    this.setState({ relatedList: list });
  };

  render() {
    const {
      subCatID,
      courseID,
      career,
      category,
      selectedCatName,
      selectedSubCatName,

      selectedCatID,
      selectedSubCatID,
      label,
      desc,
      objective,
      outline,
      duration,
      fee,
      trainer,
      date,
      time,
      venue,
      regBy,
      link,
      relatedList,
      submitted,
    } = this.state;

    console.log(this.state);

    const filteredCat = category.filter((i) => i._id === selectedCatID);

    return (
      <div className="container mx-auto my-4">
        {submitted ? (
          <div>
            <h4>You have added a course successfully!</h4>
            <div className="flex flex-wrap">
              <button className="my-2 btn btn-success" onClick={this.newCourse}>
                + New Course
              </button>
            </div>
          </div>
        ) : (
          <Fragment>
            <div className="d-flex flex-nowrap justify-content-between align-items-center">
              <h1 className="d-inline-block">
                {subCatID ? "Edit" : "Add New"} Course
              </h1>
              <button
                type="button"
                className="ml-2 btn btn btn-danger"
                onClick={() => {
                  this.removeForm();
                }}
              >
                Delete
              </button>
            </div>
            <form className="mt-3">
              <div className="form-group">
                <label htmlFor="formGrouSelect1">Category</label>
                {subCatID && courseID && selectedCatName ? (
                  <input
                    type="text"
                    readOnly
                    className="form-control font-weight-bold"
                    id="formGrouSelect1"
                    defaultValue={selectedCatName}
                  />
                ) : (
                  <select
                    className="form-control"
                    id="formGrouSelect1"
                    required
                    value={selectedCatID}
                    onChange={(e) =>
                      this.setState({ selectedCatID: e.target.value })
                    }
                  >
                    <option defaultValue>Please select a Category</option>
                    {category &&
                      category.map((c) => (
                        <option value={c._id} key={c._id}>
                          {c.title}
                        </option>
                      ))}
                  </select>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="formGrouSelect2">Sub-category</label>
                {subCatID && courseID && selectedSubCatName ? (
                  <input
                    type="text"
                    readOnly
                    className="form-control font-weight-bold"
                    id="formGrouSelect2"
                    defaultValue={selectedSubCatName}
                  />
                ) : (
                  <select
                    className="form-control"
                    id="formGrouSelect2"
                    required
                    value={selectedSubCatID}
                    onChange={(e) =>
                      this.setState({ selectedSubCatID: e.target.value })
                    }
                  >
                    <option>Please select a sub-category</option>
                    {filteredCat &&
                      filteredCat.map((f) =>
                        f.subcategory.map((s) => (
                          <option value={s._id} key={s._id}>
                            {s.title}
                          </option>
                        ))
                      )}
                  </select>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="formGroupName1">Course Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupName1"
                  value={label}
                  required
                  onChange={(e) =>
                    this.setState({
                      label: e.target.value,
                    })
                  } //in db it is saved as label
                />
              </div>
              <div className="form-group">
                <label htmlFor="formGroupName2">Course Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="formGroupName2"
                  value={desc}
                  required
                  onChange={(e) =>
                    this.setState({
                      desc: e.target.value,
                    })
                  }
                  rows="5"
                />
              </div>
              <div className="form-group">
                <label htmlFor="formGroupName3">Course Objective</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="formGroupName3"
                  value={objective}
                  required
                  onChange={(e) => this.setState({ objective: e.target.value })}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label htmlFor="formGroupName33">Course Outline</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="formGroupName33"
                  value={outline}
                  required
                  onChange={(e) => this.setState({ outline: e.target.value })}
                  rows="3"
                />
              </div>
              <div className="form-row">
                <div className="form-group  col-sm-6">
                  <label htmlFor="formGroupName4">Course Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupName4"
                    value={duration}
                    required
                    placeholder="eg. 13 Hours"
                    onChange={(e) =>
                      this.setState({ duration: e.target.value })
                    }
                  />
                </div>

                <div className="form-group col-sm-6">
                  <label htmlFor="formGroupName5">Course Fee (SGD)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupName5"
                    value={fee}
                    required
                    placeholder="100.00"
                    onChange={(e) => this.setState({ fee: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="formGroupName11">Link to sign up</label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupName11"
                  value={link}
                  required
                  onChange={(e) => this.setState({ link: e.target.value })}
                />
              </div>
              <div className="form-row">
                <div className="form-group col-sm-6">
                  <label htmlFor="formGroupName6">Trainer</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupName6"
                    value={trainer}
                    required
                    onChange={(e) => this.setState({ trainer: e.target.value })}
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="formGroupName10">Register by</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupName10"
                    value={regBy}
                    placeholder="eg. 1 Sep 2021"
                    required
                    onChange={(e) => this.setState({ regBy: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-sm-6">
                  <label htmlFor="formGroupName7">Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupName7"
                    value={date}
                    required
                    onChange={(e) => this.setState({ date: e.target.value })}
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="formGroupName8">Time</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupName8"
                    value={time}
                    placeholder="eg. 12.30pm"
                    required
                    onChange={(e) => this.setState({ time: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="formGroupName9">Venue</label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupName9"
                  value={venue}
                  required
                  onChange={(e) => this.setState({ venue: e.target.value })}
                />
              </div>
              <label htmlFor="formGroupName12">
                Recommend this course to related careers
              </label>
              {/**<div>{JSON.stringify(relatedList)}</div>**/}

              {relatedList.map((x, i) => {
                return (
                  <div className="form-row">
                    <div className="form-group col-6">
                      <select
                        className="form-control form-control-sm"
                        id="formGrouSelect1"
                        name="id"
                        value={x.id}
                        onChange={(e) => this.handleListChange(e, i, career)}
                      >
                        <option value="">Career...</option>
                        {career &&
                          career.map((c) => (
                            <option value={c._id} key={i}>
                              {c.label}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group col-1">
                      {relatedList.length !== 1 && (
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={(e) => this.handleRemoveClick(e, i)}
                        >
                          <i class="fas fa-minus"></i>
                        </button>
                      )}
                    </div>
                    <div className="form-group col-1">
                      {relatedList.length - 1 === i && (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={this.handleAddClick}
                        >
                          <i class="fas fa-plus"></i>
                        </button>
                      )}
                    </div>
                  </div>
                  // <form className="mt-3 row flex-nowrap g-3 align-items-end">
                  //   <div className="col-5">
                  //     <select
                  //       className="form-control form-control-sm"
                  //       id="formGrouSelect1"
                  //       name="id"
                  //       value={x.id}
                  //       onChange={(e) => this.handleListChange(e, i, career)}
                  //     >
                  //       <option value="">Career...</option>
                  //       {career &&
                  //         career.map((c) => (
                  //           <option value={c._id} key={i}>
                  //             {c.label}
                  //           </option>
                  //         ))}
                  //     </select>
                  //   </div>
                  //   <div className="col-1">
                  //     {relatedList.length !== 1 && (
                  //       <button
                  //         className="btn btn-sm btn-warning"
                  //         onClick={(e) => this.handleRemoveClick(e, i)}
                  //       >
                  //         <i class="fas fa-minus"></i>
                  //       </button>
                  //     )}
                  //   </div>
                  //   <div className="col-1">
                  //     {relatedList.length - 1 === i && (
                  //       <button
                  //         className="btn btn-sm btn-primary"
                  //         onClick={this.handleAddClick}
                  //       >
                  //         <i class="fas fa-plus"></i>
                  //       </button>
                  //     )}
                  //   </div>
                  // </form>
                );
              })}
            </form>
            {subCatID && courseID ? (
              <button
                className="my-2 btn btn-warning"
                onClick={this.updateForm}
              >
                Update
              </button>
            ) : (
              <button className="my-2 btn btn-success" onClick={this.saveForm}>
                + Add
              </button>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

export default Course;
