import { React, useEffect } from "react";
import { connect } from "react-redux";
import ReactECharts from "echarts-for-react";
import "./CarbonChart.scss";
import Aoe from "aoejs"; // Import Aoejs

const CarbonChart = () => {
   const colors = ["#5470C6", "#EE6666"];

   // Cấu hình biểu đồ ECharts
   const option = {
      color: colors,
      tooltip: {
         trigger: "none",
         axisPointer: {
            type: "cross",
         },
      },
      legend: {},
      grid: {
         top: 70,
         bottom: 50,
      },
      xAxis: [
         {
            type: "category",
            axisTick: {
               alignWithLabel: true,
            },
            axisLine: {
               onZero: false,
               lineStyle: {
                  color: colors[1],
               },
            },
            axisPointer: {
               label: {
                  formatter: function (params) {
                     return (
                        "Lượng mưa " + params.value + (params.seriesData.length ? "：" + params.seriesData[0].data : "")
                     );
                  },
               },
            },
            // prettier-ignore
            data: ['2024-1', '2024-2', '2024-3', '2024-4', '2024-5', '2024-6', '2024-7', '2024-8', '2024-9', '2024-10', '2024-11', '2024-12'],
         },
         {
            type: "category",
            axisTick: {
               alignWithLabel: true,
            },
            axisLine: {
               onZero: false,
               lineStyle: {
                  color: colors[0],
               },
            },
            axisPointer: {
               label: {
                  formatter: function (params) {
                     return (
                        "Lượng mưa " + params.value + (params.seriesData.length ? "：" + params.seriesData[0].data : "")
                     );
                  },
               },
            },
            // prettier-ignore
            data: ['2023-1', '2023-2', '2023-3', '2023-4', '2023-5', '2023-6', '2023-7', '2023-8', '2023-9', '2023-10', '2023-11', '2023-12'],
         },
      ],
      yAxis: [
         {
            type: "value",
            name: "Phát thải",
            axisLabel: {
               formatter: "{value} tấn", // Thêm đơn vị vào nhãn
            },
            min: 9, // Giá trị tối thiểu
            max: 13, // Giá trị tối đa
         },
      ],
      series: [
         {
            name: "(2023)",
            type: "line",
            xAxisIndex: 1,
            smooth: true,
            emphasis: {
               focus: "series",
            },
            data: [10.5, 9.8, 11.2, 10.9, 11.5, 12.0, 11.8, 12.3, 11.7, 12.1, 11.9, 12.4],
         },
         {
            name: "(2024)",
            type: "line",
            smooth: true,
            emphasis: {
               focus: "series",
            },
            data: [10.7, 9.9, 11.4, 11.0, 11.6, 12.2, 12.0, 12.5, 11.8, 12.3, 12.0, 12.6],
         },
      ],
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
      <div className="chart-container">
         <div className="filter">
            <div className="chart-content" data-aoe="popInBottom">
               <h2>Biểu đồ khí thải carbon 2024 và 2025</h2>
               <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
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

export default connect(mapStateToProps)(CarbonChart);
