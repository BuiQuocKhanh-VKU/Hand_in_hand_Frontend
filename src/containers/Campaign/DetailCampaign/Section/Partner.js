import React, { Component } from "react";
import { connect } from "react-redux";
import "./Partner.scss";
import { withRouter } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getPartnerByCampaignId } from "../../../../services/partnerService";
class Partner extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrPartner: [],
         id: this.props.match && this.props.match.params && this.props.match.params.id,
      };
   }
   async componentDidMount() {
      await this.handleGetPartnerByCampaignId();
      console.log("id", this.state.id);
   }
   handleGetPartnerByCampaignId = async () => {
      let response = await getPartnerByCampaignId(this.state.id);
      console.log("thằng && response", response);
      if (response && response.errCode === 0) {
         this.setState({
            arrPartner: response.partners,
         });
      }
   };

   render() {
      let { arrPartner } = this.state;
      let settings = {
         centerMode: true,
         infinite: true,
         centerPadding: "10px",
         slidesToShow: arrPartner && arrPartner.length && Math.min(arrPartner.length, 5),
         slidesToScroll: 1,
         autoplay: true,
         speed: 1000,
         autoplaySpeed: 3000,
         pauseOnHover: false,
      };
      return (
         <div className="partner-container">
            <div className="partner-title">
               <i class="fa fa-users"></i>
               Our Partners
            </div>
            <div className="partner-content">
               <Slider {...settings}>
                  {arrPartner &&
                     arrPartner.length > 0 &&
                     arrPartner.map((item, index) => (
                        <div className="partner-item" key={index}>
                           <div className="text-overlay">
                              <img src={item.logo} alt={item.name} />
                              <h1>{item.name}</h1>
                           </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Partner));
