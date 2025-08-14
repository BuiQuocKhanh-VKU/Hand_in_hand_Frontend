import React, { Component } from "react";
import { connect } from "react-redux";
import "./Overview.scss";
import { getAllCampaigns } from "../../../../services/campaignService";
import { withRouter } from "react-router-dom";

class Overview extends Component {
   constructor(props) {
      super(props);
      this.state = {
         detailCampaigns: [],
      };
   }
   async componentDidMount() {
      if (this.props.match && this.props.match.params && this.props.match.params.id) {
         let inputId = this.props.match.params.id;
         try {
            let response = await getAllCampaigns(inputId);
            if (response && response.errCode === 0) {
               this.setState({ detailCampaigns: response.campaigns });
            }
         } catch (error) {
            console.error("Error fetching campaigns:", error);
         }
      } else {
         console.log("No id found");
      }
   }
   render() {
      let { detailCampaigns } = this.state;
      return (
         <div className="overview-container">
            <div className="transparent"></div>
            <div
               className="overview-content"
               style={{
                  backgroundImage: `url(${
                     detailCampaigns &&
                     detailCampaigns.image &&
                     detailCampaigns.image.length > 0 &&
                     detailCampaigns.image
                  })`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
               }}
            >
               <div className="gradient">
                  <h1 style={{ fontFamily: "Helvetica" }}>
                     {detailCampaigns && detailCampaigns.title && detailCampaigns.title}
                  </h1>
                  <p style={{ fontFamily: "Helvetica" }}>
                     {detailCampaigns && detailCampaigns.description && detailCampaigns.description}
                  </p>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Overview));
