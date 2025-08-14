import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./DonateLarge.scss"; // Đảm bảo đường dẫn này chính xác
import Aoe from "aoejs"; // Import Aoejs
import { withRouter } from "react-router-dom"; // Để điều hướng

const DonateLarge = (props) => {
   useEffect(() => {
      // Khởi tạo Aoe.js để áp dụng hiệu ứng khi cuộn trang
      const aoe = new Aoe();
      aoe.init({
         attributes: {
            dataset: "data-aoe", // Áp dụng hiệu ứng sử dụng thuộc tính này
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

      // Hàm clean-up để ngắt kết nối observer khi component bị unmount
      return () => {
         aoe.disconnectObservers();
      };
   }, []); // Chạy một lần sau lần render đầu tiên

   const handleNavigate = (path) => {
      if (props.history) {
         props.history.push(path); // Điều hướng đến path
      } else {
         console.error("Điều hướng thất bại: Lịch sử không có sẵn.");
      }
   };

   return (
      <div className="donateLarge-container">
         <div className="donateLarge-content" data-aoe="driveInBottom">
            <div className="donateLarge-content-left">
               <div className="donateLarge-content-left-top">
                  <h1>Cùng chúng tôi chung tay nhé!</h1>
               </div>
               <div className="donateLarge-content-left-center">
                  <p>
                     Hỗ trợ Hand in Hand thông qua đóng góp có nghĩa là bạn đang trực tiếp đóng góp vào việc mở rộng đội
                     ngũ đầy nhiệt huyết của chúng tôi và phát triển các dự án có ảnh hưởng lớn hơn. Sự hỗ trợ hào phóng
                     của bạn giúp chúng tôi vượt qua việc bù đắp carbon; nó củng cố nền tảng của chúng tôi, cho phép
                     chúng tôi đổi mới, tiếp cận và tạo ra các giải pháp môi trường bền vững lâu dài. Mỗi đóng góp giúp
                     chúng tôi xây dựng năng lực, đảm bảo rằng chúng tôi có thể tiếp tục công việc quan trọng trong việc
                     bảo vệ hệ sinh thái, trao quyền cho cộng đồng và thúc đẩy thay đổi lớn hướng tới một tương lai bền
                     vững. Tham gia vào sứ mệnh này — đóng góp của bạn có thể tạo ra sự khác biệt thực sự.
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
