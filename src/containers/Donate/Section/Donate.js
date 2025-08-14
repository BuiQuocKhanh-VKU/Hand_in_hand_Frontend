import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./Donate.scss";
import Aoe from "aoejs"; // Import Aoejs
import { withRouter } from "react-router-dom";

// Chuyển trang khi click vào button
const Donate = (props) => {
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

   const handleNavigate = (path, targetScrollTop1) => {
      if (props.history) {
         props.history.push(path, { targetScrollTop1 });
      } else {
         console.error("Chuyển hướng thất bại: Không tìm thấy đối tượng History.");
      }
   };

   return (
      <div className="donate-container">
         <div className="navi"></div>
         <div className="banner-donate">
            <div className="colorbg-donate" data-aoe="fadeIn">
               <div className="colorbg-donate-content">
                  <div className="text">
                     <h1>
                        <span>Giảm carbon của bạn,</span>
                        <span>Đầu tư vào con người,</span>
                        <span>Đầu tư vào thiên nhiên.</span>
                     </h1>
                     <p>
                        Đầu tư vào vườn quốc gia Cúc Phương để phục hồi đất đai và duy trì cộng đồng, nơi đóng góp giảm
                        carbon của bạn sẽ nuôi dưỡng hành tinh và trao quyền cho người dân để hướng tới một tương lai
                        phát triển bền vững.
                     </p>
                     <button className="btn-offset-now" onClick={() => handleNavigate("/product", 1)}>
                        Giảm ngay
                     </button>
                  </div>
               </div>
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

export default withRouter(connect(mapStateToProps)(Donate));
