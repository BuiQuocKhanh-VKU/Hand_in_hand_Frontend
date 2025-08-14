import { React, useEffect, useState } from "react";
import { connect } from "react-redux";
import ReactECharts from "echarts-for-react";
import "./GarbageChart.scss";
import Aoe from "aoejs"; // Import Aoejs

const GarbageChart = () => {
   // Dữ liệu cho các loại rác thải
   const wasteData = [
      { name: "Rác hộ gia đình", value: 28000000, color: "#359381" },
      { name: "Rác công nghiệp", value: 8000000, color: "#6AA5A9" },
      { name: "Rác y tế", value: 1000000, color: "#5a8869" },
      { name: "Rác xây dựng", value: 5000000, color: "#18433C" },
   ];

   // Tổng lượng rác thải
   const totalWaste = wasteData.reduce((sum, item) => sum + item.value, 0);
   // Trạng thái hiển thị cho từng loại rác thải
   const [selectedCategories, setSelectedCategories] = useState(
      wasteData.map((_, idx) => true) // Mặc định hiển thị tất cả
   );
   // Lọc dữ liệu theo trạng thái hiển thị
   const filteredData = wasteData.filter((_, idx) => selectedCategories[idx]);

   // Cấu hình biểu đồ tròn ECharts
   const option = {
      tooltip: {
         trigger: "item",
         formatter: "{b}: {d}% ({c} tấn)", // Hiển thị tên loại, tỷ lệ phần trăm và lượng rác thải
      },
      series: [
         {
            name: "Loại rác",
            type: "pie",
            radius: "50%",
            data: filteredData.map((item) => ({
               name: item.name,
               value: item.value,
               itemStyle: { color: item.color }, // Màu sắc của từng phân đoạn
               percentage: ((item.value / totalWaste) * 100).toFixed(2), // Tính tỷ lệ phần trăm
            })),
            emphasis: {
               itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
               },
            },
            label: {
               formatter: "{b}: {d}%", // Hiển thị tên và tỷ lệ phần trăm
            },
            // Sử dụng padAngle để tạo khoảng cách giữa các phân đoạn
            padding: 10,
            padAngle: 3,
            itemStyle: {
               borderRadius: 8, // Bo tròn các phân đoạn
            },
         },
      ],
   };

   // Hàm xử lý khi nhấn vào nút legend
   const toggleCategory = (index) => {
      const updatedCategories = [...selectedCategories];
      updatedCategories[index] = !updatedCategories[index];
      setSelectedCategories(updatedCategories);
   };

   // Hook useEffect để khởi tạo Aoejs
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
      <div className="garbage-container">
         <div className="chart-content">
            <div className="left-content" data-aoe="hitLeft">
               <div className="household" onClick={() => toggleCategory(0)}>
                  <a>Rác hộ gia đình</a>
                  <button className="btn">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        id="1307318704"
                        className="svg u_1307318704"
                        data-icon-name="general_paw_print"
                     >
                        <path d="M44.79,78.81c-2.09.36-4.2.62-6.27,1.09-4.53,1-8.61.38-11.38-3.57-3-4.26-3.24-9.24-.24-13.3A155.84,155.84,0,0,1,42.06,45.36c4.81-4.81,11.73-3.6,15.84,2.38,3.86,5.62,7.39,11.49,10.85,17.37,2.89,4.92,3,10-.75,14.54S59.7,83.23,55,81.27C51.78,79.9,48.49,78.54,44.79,78.81Z"></path>
                        <path d="M69.06,29.26C69,35.61,64.92,42,60.6,41.53c-6.15-.62-7-5.49-7-10.47,0-6.75,4-12.1,8.64-11.9C66.12,19.33,69.07,23.69,69.06,29.26Z"></path>
                        <path d="M48.43,30.35c-.33,3.8-.9,8.49-6.7,9.21-4.46.56-8.67-5.3-8.56-11.92.09-4.88,1-9.86,7.12-10.47C44.61,16.74,48.45,23,48.43,30.35Z"></path>
                        <path d="M66.56,49.82c0-6.68,4.71-12.46,9.4-12.06,4.53.39,5.68,3.75,5.76,7.52.12,5.88-4.76,11.63-9.45,11.26S66.72,52.89,66.56,49.82Z"></path>
                        <path d="M18.28,39.62c.26-3.19,1.44-6.77,6.33-6.85,4.32-.07,8.37,5.91,8.17,11.69-.14,4.1-1.24,7.72-6.29,7.69C22.1,52.15,18.14,46.36,18.28,39.62Z"></path>
                     </svg>
                  </button>
               </div>
               <div className="industrial" onClick={() => toggleCategory(1)}>
                  <a>Rác công nghiệp</a>
                  <button className="btn">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        id="1307318704"
                        className="svg u_1307318704"
                        data-icon-name="general_paw_print"
                     >
                        <path d="M44.79,78.81c-2.09.36-4.2.62-6.27,1.09-4.53,1-8.61.38-11.38-3.57-3-4.26-3.24-9.24-.24-13.3A155.84,155.84,0,0,1,42.06,45.36c4.81-4.81,11.73-3.6,15.84,2.38,3.86,5.62,7.39,11.49,10.85,17.37,2.89,4.92,3,10-.75,14.54S59.7,83.23,55,81.27C51.78,79.9,48.49,78.54,44.79,78.81Z"></path>
                        <path d="M69.06,29.26C69,35.61,64.92,42,60.6,41.53c-6.15-.62-7-5.49-7-10.47,0-6.75,4-12.1,8.64-11.9C66.12,19.33,69.07,23.69,69.06,29.26Z"></path>
                        <path d="M48.43,30.35c-.33,3.8-.9,8.49-6.7,9.21-4.46.56-8.67-5.3-8.56-11.92.09-4.88,1-9.86,7.12-10.47C44.61,16.74,48.45,23,48.43,30.35Z"></path>
                        <path d="M66.56,49.82c0-6.68,4.71-12.46,9.4-12.06,4.53.39,5.68,3.75,5.76,7.52.12,5.88-4.76,11.63-9.45,11.26S66.72,52.89,66.56,49.82Z"></path>
                        <path d="M18.28,39.62c.26-3.19,1.44-6.77,6.33-6.85,4.32-.07,8.37,5.91,8.17,11.69-.14,4.1-1.24,7.72-6.29,7.69C22.1,52.15,18.14,46.36,18.28,39.62Z"></path>
                     </svg>
                  </button>
               </div>
            </div>
            <div className="center-content">
               <h2>Tỷ lệ phần trăm các loại rác thải khác nhau tại Việt Nam.</h2>
               <div data-aoe="ball" style={{ height: "600px", width: "100%" }}>
                  <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
               </div>
            </div>
            <div className="right-content" data-aoe="hitRight">
               <div className="medical" onClick={() => toggleCategory(2)}>
                  <button className="btn">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        id="1307318704"
                        className="svg u_1307318704"
                        data-icon-name="general_paw_print"
                     >
                        <path d="M44.79,78.81c-2.09.36-4.2.62-6.27,1.09-4.53,1-8.61.38-11.38-3.57-3-4.26-3.24-9.24-.24-13.3A155.84,155.84,0,0,1,42.06,45.36c4.81-4.81,11.73-3.6,15.84,2.38,3.86,5.62,7.39,11.49,10.85,17.37,2.89,4.92,3,10-.75,14.54S59.7,83.23,55,81.27C51.78,79.9,48.49,78.54,44.79,78.81Z"></path>
                        <path d="M69.06,29.26C69,35.61,64.92,42,60.6,41.53c-6.15-.62-7-5.49-7-10.47,0-6.75,4-12.1,8.64-11.9C66.12,19.33,69.07,23.69,69.06,29.26Z"></path>
                        <path d="M48.43,30.35c-.33,3.8-.9,8.49-6.7,9.21-4.46.56-8.67-5.3-8.56-11.92.09-4.88,1-9.86,7.12-10.47C44.61,16.74,48.45,23,48.43,30.35Z"></path>
                        <path d="M66.56,49.82c0-6.68,4.71-12.46,9.4-12.06,4.53.39,5.68,3.75,5.76,7.52.12,5.88-4.76,11.63-9.45,11.26S66.72,52.89,66.56,49.82Z"></path>
                        <path d="M18.28,39.62c.26-3.19,1.44-6.77,6.33-6.85,4.32-.07,8.37,5.91,8.17,11.69-.14,4.1-1.24,7.72-6.29,7.69C22.1,52.15,18.14,46.36,18.28,39.62Z"></path>
                     </svg>
                  </button>
                  <a>Rác y tế</a>
               </div>
               <div className="construction" onClick={() => toggleCategory(3)}>
                  <button className="btn">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        id="1307318704"
                        className="svg u_1307318704"
                        data-icon-name="general_paw_print"
                     >
                        <path d="M44.79,78.81c-2.09.36-4.2.62-6.27,1.09-4.53,1-8.61.38-11.38-3.57-3-4.26-3.24-9.24-.24-13.3A155.84,155.84,0,0,1,42.06,45.36c4.81-4.81,11.73-3.6,15.84,2.38,3.86,5.62,7.39,11.49,10.85,17.37,2.89,4.92,3,10-.75,14.54S59.7,83.23,55,81.27C51.78,79.9,48.49,78.54,44.79,78.81Z"></path>
                        <path d="M69.06,29.26C69,35.61,64.92,42,60.6,41.53c-6.15-.62-7-5.49-7-10.47,0-6.75,4-12.1,8.64-11.9C66.12,19.33,69.07,23.69,69.06,29.26Z"></path>
                        <path d="M48.43,30.35c-.33,3.8-.9,8.49-6.7,9.21-4.46.56-8.67-5.3-8.56-11.92.09-4.88,1-9.86,7.12-10.47C44.61,16.74,48.45,23,48.43,30.35Z"></path>
                        <path d="M66.56,49.82c0-6.68,4.71-12.46,9.4-12.06,4.53.39,5.68,3.75,5.76,7.52.12,5.88-4.76,11.63-9.45,11.26S66.72,52.89,66.56,49.82Z"></path>
                        <path d="M18.28,39.62c.26-3.19,1.44-6.77,6.33-6.85,4.32-.07,8.37,5.91,8.17,11.69-.14,4.1-1.24,7.72-6.29,7.69C22.1,52.15,18.14,46.36,18.28,39.62Z"></path>
                     </svg>
                  </button>
                  <a>Rác xây dựng</a>
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

export default connect(mapStateToProps)(GarbageChart);
