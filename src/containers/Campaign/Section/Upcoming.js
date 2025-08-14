import React, { Component } from "react";
import { connect } from "react-redux";
import "./Upcoming.scss";
import { withRouter } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCampaignByProvinceId } from "../../../services/campaignService";
class UpComing extends Component {
   constructor(props) {
      super(props);
      this.state = {
         campaigns: [],
      };
   }
   handleViewDetailCampaign = (campaign) => {
      console.log("View detail campaign", campaign);
      if (this.props.history) {
         this.props.history.push(`/detail/${campaign.id}`);
      }
   };

   componentDidUpdate(prevProps) {
      if (prevProps.provinceId !== this.props.provinceId) {
         console.log("provinceId changed", this.props.provinceId);
         this.fetchCampaigns(this.props.provinceId);
      }
   }

   fetchCampaigns = async (provinceId) => {
      if (provinceId) {
         try {
            let response = await getCampaignByProvinceId(provinceId);
            if (response && response.campaigns) {
               const upcomingCampaigns = response.campaigns.filter((campaign) => campaign.status === "upcoming");
               this.setState({ campaigns: upcomingCampaigns });
            }
         } catch (error) {
            console.error("Error fetching campaigns:", error);
         }
      }
   };

   render() {
      let { campaigns } = this.state;
      let settings = {
         centerMode: true,
         infinite: true,
         centerPadding: "10px",
         slidesToShow: Math.min(campaigns.length, 3),
         slidesToScroll: 1,
         autoplay: true,
         speed: 1000,
         autoplaySpeed: 3000,
         pauseOnHover: false,
      };
      return (
         <div className="upcoming-container">
            <div className="upcoming-title">
               <i class="fa fa-play"></i>
               Upcoming Campaigns
            </div>
            <div className="upcoming-content">
               <Slider {...settings}>
                  {campaigns.length > 0 &&
                     campaigns.map((item, index) => (
                        <div className="upcoming-item" key={index} onClick={() => this.handleViewDetailCampaign(item)}>
                           <img src={item.image} alt={item.title} />
                           <div className="text-overlay">
                              <h1>{item.title}</h1>
                              <p>{item.description}</p>
                           </div>
                           <div className="filter">Read more...</div>
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
      provinceId: state.app.selectedProvinceId,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpComing));
