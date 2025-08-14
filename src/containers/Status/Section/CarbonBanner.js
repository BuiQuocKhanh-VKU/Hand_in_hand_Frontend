import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./CarbonBanner.scss";
import Aoe from "aoejs"; // Import Aoejs

const CarbonBanner = () => {
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
         speed: 1500,
         delay: 0,
         timingFunction: "linear",
      });

      // Clean-up để ngắt kết nối observers khi component unmount
      return () => {
         aoe.disconnectObservers();
      };
   }, []); // Chạy sau khi component render lần đầu tiên

   return (
      <div className="carbon-banner-container">
         <div className="carbon-banner">
            <h1 data-aoe="fadeIn">Lượng khí thải carbon tại Việt Nam</h1>
            <p data-aoe="fadeIn">
               Trong những năm gần đây, cùng với sự công nghiệp hóa và đô thị hóa nhanh chóng, Việt Nam được báo cáo là
               một trong những quốc gia có lượng khí thải nhà kính tăng nhanh nhất ở Đông Nam Á. Các nguồn phát thải
               chính bao gồm các ngành công nghiệp, năng lượng, giao thông và nông nghiệp, với việc sử dụng nhiên liệu
               hóa thạch như than, dầu và khí tự nhiên vẫn chiếm tỷ lệ lớn.
            </p>
            <p data-aoe="fadeIn">
               Mặc dù Việt Nam đã cam kết đạt được mục tiêu trung hòa carbon vào năm 2050 tại Hội nghị COP26, nhưng vẫn
               còn nhiều thách thức trong việc chuyển đổi sang các nguồn năng lượng tái tạo, cải thiện hiệu quả năng
               lượng, và giảm phát thải trong sản xuất.
            </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(CarbonBanner);
