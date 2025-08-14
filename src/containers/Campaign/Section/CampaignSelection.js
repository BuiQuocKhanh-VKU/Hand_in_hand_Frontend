import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./CampaignSelection.scss";
import non from "../../../assets/images/non.png";
import CountUp from "react-countup";
import InteractiveMap from "./InteractiveMap";
import { setSelectedProvince } from "../../../store/actions/appActions";

const CampaignSelection = ({ setSelectedProvince }) => {
   const [provinceOverview, setProvinceOverview] = useState(null); // Store selected province data
   // Reset data khi component được mount
   useEffect(() => {
      setProvinceOverview(null); // Reset dữ liệu tỉnh đã chọn
      setSelectedProvince(null); // Reset ID tỉnh trong Redux
   }, [setSelectedProvince]); // Chỉ chạy khi component mount hoặc `setSelectedProvince` thay đổi

   const handleProvinceSelect = (overviewData) => {
      setProvinceOverview(overviewData);
      setSelectedProvince(overviewData.province.id); // Store selected province id using mapDispatchToProps
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
                     alt={provinceOverview?.province?.name || "Select, please"}
                  />
               </div>
               <div className="infor">
                  <div className="infor-title">
                     <h1 style={{ fontFamily: "Helvetica" }}>
                        Overview - {provinceOverview?.province?.name || "No Selection"}
                     </h1>
                     <div className="dividing-line" />
                  </div>
                  <div className="infor-content-1">
                     <div className="total-campaign">
                        <div className="total-campaign-title">
                           <h1>Total Campaign</h1>
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
                           <h1>Total Donation Amount</h1>
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
                        <div className="active-campaigns-title">Ended Campaign</div>
                        <div className="active-campaigns-number">
                           <CountUp start={0} end={provinceOverview?.endedCampaigns || 0} duration={1} />
                        </div>
                     </div>
                     <div className="completed-campaigns">
                        <div className="dividing-line" />
                        <div className="completed-campaigns-title">Ongoing Campaign</div>
                        <div className="completed-campaigns-number">
                           <CountUp start={0} end={provinceOverview?.ongoingCampaigns || 0} duration={1.2} />
                        </div>
                     </div>
                     <div className="past-campaigns">
                        <div className="dividing-line" />
                        <div className="past-campaigns-title">Upcoming Campaign</div>
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
