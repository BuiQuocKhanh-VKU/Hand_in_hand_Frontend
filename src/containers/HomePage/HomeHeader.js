import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./HomeHeader.scss";
import VN from "../../assets/images/VN.svg";
import UK from "../../assets/images/UK.svg";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";
import { getAllUsers } from "../../services/userService";
class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            user_id: this.props.userInfo ? this.props.userInfo.id : "",
        };
    }
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };
    handleNavigate = (path) => {
        this.props.history.push(path);
    };
    getAllUsersFromReact = async () => {
        let response = await getAllUsers(this.state.user_id);
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    }
    async componentDidMount() {
        if (this.props.isLoggedIn) {
            await this.getAllUsersFromReact();
        }
    }

    render() {
        const { processLogout  } = this.props;
        let arrUsers = this.state.arrUsers;
        return (
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <div className="header-logo"></div>
                    </div>
                    <div className="center-content">
                        {/* <button
                            className={`btn ${  this.props.location.pathname === "/home" ? "active" : ""}`}
                            onClick={() => this.handleNavigate("/home")}
                            //nếu đang ở trang home thì thêm class active

                        >
                            <span>
                                <FormattedMessage id="home-header.home" />
                            </span>
                        </button>
                        <button
                            className={`btn ${  this.props.location.pathname === "/about" ? "active" : ""}`}
                            onClick={() => this.handleNavigate("/about")}
                        >
                            <span>
                                <FormattedMessage id="home-header.about" />
                            </span>
                        </button>
                        <button
                            className={`btn ${  this.props.location.pathname === "/status" ? "active" : ""}`}
                            onClick={() => this.handleNavigate("/status")}
                        >
                            <span>
                                <FormattedMessage id="home-header.status" />
                            </span>
                        </button>
                        <button
                            className={`btn ${  this.props.location.pathname === "/campaign" ? "active" : ""}`}
                            onClick={() => this.handleNavigate("/campaign")}
                        >
                            <span>
                                <FormattedMessage id="home-header.campaign" />
                            </span>
                        </button>
                        <button
                            className={`btn ${  this.props.location.pathname === "/contact" ? "active" : ""}`}
                            onClick={() => this.handleNavigate("/contact")}
                        >
                            <span>
                                <FormattedMessage id="home-header.contact" />
                            </span>
                        </button> */}
                        <div className="dropdown">
                            <button className="dropbtn">
                                <i className="fas fa-globe"></i>
                                <i className="fas fa-caret-down"></i>
                            </button>
                            <div className="dropdown-content">
                                <a
                                    className="VN"
                                    href="#"
                                    onClick={() =>
                                        this.changeLanguage(LANGUAGES.VI)
                                    }
                                >
                                    <img
                                        src={VN}
                                        alt="Vietnam Flag"
                                        style={{
                                            width: "16px",
                                            marginRight: "5px",
                                        }}
                                    />
                                    Tiếng Việt
                                </a>
                                <a
                                    className="EN"
                                    href="#"
                                    onClick={() =>
                                        this.changeLanguage(LANGUAGES.EN)
                                    }
                                >
                                    <img
                                        src={UK}
                                        alt="United Kingdom Flag"
                                        style={{
                                            width: "16px",
                                            marginRight: "5px",
                                        }}
                                    />
                                    English
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="right-content">
                        <button
                            className="btn "
                            // onClick={() => {
                            //     this.handleNavigate("/donate");
                            // }}
                        >
                            <FormattedMessage id="home-header.donate" />
                        </button>

                        {this.props.isLoggedIn === false && (
                            <button
                                className="btn "
                                onClick={() => {
                                    this.handleNavigate("/login");
                                }}
                            >
                                <FormattedMessage id="home-header.login" />
                            </button>
                        )}
                        {this.props.isLoggedIn === true && (
                            <div className="drop-info">
                                <button className="dropbtn">
                                    <i className="fa fa-user" style={{marginRight:"10px"}}></i>
                                    <p>{arrUsers && arrUsers.name
                                        ? arrUsers.name
                                        : ""}</p>
                                    <i className="fas fa-caret-down"></i>
                                </button>
                                <div className="dropdown-content">
                                    {this.props.userInfo &&
                                        this.props.userInfo.role ===
                                            "admin" && (
                                            <a
                                                className="system-manager"
                                                href="#"
                                                onClick={() => {
                                                    this.handleNavigate(
                                                        "/system"
                                                    );
                                                }}
                                            >
                                                <i
                                                    className="fa fa-cog"
                                                    aria-hidden="true"
                                                ></i>
                                                <FormattedMessage id="home-header.system-manager" />
                                            </a>
                                        )}
                                    <a className="account-manager" href="#"
                                    // onClick={() => {
                                    //     this.handleNavigate(
                                    //         "/profile"
                                    //     );
                                    // }}
                                    >
                                        <i
                                            className="fa fa-user"
                                            aria-hidden="true"
                                        ></i>
                                        <FormattedMessage id="home-header.profile" />
                                    </a>
                                    <a
                                        className="logout"
                                        href="#"
                                        onClick={processLogout}
                                    >
                                        <i className="fas fa-sign-out-alt"></i>
                                        <FormattedMessage id="home-header.logout" />
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) =>
            dispatch(changeLanguageApp(language)),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
