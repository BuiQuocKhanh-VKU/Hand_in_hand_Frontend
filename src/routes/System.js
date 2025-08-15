import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { userIsAdmin } from "../hoc/authentication";
import Header from "../containers/Header/Header";

import Statistical from "../containers/System/Statistical";
import UserManage from "../containers/System/UserManage";
import CampaignManage from "../containers/System/CampaignManage";
import PartnerManage from "../containers/System/PartnerManage";
import CampaignDonationManage from "../containers/System/CampaignDonationManage";
import ProductManage from "../containers/System/Donation/ProductManage";
import CartManage from "../containers/System/Donation/CartManage";
import DonationManage from "../containers/System/Donation/DonationManage";

class System extends Component {
   render() {
      const { systemMenuPath, isLoggedIn } = this.props;
      return (
         <React.Fragment>
            {isLoggedIn && <Header />}
            <div className="system-container" style={{ fontFamily: "Helvetica" }}>
               <div className="system-list">
                  <Switch>
                     <Route
                        path="/system/statistical"
                        component={userIsAdmin(Statistical)} // Sử dụng HOC
                     />
                     <Route
                        path="/system/user-manage"
                        component={userIsAdmin(UserManage)} // Sử dụng HOC
                     />
                     <Route
                        path="/system/campaign-manage"
                        component={userIsAdmin(CampaignManage)} // Sử dụng HOC
                     />
                     <Route
                        path="/system/partner-manage"
                        component={userIsAdmin(PartnerManage)} // Sử dụng HOC
                     />
                     <Route
                        path="/system/campaign-donation-manage"
                        component={userIsAdmin(CampaignDonationManage)} // Sử dụng HOC
                     />
                     <Route
                        path="/system/product-manage"
                        component={userIsAdmin(ProductManage)} // Sử dụng HOC
                     />
                     <Route path="/system/cart-manage" component={userIsAdmin(CartManage)} />
                     <Route
                        path="/system/donation-manage"
                        component={userIsAdmin(DonationManage)} // Sử dụng HOC
                     />

                     <Route
                        component={() => {
                           return <Redirect to={systemMenuPath} />;
                        }}
                     />
                  </Switch>
               </div>
            </div>
         </React.Fragment>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      systemMenuPath: state.app.systemMenuPath,
      isLoggedIn: state.user.isLoggedIn,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
