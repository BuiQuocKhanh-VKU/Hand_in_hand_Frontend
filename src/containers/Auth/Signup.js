//file location: src/containers/Auth/Signup.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { emitter } from "../../utils/emitter";
import { createNewUserService } from "../../services/userService";
import "./Signup.scss";
import { FormattedMessage } from "react-intl";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            phone: "",
            name: "",
            address: "",
        };
        this.listenToEmitter();
    }
    listenToEmitter = () => {
        emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
            this.setState({
                email: "",
                password: "",
                phone: "",
                name: "",
                address: "",
            });
        });
    };
    handleOnChangeInput = (event, id) => {
        //good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ["email", "password", "phone", "name", "address"];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing parameter: " + arrInput[i]);
                break;
            }
        }
        return isValid;
    };
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.createNewUser(this.state);
            alert("Create new user successfully!");
            this.handleNavigate("/login");
        }
    };
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
        } catch (error) {
            console.log("createNewUser error: ", error);
        }
    };
    handleNavigate = (path) => {
        this.props.history.push(path);
    };
    render() {
        return (
            <div className="container mt-5 col-3">
                <div className="main-form">
                    <p className="title-form">Signup</p>
                    <div className="form-group input-with-icon">
                        <i className="fas fa-envelope"></i>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter your Email"
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "email")
                            }
                            value={this.state.email}
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
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "password")
                            }
                            value={this.state.password}
                        />
                    </div>
                    <div className="form-group input-with-icon">
                        <i class="fa fa-user"></i>
                        <label htmlFor="text">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Enter your Name"
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "name")
                            }
                            value={this.state.name}
                        />
                    </div>
                    <div className="form-group input-with-icon">
                        <i class="fas fa-map-marker-alt"></i>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            placeholder="Enter your Address"
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "address")
                            }
                            value={this.state.address}
                        />
                    </div>
                    <div className="form-group input-with-icon">
                    <i class="fas fa-phone"></i>
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            placeholder="Enter your Phone"
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "phone")
                            }
                            value={this.state.phone}
                        />
                    </div>
                    <div className="col-12" style={{ color: "red" }}>
                        {this.state.errMessage}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-dark btn-block"
                        onClick={() => this.handleAddNewUser()}
                        
                    >
                        Signup{" "}
                    </button>
                    <p className="text-center mt-3">
                        Have an account?{" "}
                        <a onClick={() => this.handleNavigate("/login")}>
                            Login
                        </a>
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
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
