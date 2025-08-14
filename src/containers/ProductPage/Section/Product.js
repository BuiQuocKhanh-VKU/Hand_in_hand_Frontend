import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"; // Import withRouter HOC
import "./Product.scss";
import Aoe from "aoejs"; // Import Aoejs

const Product = (props) => {
   // Hàm chuyển trang
   const handleNavigate = (path) => {
      if (props.history) {
         props.history.push(path); // Dùng props.history.push để chuyển trang
      } else {
         console.error("Navigation failed: History object is not available.");
      }
   };

   return (
      <div className="Product-container">
         <div className="navi"></div>
         <div className="find-cart">
            <div className="find">
               <div className="search">
                  <i className="fas fa-search"></i>
                  <input type="text" placeholder="Finding product"></input>
               </div>
            </div>
            <div className="cart" onClick={() => handleNavigate("/checkout")}>
               <i className="fas fa-shopping-cart"></i>
            </div>
         </div>
      </div>
   );
};

// Map state to props nếu cần
const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
      language: state.app.language,
   };
};

// Map dispatch to props nếu cần
const mapDispatchToProps = (dispatch) => {
   return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));
