import React, { useEffect, useRef } from "react";
import { connect } from "react-redux"; // Kết nối Redux
import { withRouter } from "react-router-dom"; // Điều hướng
import { FormattedMessage } from "react-intl"; // Đa ngôn ngữ
import Aoe from "aoejs"; // Import Aoejs
import "./WhoAreGP.scss";

const WhoAreGP = (props) => {
   useEffect(() => {
      // Khởi tạo Aoe
      const aoe = new Aoe();
      aoe.init({
         attributes: {
            dataset: "data-aoe", // Chỉ định thuộc tính `data-aoe` để áp dụng hiệu ứng
            delay: "data-aoe-delay",
            speed: "data-aoe-speed",
         },
         observerRoot: null,
         observeRootMargin: "0px",
         observeRootThreshold: [0, 0.5, 0.75, 1],
         intersectionRatio: 0.5,
         once: false,
         speed: 1000,
         delay: 0,
         timingFunction: "linear",
      });

      // Clean-up để ngắt kết nối observers khi component unmount
      return () => {
         aoe.disconnectObservers();
      };
   }, []); // Chạy sau khi component render lần đầu tiên

   const handleNavigate = (path) => {
      if (props.history) {
         props.history.push(path);
      } else {
         console.error("Navigation failed: History object is not available.");
      }
   };

   return (
      <div className="WhoAreGP">
         <div className="WhoAreGP-content">
            <div className="WhoAreGP-content-left" data-aoe="pullRight">
               <div className="left-content">
                  <div className="paragraph-top">
                     <h1>Hand in Hand?</h1>
                  </div>
                  <div className="paragraph-bottom">
                     <p>
                        Hand in Hand là một phần của tổ chức từ thiện đã đăng ký Viet-Han Project, do Nghĩa và Khánh
                        sáng lập. Hand in Hand là một nền tảng giúp mọi người và các tổ chức trở thành trung hòa carbon
                        và bảo vệ hệ thống oxy của hành tinh. Hand in Hand hợp tác với các dự án sử dụng các nguyên tắc
                        thiết kế sinh thái để tái tạo các hệ sinh thái hoàn chỉnh, đưa chúng trở lại trạng thái sinh
                        thái đa dạng và phát triển, đồng thời hỗ trợ cộng đồng địa phương, các bộ tộc bản địa và các dân
                        tộc truyền thống.
                     </p>

                     <button type="submit" className="btn btn-donate" onClick={() => handleNavigate("/donate")}>
                        Donate
                     </button>
                  </div>
               </div>
            </div>
            <div className="WhoAreGP-content-right" data-aoe="pullRight">
               <div className="right-content"></div>
            </div>
         </div>
      </div>
   );
};

// Kết nối với Redux
const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

// Sử dụng connect và withRouter
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WhoAreGP));
