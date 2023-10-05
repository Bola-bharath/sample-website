import { Component } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errorMsg: "",
  };
  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };
  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    const { history } = this.props;
    history.replace("/");
  };
  onSubmitFailure = (errorMsg) => {
    this.setState({ errorMsg });
  };
  goToRegister = () => {
    const { history } = this.props;
    history.replace("/register");
  };
  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = {
      username,
      password,
    };
    const url = "http://localhost:8000/login/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      const jwtToken = data.jwt_token;
      this.onSubmitSuccess(jwtToken);
    } else {
      const errorMsg = data.error_msg;
      console.log(errorMsg);
      this.onSubmitFailure(errorMsg);
    }
  };

  render() {
    const { errorMsg } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.submitForm}>
          <h1 className="login-heading">Login</h1>
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="input"
            placeholder="Enter Your Name"
            onChange={this.onChangeUsername}
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="input"
            placeholder="Enter Your Password"
            onChange={this.onChangePassword}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="error-msg">{errorMsg}</p>
          <button className="link" onClick={this.goToRegister}>
            Not registered yet?
          </button>
        </form>
      </div>
    );
  }
}
export default Login;
