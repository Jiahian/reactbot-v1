import React, { Component } from "react";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.account, this.schema, options);
    if (!result.error) return null; //if no errors

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return; //if there are errors, return. Dont call the server.

    //Call Server
    console.log("submitted");
  };

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="input-field">
            <input
              value={this.state.account.username}
              onChange={this.handleChange}
              name="username"
              id="username"
              type="text"
              className="validate"
            />
            <label htmlFor="username">Username</label>
          </div>
          {this.state.errors.username && (
            <div className="card-panel red lighten-4 red-text text-accent-4">
              {this.state.errors.username}
            </div>
          )}
          <div className="input-field">
            <input
              value={this.state.account.password}
              onChange={this.handleChange}
              name="password"
              id="password"
              type="password"
              className="validate"
            />
            <label htmlFor="password">Password</label>
          </div>
          {this.state.errors.password && (
            <div className="card-panel red lighten-4 red-text text-accent-4">
              {this.state.errors.password}
            </div>
          )}
          <button
            disabled={this.validate()}
            className="btn waves-effect waves-light"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
