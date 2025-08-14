import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import HomeFooter from "../HomePage/HomeFooter";
import CampaignSelection from "./Section/CampaignSelection";
import OnGoing from "./Section/OnGoing";
import Ended from "./Section/Ended";
import UpComing from "./Section/Upcoming";


class Campaign extends Component {

    render() {
        return (
            <div>
                <HomeHeader />
                <CampaignSelection />
                <UpComing />
                <OnGoing />
                <Ended />
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

export default connect(mapStateToProps)(Campaign);
