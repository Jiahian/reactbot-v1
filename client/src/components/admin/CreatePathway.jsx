import React, { Component } from "react";
import CareerService from "../../services/careerService";
import pathwayService from "../../services/pathwayService";

class CreatePathway extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackID: "",
      selectedTrack: this.props.location.selectedTrack, //will have data if in edit mode
      career: [],
      nodeList: [{ id: "", label: "", level: null }],
      edgeList: [{ from: "", to: "" }],
    };
  }

  componentDidMount() {
    let trackID = this.props.match.params.id;
    if (trackID) this.setState({ trackID });

    this.retrieveCareer(trackID);

    const { selectedTrack } = this.state;
    if (selectedTrack)
      this.setState({
        nodeList: selectedTrack[0].nodes,
        edgeList: selectedTrack[0].edges,
      });
  }

  retrieveCareer = (trackID) => {
    CareerService.getAll(trackID)
      .then((res) => {
        this.setState({ career: res.data });
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  saveForm = () => {
    const { trackID, nodeList, edgeList } = this.state;
    let data = {
      nodes: nodeList,
      edges: edgeList,
    };
    console.log(data);
    pathwayService
      .createPathway(trackID, data)
      .then((res) => {
        //this.setState({ nodeList: res.data.nodes, edgeList: res.data.edges });
        this.props.history.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  updateForm = () => {
    const { trackID, nodeList, edgeList } = this.state;
    let data = {
      nodes: nodeList,
      edges: edgeList,
    };
    console.log(data);
    pathwayService
      .updatePathway(trackID, data)
      .then((res) => {
        //this.setState({ nodeList: res.data.nodes, edgeList: res.data.edges });
        this.props.history.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // For nodeList
  // handle input change fo nodeList
  handleInputChange = (e, index, career) => {
    const { name, value } = e.target;
    const list = [...this.state.nodeList];
    list[index][name] = value;

    if (career) {
      const selectedCareer = career.filter((c) => c._id === value);
      console.log(selectedCareer);
      list[index].label = selectedCareer[0].label;
    }

    this.setState({ nodeList: list });
  };

  // handle click event of the Remove button
  handleRemoveClick = (e, index) => {
    e.preventDefault();
    const list = [...this.state.nodeList];
    list.splice(index, 1);
    this.setState({ nodeList: list });
  };

  // handle click event of the Add button
  handleAddClick = () => {
    //setInputList([...inputList, { firstName: "", lastName: "" }]);
    let list = [...this.state.nodeList, { id: "", label: "", level: null }];
    this.setState({ nodeList: list });
  };

  // For edgeList
  // handle input change for edgeList
  handleInputChangeEdge = (e, index) => {
    const { name, value } = e.target;
    const list = [...this.state.edgeList];
    list[index][name] = value;
    this.setState({ edgeList: list });
  };
  handleRemoveClickEdge = (e, index) => {
    e.preventDefault();
    const list = [...this.state.edgeList];
    list.splice(index, 1);
    this.setState({ edgeList: list });
  };

  handleAddClickEdge = () => {
    let list = [...this.state.edgeList, { from: "", to: "" }];
    this.setState({ edgeList: list });
  };

  render() {
    const { nodeList, edgeList, career, selectedTrack } = this.state;
    console.log(this.state);
    return (
      <div className="container mx-auto my-4">
        <h1>Create Career Pathway</h1>
        <h4 className="mt-4">Nodes</h4>
        <p className="text-secondary">
          Set each career node accordingly to its level in the graph.
        </p>
        <div className="row flex-nowrap">
          <div className="col-5">
            <p className="m-0">Career</p>
          </div>
          <div className="col-5">
            <p className="m-0">Level</p>
          </div>
          <div className="col-1 p-0">
            <p className="m-0">Remove</p>
          </div>
          <div className="col-1">
            <p className="m-0">Add</p>
          </div>
        </div>
        <div>{JSON.stringify(nodeList)}</div>
        <div>{JSON.stringify(edgeList)}</div>
        {nodeList.map((x, i) => {
          return (
            <form className="mt-3 row flex-nowrap g-3 align-items-end">
              <div className="col-5">
                <select
                  className="form-control form-control-sm"
                  id="formGrouSelect1"
                  name="id"
                  value={x.id}
                  onChange={(e) => this.handleInputChange(e, i, career)}
                >
                  <option value="">Select a career node</option>
                  {career &&
                    career.map((c) => (
                      <option value={c._id} key={i}>
                        {c.label}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-5">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="level"
                  value={x.level}
                  onChange={(e) => this.handleInputChange(e, i)}
                  id="inputLevel"
                  placeholder="Only number"
                />
              </div>
              <div className="col-1">
                {nodeList.length !== 1 && (
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={(e) => this.handleRemoveClick(e, i)}
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                )}
              </div>
              <div className="col-1">
                {nodeList.length - 1 === i && (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={this.handleAddClick}
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                )}
              </div>
            </form>
          );
        })}
        <h4 className="mt-5">Edges</h4>
        <p className="text-secondary">
          Set how each career node will join to the next career node in the
          graph.
        </p>
        <div className="row flex-nowrap">
          <div className="col-5">
            <p className="m-0">From</p>
          </div>
          <div className="col-5">
            <p className="m-0">To</p>
          </div>
          <div className="col-1 p-0">
            <p className="m-0">Remove</p>
          </div>
          <div className="col-1">
            <p className="m-0">Add</p>
          </div>
        </div>
        {edgeList.map((x, i) => {
          return (
            <form className="mt-3 row flex-nowrap g-3 align-items-end">
              <div className="col-5">
                <select
                  className="form-control form-control-sm"
                  id="formGrouSelect1"
                  name="from"
                  value={x.from}
                  onChange={(e) => this.handleInputChangeEdge(e, i)}
                >
                  <option value="">Select a career node</option>
                  {career &&
                    career.map((c) => (
                      <option value={c._id} key={i}>
                        {c.label}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-5">
                <select
                  className="form-control form-control-sm"
                  id="formGrouSelect2"
                  name="to"
                  value={x.to}
                  onChange={(e) => this.handleInputChangeEdge(e, i)}
                >
                  <option defaultValue>Select a career node</option>
                  {career &&
                    career.map((c) => (
                      <option value={c._id} key={c._id}>
                        {c.label}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-1">
                {edgeList.length !== 1 && (
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={(e) => this.handleRemoveClickEdge(e, i)}
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                )}
              </div>
              <div className="col-1">
                {edgeList.length - 1 === i && (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={this.handleAddClickEdge}
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                )}
              </div>
            </form>
          );
        })}
        {selectedTrack ? (
          <button className="my-3 btn btn-warning" onClick={this.updateForm}>
            Update
          </button>
        ) : (
          <button className="my-3 btn btn-success" onClick={this.saveForm}>
            Submit
          </button>
        )}
      </div>
    );
  }
}

export default CreatePathway;
