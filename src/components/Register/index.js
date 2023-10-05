import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import "./index.css";

class Register extends Component {
  state = {
    username: "",
    password: "",
    errorMsg: "",
    confirmPassword: "",
  };

  onSubmitSuccess = () => {
    const { history } = this.props;
    history.replace("/login");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ errorMsg });
  };
  submitForm = async (event) => {
    event.preventDefault();
    const { username, password, confirmPassword } = this.state;
    const userDetails = {
      username,
      password,
    };
    const url = "http://localhost:8000/register/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    if (password === confirmPassword) {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok === true) {
        this.onSubmitSuccess();
      } else {
        const errorMsg = data.error_msg;
        this.onSubmitFailure(errorMsg);
      }
    } else {
      this.setState({ errorMsg: "Passwords Not Match" });
    }
  };
  goToLogin = () => {
    const { history } = this.props;
    history.replace("/login");
  };
  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };
  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  onChangeConfirmPass = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };
  render() {
    const { errorMsg } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div className="register-container">
        <form className="registration-form" onSubmit={this.submitForm}>
          <h1 className="register-heading">Register</h1>
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            type="text"
            className="input"
            id="username"
            placeholder="Enter your name"
            onChange={this.onChangeUsername}
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            className="input"
            id="password"
            placeholder="Enter your password"
            onChange={this.onChangePassword}
          />
          <label htmlFor="conPassword" className="label">
            Confirm Password
          </label>
          <input
            type="password"
            className="input"
            id="conPassword"
            placeholder="Enter your password"
            onChange={this.onChangeConfirmPass}
          />
          <button type="submit" className="submit-button">
            Register
          </button>
          <p className="error-msg">{errorMsg}</p>
          <button className="link-button" onClick={this.goToLogin}>
            Already Registered?
          </button>
        </form>
      </div>
    );
  }
}
export default Register;
