import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import HomeFooter from "../HomePage/HomeFooter";
import "./OurProduct.scss";
import Product from "./Section/Product";
import CucPhuong from "./Section/CucPhuong";
import YellowPlan from "./Section/YellowPlan";
import OrangePlan from "./Section/OrangePlan";
import GreenPlan from "./Section/GreenPlan";

class OurProduct extends Component {
   render() {
      return (
         <div>
            <HomeHeader />

            <Product />

            <CucPhuong />

            <YellowPlan />

            <OrangePlan />

            <GreenPlan />

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

export default connect(mapStateToProps)(OurProduct);
