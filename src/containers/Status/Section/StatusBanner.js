import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./StatusBanner.scss";

const StatusBanner = () => {
   return (
      <div className="status-banner-container">
         <div className="transparent"></div>
         <div className="status-banner-content">
            <div className="gradient">
               <h1>Trạng thái</h1>
               <p>Tình trạng hiện tại của các môi trường sống của động vật hoang dã ở Việt Nam</p>
            </div>
         </div>
      </div>
   );
};

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusBanner);
