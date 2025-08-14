import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated} from '../hoc/authentication';
import CustomScrollbars from '../components/CustomScrollbars.js';
import withCustomScrollbar from '../hoc/withNoCustomScrollbar';
import { path } from '../utils'

import Home from '../routes/Home';
import Signup from './Auth/Signup.js';
import Login from './Auth/Login';
import Header from './Header/Header';
import System from '../routes/System';
import HomePage from './HomePage/HomePage.js'; 

import AboutUs from './About/AboutUs.js';
import ContactUs from './Contact/ContactUs.js';
import Campaign from './Campaign/CampaignPage.js';

import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <BrowserRouter history={history}>
                    <div className="main-container" style={{fontFamily: "futura bt"}}>
                        <ConfirmModal />
                        {this.props.isLoggedIn && <Header />}

                        <div className="content-container">
                                <CustomScrollbars style ={{height: '100vh', width: '100%'}}>
                            <Switch>
                                <Route path={path.HOME} exact component={(Home)} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.SIGNUP} component={withCustomScrollbar(Signup)} />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                <Route path={path.HOMEPAGE} component={withCustomScrollbar(HomePage)} />
                                <Route path={path.ABOUT_US} component={withCustomScrollbar(AboutUs)} />
                                <Route path={path.CONTACT_US} component={withCustomScrollbar(ContactUs)} />
                                <Route path={path.CAMPAIGN} component={withCustomScrollbar(Campaign)} />

                            </Switch>
                              </CustomScrollbars>
                        </div>

                        <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        />
                    </div>
                </BrowserRouter>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
     started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        isAdmin: state.user.isAdmin
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);