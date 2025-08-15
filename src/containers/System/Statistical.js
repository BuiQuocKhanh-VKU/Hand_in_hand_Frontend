import React, { Component } from "react";
import { connect } from "react-redux";
import "./Statistical.scss";
import ReactECharts from "echarts-for-react";
import { getCampaignStatusCounts } from "../../services/campaignService";
import { getAllCampaignDonations } from "../../services/campaignDonationService";
import { getDonationsCountForCurrentWeek } from "../../services/donationService";
import { getAllDonations } from "../../services/donationService";

class Statistical extends Component {
   constructor(props) {
      super(props);
      this.state = {
         status_count: [],
         donations_per_week: [],
         total_donation: 0,
         total_donation_amount: 0,
         total_campaign: 0,
         total_campaign_amount: 0,
      };
   }

   componentDidMount() {
      this.handleGetCampaignStatusCounts();
      this.handleGetAllDonations();
      this.handleGetAllCampaignDonations();
      this.handleGetDonationsCountForCurrentWeek();
   }

   // Hàm tạo cấu hình biểu đồ
   getCircleChartOption = () => {
      return {
         tooltip: {
            trigger: "item",
         },
         legend: {
            top: "5%",
            left: "center",
         },
         series: [
            {
               name: "Truy cập từ",
               type: "pie",
               radius: ["40%", "70%"],
               avoidLabelOverlap: false,
               padAngle: 5,
               itemStyle: {
                  borderRadius: 10,
               },
               label: {
                  show: false,
                  position: "center",
               },
               emphasis: {
                  label: {
                     show: true,
                     fontSize: 40,
                     fontWeight: "bold",
                  },
               },
               labelLine: {
                  show: false,
               },
               data: this.state.status_count,
            },
         ],
      };
   };

   // Hàm tạo cấu hình biểu đồ cột
   getBarChartOption = () => {
      return {
         tooltip: {
            trigger: "axis",
            axisPointer: {
               type: "shadow",
            },
         },
         grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
         },
         xAxis: [
            {
               type: "category",
               data: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
               axisTick: {
                  alignWithLabel: true,
               },
            },
         ],
         yAxis: [
            {
               type: "value",
            },
         ],
         series: [
            {
               name: "Quyên góp",
               type: "bar",
               barWidth: "60%",
               data: this.state.donations_per_week,
            },
         ],
      };
   };

   handleGetCampaignStatusCounts = async () => {
      try {
         let response = await getCampaignStatusCounts();
         if (response && response.errCode === 0) {
            this.setState({
               status_count: response.counts,
            });
         }
      } catch (error) {
         console.log("handleGetCampaignStatusCounts error: ", error);
      }
   };

   handleGetAllCampaignDonations = async () => {
      try {
         let response = await getAllCampaignDonations("ALL");
         if (response && response.errCode === 0) {
            let total_campaign = response.campaignDonations.length;
            let total_campaign_amount = 0;
            response.campaignDonations.forEach((item) => {
               total_campaign_amount += parseFloat(item.amount);
            });
            this.setState({
               total_campaign: total_campaign,
               total_campaign_amount: total_campaign_amount,
            });
         }
      } catch (error) {
         console.log("handleGetAllCampaignDonations error: ", error);
      }
   };

   handleGetDonationsCountForCurrentWeek = async () => {
      try {
         let response = await getDonationsCountForCurrentWeek();
         if (response && response.errCode === 0) {
            let donations_per_week = response.count;
            this.setState({
               donations_per_week: donations_per_week,
            });
         }
      } catch (error) {
         console.log("handleGetDonationsCountForCurrentWeek error: ", error);
      }
   };

   handleGetAllDonations = async () => {
      try {
         let response = await getAllDonations("ALL");
         if (response && response.errCode === 0) {
            // Tính tổng số lượng quyên góp và truyền vào state
            let total_donation = response.donations.length;
            // Tính tổng số tiền quyên góp và truyền vào state
            let total_donation_amount = 0;
            response.donations.forEach((item) => {
               total_donation_amount += parseFloat(item.total_amount);
            });
            this.setState({
               total_donation: total_donation,
               total_donation_amount: total_donation_amount,
            });
         }
      } catch (error) {
         console.log("handleGetAllDonations error: ", error);
      }
   };

   render() {
      const { total_donation, total_donation_amount, total_campaign, total_campaign_amount } = this.state;
      const formattedTotalDonationAmount = total_donation_amount.toLocaleString("vi-VN", {
         style: "decimal",
         minimumFractionDigits: 0,
         maximumFractionDigits: 0,
      });
      const formattedTotalCampaignAmount = total_campaign_amount.toLocaleString("vi-VN", {
         style: "decimal",
         minimumFractionDigits: 0,
         maximumFractionDigits: 0,
      });

      return (
         <div className="statistical-container">
            <div className="title">Bảng điều khiển</div>
            <div className="overview-info">
               <div className="item">
                  <div className="top-content">
                     <i className="fas fa-users" style={{ color: "#017AFD" }}></i>
                     <div className="right">
                        <p>Tổng số người ủng hộ</p>
                        <h1>{total_donation}</h1>
                     </div>
                  </div>
                  <hr className="divider" />
               </div>
               <div className="item">
                  <div className="top-content">
                     <i className="fa fa-tree" style={{ color: "#2BA552" }}></i>
                     <div className="right">
                        <p>Tổng số người tham gia chiến dịch</p>
                        <h1>{total_campaign}</h1>
                     </div>
                  </div>
                  <hr className="divider" />
               </div>
               <div className="item">
                  <div className="top-content">
                     <i className="fa fa-wallet" style={{ color: "#FDBF05" }}></i>
                     <div className="right">
                        <p>Số tiền quyên góp</p>
                        <h1>₫{formattedTotalDonationAmount}</h1>
                     </div>
                  </div>
                  <hr className="divider" />
               </div>
               <div className="item">
                  <div className="top-content">
                     <i className="fa fa-coins" style={{ color: "#D1374E" }}></i>
                     <div className="right">
                        <p>Số tiền chiến dịch quyên góp</p>
                        <h1>₫{formattedTotalCampaignAmount}</h1>
                     </div>
                  </div>
                  <hr className="divider" />
               </div>
            </div>
            <div className="chart">
               <div className="circle-chart">
                  <h1>Tỷ lệ trạng thái chiến dịch</h1>
                  <hr className="divider" />
                  {/* Biểu đồ tròn */}
                  <ReactECharts option={this.getCircleChartOption()} style={{ height: "400px", width: "100%" }} />
               </div>
               <div className="bar-chart">
                  <h1>Quyên góp trong tuần này</h1>
                  <hr className="divider" />
                  {/* Biểu đồ cột */}
                  <ReactECharts option={this.getBarChartOption()} style={{ height: "400px", width: "100%" }} />
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistical);
