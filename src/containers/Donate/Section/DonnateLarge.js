import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./DonateLarge.scss";
import Aoe from "aoejs"; // Import Aoejs
import { withRouter } from "react-router-dom"; // Điều hướng

const DonateLarge = (props) => {
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
         speed: 800,
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
         console.error("Chuyển hướng thất bại: Không tìm thấy đối tượng History.");
      }
   };

   return (
      <div className="donateLarge-container">
         <div className="donateLarge-content" data-aoe="driveInBottom">
            <div className="donateLarge-content-left">
               <div className="donateLarge-content-left-top">
                  <h1>Giúp chúng tôi xây dựng Greenpaw</h1>
               </div>
               <div className="donateLarge-content-left-center">
                  <p>
                     Hỗ trợ Hand in Hand bằng một khoản quyên góp có nghĩa là bạn đang đóng góp trực tiếp vào việc mở
                     rộng đội ngũ nhiệt huyết của chúng tôi và phát triển thêm các dự án có tác động lớn hơn. Sự hỗ trợ
                     hào phóng của bạn giúp chúng tôi vượt ra ngoài việc bù đắp carbon; nó củng cố nền tảng của chúng
                     tôi, cho phép chúng tôi đổi mới, tiếp cận và tạo ra các giải pháp môi trường bền vững lâu dài. Mỗi
                     khoản quyên góp giúp chúng tôi xây dựng năng lực, đảm bảo rằng chúng tôi có thể tiếp tục công việc
                     quan trọng của mình trong việc bảo vệ các hệ sinh thái, trao quyền cho cộng đồng và thúc đẩy sự
                     thay đổi quan trọng hướng tới một tương lai bền vững. Hãy tham gia vào sứ mệnh này — khoản quyên
                     góp của bạn có thể tạo ra sự khác biệt thực sự.
                  </p>
               </div>
               <div className="donateLarge-content-left-under">
                  <button className="btn-donateLarge" onClick={() => handleNavigate("/campaign")}>
                     THAM GIA NGAY
                  </button>
               </div>
            </div>
            <div className="donateLarge-content-right">
               <div className="parrot-image"></div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DonateLarge));
