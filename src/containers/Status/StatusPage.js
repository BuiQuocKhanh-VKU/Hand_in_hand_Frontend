import React, { Component } from "react";
import { connect } from "react-redux";
import StatusBanner from "./Section/StatusBanner";
import CarbonBanner from "./Section/CarbonBanner";
import HomeHeader from "../HomePage/HomeHeader";
import HomeFooter from "../HomePage/HomeFooter";
import Chart from "./Section/CarbonChart";
import Forest from "./Section/Forest";
import GarbageBanner from "./Section/GarbageBanner";
import GarbageChart from "./Section/GarbageChart";

class Status extends Component {
  render() {
    return (
      <div>
        <HomeHeader />
        <StatusBanner />
        <CarbonBanner />
        <Chart />
        <Forest />
        <GarbageBanner />
        <GarbageChart/>
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

export default connect(mapStateToProps)(Status);
