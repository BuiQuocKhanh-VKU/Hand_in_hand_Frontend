import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Value.scss";
import { getAllCampaigns } from "../../../../services/campaignService";
import { withRouter } from "react-router-dom";
import CountUp from "react-countup";

class Value extends Component {
   constructor(props) {
      super(props);
      this.state = {
         detailCampaigns: [],
         ratio: 0, // Tỷ lệ phần trăm
         progress: 0,
      };
   }
   async componentDidMount() {
      if (this.props.match && this.props.match.params && this.props.match.params.id) {
         let inputId = this.props.match.params.id;
         try {
            let response = await getAllCampaigns(inputId);
            if (response && response.errCode === 0) {
               this.setState(
                  {
                     detailCampaigns: response.campaigns,
                     ratio: ((response.campaigns.current_amount / response.campaigns.target_amount) * 100).toFixed(2),
                  },
                  this.startProgressEffect
               );
            }
         } catch (error) {
            console.error("Error fetching campaigns:", error);
         }
      } else {
         console.log("No id found");
      }
   }

   startProgressEffect = () => {
      const { ratio } = this.state;
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
         if (currentProgress < ratio) {
            currentProgress += 1;
            this.setState({ progress: currentProgress });
         } else {
            clearInterval(progressInterval);
         }
      }, 50); // Tăng 1% mỗi 20ms
   };
   render() {
      let { detailCampaigns, ratio, progress } = this.state;
      let remainingDate = Math.ceil((new Date(detailCampaigns.end_date) - new Date()) / (1000 * 3600 * 24));
      return (
         <div className="value-container">
            <div className="left-content">
               <div className="hr" />
               <div className="total-value">
                  <h1>Total value </h1>
                  <p>{<CountUp start={0} end={detailCampaigns.target_amount} duration={3} separator="." />} ₫</p>
               </div>
               <div className="hr" />
            </div>
            <div className="right-content">
               <div className="hr" />
               <div className="top-right">
                  <h1>Donation progress </h1>
                  <p>
                     {<CountUp start={0} end={detailCampaigns.current_amount} duration={3} separator="." />}₫/
                     {<CountUp start={0} end={detailCampaigns.target_amount} duration={3} separator="." />}₫
                  </p>
                  <div className="progress">
                     <div
                        className="progress-bar"
                        style={{ width: `${progress}%` }} // Cập nhật width dần dần
                     ></div>
                  </div>
               </div>
               <div className="bottom-right">
                  <div className="remain">
                     <h1>Donation Percentage</h1>
                     <p>
                        <CountUp start={0} end={ratio} duration={3} decimals={2} />%
                     </p>
                  </div>
                  <div className="remain">
                     <h1>Remaining Percentage</h1>
                     <p>
                        <CountUp start={0} end={100 - ratio} duration={3} decimals={2} />%
                     </p>
                  </div>
                  <div className="remain">
                     <h1>Remaining Days</h1>
                     <p>{<CountUp start={0} end={remainingDate} duration={3} />} days</p>
                  </div>
               </div>
               <div className="hr" />
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Value));
