import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./CampaignSelection.scss";
import non from "../../../assets/images/non.png";
import CountUp from "react-countup";
import InteractiveMap from "./InteractiveMap";
import { setSelectedProvince } from "../../../store/actions/appActions";

const CampaignSelection = ({ setSelectedProvince }) => {
   const [provinceOverview, setProvinceOverview] = useState(null); // Lưu trữ dữ liệu tỉnh đã chọn
   // Reset dữ liệu khi component được mount
   useEffect(() => {
      setProvinceOverview(null); // Reset dữ liệu tỉnh đã chọn
      setSelectedProvince(null); // Reset ID tỉnh trong Redux
   }, [setSelectedProvince]); // Chỉ chạy khi component mount hoặc `setSelectedProvince` thay đổi

   const handleProvinceSelect = (overviewData) => {
      setProvinceOverview(overviewData);
      setSelectedProvince(overviewData.province.id); // Lưu ID tỉnh đã chọn vào Redux
   };

   return (
      <div className="campaign-selection-container">
         <div className="space" />
         <div className="campaign-selection-content">
            <div className="left-content">
               <InteractiveMap onProvinceSelect={handleProvinceSelect} />
            </div>
            <div className="right-content">
               <div className="banner-img">
                  <img
                     src={provinceOverview?.province?.image || non}
                     alt={provinceOverview?.province?.name || "Chọn tỉnh"}
                  />
               </div>
               <div className="infor">
                  <div className="infor-title">
                     <h1 style={{ fontFamily: "Helvetica" }}>
                        Tổng quan - {provinceOverview?.province?.name || "Chưa chọn tỉnh"}
                     </h1>
                     <div className="dividing-line" />
                  </div>
                  <div className="infor-content-1">
                     <div className="total-campaign">
                        <div className="total-campaign-title">
                           <h1>Tổng số chiến dịch</h1>
                        </div>
                        <div className="total-campaign-number">
                           <CountUp
                              start={0}
                              end={provinceOverview?.totalCampaigns || 0}
                              duration={1.5} // Thời gian hiệu ứng (giây)
                              separator="," // Dấu phân cách cho số
                           />
                        </div>
                     </div>
                     <div className="total-money">
                        <div className="total-money-title">
                           <h1>Tổng số tiền quyên góp</h1>
                        </div>
                        <div className="total-money-number">
                           <CountUp
                              start={0}
                              end={provinceOverview?.totalDonationAmount || 0}
                              duration={2}
                              separator=","
                              suffix=" đ" // Thêm đơn vị "đ" sau số
                           />
                        </div>
                     </div>
                  </div>
                  <div className="infor-content-2">
                     <div className="active-campaigns">
                        <div className="dividing-line" />
                        <div className="active-campaigns-title">Chiến dịch đã kết thúc</div>
                        <div className="active-campaigns-number">
                           <CountUp start={0} end={provinceOverview?.endedCampaigns || 0} duration={1} />
                        </div>
                     </div>
                     <div className="completed-campaigns">
                        <div className="dividing-line" />
                        <div className="completed-campaigns-title">Chiến dịch đang diễn ra</div>
                        <div className="completed-campaigns-number">
                           <CountUp start={0} end={provinceOverview?.ongoingCampaigns || 0} duration={1.2} />
                        </div>
                     </div>
                     <div className="past-campaigns">
                        <div className="dividing-line" />
                        <div className="past-campaigns-title">Chiến dịch sắp tới</div>
                        <div className="past-campaigns-number">
                           <CountUp start={0} end={provinceOverview?.upcomingCampaigns || 0} duration={1.4} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

// Map dispatch to props để dispatch hành động setSelectedProvince
const mapDispatchToProps = (dispatch) => {
   return {
      setSelectedProvince: (provinceId) => dispatch(setSelectedProvince(provinceId)),
   };
};

export default connect(null, mapDispatchToProps)(CampaignSelection);
