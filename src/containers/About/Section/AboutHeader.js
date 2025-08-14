import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl"; //đa ngôn ngữ

class AboutHeader extends Component {
   render() {
      return (
         <div className="about-container">
            <div className="transparent"></div>
            <div className="about-banner">
               <div className="content-up">
                  <h1>Hand in Hand</h1>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   //lấy biến thông qua state
   return {
      isLoggedIn: state.user.isLoggedIn,
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   //fire action event của redux
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutHeader); //bộc 2 lớp dữ liệu từ store ra ngoài, kết nối redux với react
