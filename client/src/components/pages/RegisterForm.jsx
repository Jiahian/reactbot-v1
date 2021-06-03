import React, { Component } from "react";
import Joi from "joi-browser";
// import UserService from "../../services/userService";
import authService from "../../services/authService";

class RegisterForm extends Component {
  state = {
    account: { email: "", password: "", username: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email({ minDomainAtoms: 2 }).label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    username: Joi.string().required().label("Username"),
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

  handleSubmit = async (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return; //if there are errors, return. Dont call the server.

    //Call Server
    console.log("submitted");
    this.doSubmit();
  };

  doSubmit = async () => {
    try {
      const { account } = this.state;
      const response = await authService.register(
        account.username,
        account.email,
        account.password
      );
      console.log(response);
      //   auth.loginWithJwt(response.headers["x-auth-token"]);
      alert("Signed up successful! Try logging in now.");
      window.location = "/login";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data.message;
        console.log(ex.response.data);
        this.setState({ errors });
      }
    }
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div className="container my-4">
        <h1>Register</h1>
        <form className="my-3" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              autoFocus
              value={account.email}
              onChange={this.handleChange}
              name="email"
              id="email"
              type="email"
              className="validate form-control"
            />
            {errors.email && (
              <div className="alert alert-danger">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={account.password}
              onChange={this.handleChange}
              name="password"
              id="password"
              type="password"
              className="validate form-control"
            />
            {errors.password && (
              <div className="alert alert-danger">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              value={account.username}
              onChange={this.handleChange}
              name="username"
              id="username"
              type="text"
              className="validate form-control"
            />
            {errors.username && (
              <div className="alert alert-danger">{errors.username}</div>
            )}
          </div>

          <button disabled={this.validate()} className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
