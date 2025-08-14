import React, { useEffect, useRef } from "react";
import { connect } from "react-redux"; // Kết nối Redux
import Aoe from "aoejs"; // Import Aoejs
import "./WhyYouSupport.scss";

const WhyYouSupport = (props) => {
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

   return (
      <div className="WhyYouSupport" data-aoe="ball">
         <div className="WhyYouSupport-container">
            <div className="WhyYouSupport-bg">
               <div className="content-top">
                  <h3>Tại sao bạn nên tham gia?</h3>
                  <div className="logo"></div>
               </div>
               <div className="content-down">
                  <p>
                     Đối mặt với thách thức khẩn cấp toàn cầu về biến đổi khí hậu, Hand in Hand nổi bật với chiến lược
                     tái tạo toàn diện. Bên cạnh việc giảm carbon truyền thống, chúng tôi kết hợp các chỉ số cô lập tiên
                     tiến với các sáng kiến thúc đẩy an ninh lương thực, phục hồi thiên nhiên mạnh mẽ và ổn định kinh tế
                     xã hội. Hệ thống đánh giá tỉ mỉ của chúng tôi bao gồm nhiều lĩnh vực, từ giảm phát thải carbon đến
                     bảo tồn đa dạng sinh học và làm giàu cộng đồng. <br />
                     Mỗi dự án trong danh mục tái tạo của Hand in Hand đều trải qua quá trình đánh giá tác động môi
                     trường và xã hội nghiêm ngặt, nhấn mạnh cam kết của chúng tôi đối với một tương lai bền vững hơn,
                     minh bạch và phục hồi sinh thái; đưa chúng tôi trở thành những người tiên phong trong lĩnh vực phát
                     triển bền vững chuyển hóa và nâng cao cộng đồng.
                  </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(WhyYouSupport);
