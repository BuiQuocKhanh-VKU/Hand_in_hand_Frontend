import React, { Component } from "react";
import { connect } from "react-redux";
import "./Detail.scss";
import { getAllCampaigns } from "../../../../services/campaignService";
import { withRouter } from "react-router-dom";

class Detail extends Component {
   constructor(props) {
      super(props);
      this.state = {
         detailCampaigns: [],
      };
   }

   handleNavigate = (path) => {
      this.props.history.push(path);
   };

   async componentDidMount() {
      if (this.props.match && this.props.match.params && this.props.match.params.id) {
         let inputId = this.props.match.params.id;
         try {
            let response = await getAllCampaigns(inputId);
            if (response && response.errCode === 0) {
               this.setState({ detailCampaigns: response.campaigns });
            }
         } catch (error) {
            console.error("Lỗi khi lấy thông tin chiến dịch:", error);
         }
      } else {
         console.log("Không tìm thấy id");
      }
   }

   render() {
      const { isLoggedIn } = this.props;
      let { detailCampaigns } = this.state;
      return (
         <div className="detail-container">
            <div className="left-content">
               <div className="status">
                  <h1>Trạng thái</h1>
                  <p>
                     <i class="fa fa-tasks" aria-hidden="true"></i>
                     {detailCampaigns && detailCampaigns.status && detailCampaigns.status}
                  </p>
               </div>
               <div className="start-date">
                  <h1>Ngày bắt đầu</h1>
                  <p>
                     <i class="fa fa-calendar-alt" aria-hidden="true"></i>
                     {detailCampaigns &&
                        detailCampaigns.start_date &&
                        new Date(detailCampaigns.start_date).toLocaleDateString()}
                  </p>
               </div>
               <div className="end-date">
                  <h1>Ngày kết thúc</h1>
                  <p>
                     <i class="fa fa-calendar-alt" aria-hidden="true"></i>
                     {detailCampaigns &&
                        detailCampaigns.end_date &&
                        new Date(detailCampaigns.end_date).toLocaleDateString()}
                  </p>
               </div>
               <div className="donor-num">
                  <h1>Số người đóng góp</h1>
                  <p>
                     <i class="fa fa-users" aria-hidden="true"></i>
                     {detailCampaigns && detailCampaigns.donations && detailCampaigns.donations.length > 0
                        ? detailCampaigns.donations.length
                        : "Chưa có người đóng góp"}
                  </p>
               </div>
            </div>
            <div className="center-content">
               {detailCampaigns && detailCampaigns.contentHTML && detailCampaigns.contentHTML.length > 0 && (
                  <div
                     dangerouslySetInnerHTML={{
                        __html: detailCampaigns.contentHTML,
                     }}
                  />
               )}
            </div>
            <div className="right-content">
               {isLoggedIn === false && (
                  <div className="login-info">
                     <button
                        onClick={() => {
                           this.handleNavigate(`/login/${this.props.match.params.id}`);
                        }}
                     >
                        Đăng nhập để tham gia chiến dịch
                     </button>
                  </div>
               )}
               <div className="location">
                  <h1>Địa điểm</h1>
                  <p>
                     <i class="fas fa-map-marker-alt"></i>
                     {detailCampaigns &&
                        detailCampaigns.province &&
                        detailCampaigns.province.name &&
                        detailCampaigns.position}
                  </p>
                  {detailCampaigns && detailCampaigns.position_map && detailCampaigns.position_map.length > 0 && (
                     <div
                        dangerouslySetInnerHTML={{
                           __html: detailCampaigns.position_map,
                        }}
                     />
                  )}
               </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
