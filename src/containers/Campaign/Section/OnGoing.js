import React, { Component } from "react";
import { connect } from "react-redux";
import "./OnGoing.scss";
import { withRouter } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCampaignByProvinceId } from "../../../services/campaignService";

class OnGoing extends Component {
   constructor(props) {
      super(props);
      this.state = {
         campaigns: [], // Danh sách chiến dịch đang diễn ra
      };
   }

   handleViewDetailCampaign = (campaign) => {
      console.log("Xem chi tiết chiến dịch", campaign);
      let url = `/detail/${campaign.id}`;
      if (this.props.history) {
         this.props.history.push(url); // Điều hướng đến trang chi tiết chiến dịch
      }
   };

   componentDidUpdate(prevProps) {
      if (prevProps.provinceId !== this.props.provinceId) {
         console.log("provinceId đã thay đổi", this.props.provinceId);
         this.fetchCampaigns(this.props.provinceId); // Lấy lại danh sách chiến dịch khi provinceId thay đổi
      }
   }

   fetchCampaigns = async (provinceId) => {
      if (provinceId) {
         try {
            let response = await getCampaignByProvinceId(provinceId); // Lấy chiến dịch theo tỉnh
            if (response && response.campaigns) {
               const ongoingCampaigns = response.campaigns.filter((campaign) => campaign.status === "ongoing"); // Lọc chiến dịch đang diễn ra
               this.setState({ campaigns: ongoingCampaigns });
            }
         } catch (error) {
            console.error("Lỗi khi lấy chiến dịch:", error);
         }
      }
   };

   render() {
      let { campaigns } = this.state;
      let settings = {
         centerMode: true,
         infinite: true,
         centerPadding: "10px",
         slidesToShow: Math.min(campaigns.length, 3), // Hiển thị tối đa 3 chiến dịch
         slidesToScroll: 1,
         autoplay: true,
         speed: 1000,
         autoplaySpeed: 3000,
         pauseOnHover: false,
      };

      return (
         <div className="ongoing-container">
            <div className="ongoing-title">
               <i className="fa fa-play"></i>
               Chiến dịch đang diễn ra
            </div>
            <div className="ongoing-content">
               <Slider {...settings}>
                  {campaigns.length > 0 &&
                     campaigns.map((item, index) => (
                        <div className="ongoing-item" key={index} onClick={() => this.handleViewDetailCampaign(item)}>
                           <img src={item.image} alt={item.title} />
                           <div className="text-overlay">
                              <h1>{item.title}</h1>
                              <p>{item.description}</p>
                           </div>
                           <div className="filter">Xem thêm...</div>
                        </div>
                     ))}
               </Slider>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
      language: state.app.language,
      provinceId: state.app.selectedProvinceId, // ID tỉnh đã chọn
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OnGoing));
