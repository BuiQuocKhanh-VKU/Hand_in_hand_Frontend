import React, { useEffect, useRef } from "react";
import { connect } from "react-redux"; // Kết nối Redux
import { withRouter } from "react-router-dom"; // Điều hướng
import { FormattedMessage } from "react-intl"; // Đa ngôn ngữ
import Aoe from "aoejs"; // Import Aoejs
import "./StartYourCacbon.scss";

const StartYourCacbon = (props) => {
   const handleCalculateNowClick = (path) => {
      if (props.history) {
         props.history.push(path);
      } else {
         console.error("Navigation failed: History object is not available.");
      }
   };

   const handleNavigate = (path) => {
      if (props.history) {
         props.history.push(path);
      } else {
         console.error("Navigation failed: History object is not available.");
      }
   };

   return (
      <div className="StartYourCacbon-container">
         <div className="StartYourCacbon-content">
            <div className="StartYourCacbon-content-top">
               <div className="StartYourCacbon-content-top-content">
                  <p>Hãy bắt đầu trung hòa lượng carbon của bạn ngay hôm nay</p>
               </div>
            </div>
            <div className="StartYourCacbon-content-bottom">
               <div className="StartYourCacbon-content-bottom-content">
                  <div className="StartYourCacbon-content-bottom-content-left">
                     <div className="icon"></div>
                     <div className="start-title">
                        <p>Hãy tính toán lượng carbon của bạn ngay bây giờ</p>
                     </div>
                     <div className="paragraph">
                        <span>
                           Sử dụng công cụ của chúng tôi để tính toán dấu vết carbon của bạn, doanh nghiệp hoặc gia đình
                           bạn.
                        </span>
                     </div>
                     <button className="calculate-now" onClick={() => handleCalculateNowClick("/status")}>
                        Tính Toán Ngay
                     </button>
                  </div>
                  <div className="StartYourCacbon-content-bottom-content-center">
                     <div className="icon"></div>
                     <div className="start-title">
                        <p>Gói hồi phục Carbon Hàng Tháng</p>
                     </div>
                     <div className="paragraph">
                        <p>
                           Bạn muốn cân bằng lượng khí thải carbon của mình bằng cách thanh toán hàng tháng cho bản
                           thân, doanh nghiệp hoặc gia đình?
                        </p>
                     </div>
                     <button className="see-plan" onClick={() => handleNavigate("/campaign")}>
                        Xem Gói
                     </button>
                  </div>
                  <div className="StartYourCacbon-content-bottom-content-right">
                     <div className="icon"></div>
                     <div className="start-title">
                        <p>Cần chuyên gia tư vấn?</p>
                     </div>
                     <div className="paragraph">
                        <p>
                           Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn. Bạn sẽ luôn tìm
                           thấy sự trợ giúp bạn cần.
                        </p>
                     </div>
                     <button className="contact-us" onClick={() => handleNavigate("/contact")}>
                        Liên Hệ Với Chúng Tôi
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StartYourCacbon));
