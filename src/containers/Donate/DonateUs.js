import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import HomeFooter from "../HomePage/HomeFooter";
import Donate from "./Section/Donate";
import DonnateLarge from "./Section/DonnateLarge";
import DonateSmall from "./Section/DonateSmall";

class DonateUs extends Component {
    render() {
        return (
            <div>
                <HomeHeader />

                <Donate />

                <DonnateLarge />

                <DonateSmall />

                <HomeFooter />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

export default connect(mapStateToProps)(DonateUs);
