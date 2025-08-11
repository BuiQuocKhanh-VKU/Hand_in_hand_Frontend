//file location: src/containers/Auth/Login.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { withRouter } from "react-router-dom";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errMessage: "",
    };
  }

  handleOnChangeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }
  handleOnChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.email, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        const result = this.props.location.pathname.replace("/login/", "");
        this.props.userLoginSuccess(data.user);
        if (this.props.location.pathname === "/login") {
          this.props.navigate("/home"); //nếu pathname là /login thì chuyển hướng về trang home
        } else {
          this.props.navigate("/detail/" + result); //nếu có id detail thì chuyển hướng về trang detail
        }
      }
    } catch (error) {
      // console.log(error);

      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };
  handleNavigate = (path) => {
    this.props.history.push(path);
  };

  render() {
    return (
      <div className="container mt-5 col-3">
        <div className="main-form">
          <p className="title-form">Login</p>
          <div className="form-group input-with-icon">
            <i className="fas fa-envelope"></i>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your Email"
              value={this.state.email}
              onChange={(event) => this.handleOnChangeEmail(event)}
            />
          </div>
          <div className="form-group input-with-icon">
            <i className="fas fa-lock"></i>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter your Password"
              value={this.state.password}
              onChange={(event) => this.handleOnChangePassword(event)}
            />
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label className="form-check-label" htmlFor="remember">
              Remember me
            </label>
            <a href="#" className=" float-right">
              Forgot password?
            </a>
          </div>
          <div className="col-12" style={{ color: "red" }}>
            {this.state.errMessage}
          </div>
          <button
            type="submit"
            className="btn btn-dark btn-block"
            onClick={() => {
              this.handleLogin();
            }}
          >
            Login{" "}
          </button>
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <a onClick={() => this.handleNavigate("/signup")}>Sign Up</a>
          </p>
          <hr />

          <button className="btn-light col-12">
            <img
              src="https://img.icons8.com/color/20/000000/google-logo.png"
              alt="Google"
            />
            Continue With Google
          </button>
          <button className="btn-light fb col-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="20"
            >
              <path
                fill="#290dfd"
                d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
              />
            </svg>
            Continue With Facebook
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
