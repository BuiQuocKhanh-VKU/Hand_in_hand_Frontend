import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import Overview from "./Section/Overview";
import Detail from "./Section/Detail";
import Value from "./Section/Value";
import JoinCampaign from "./Section/JoinCampaign";
import { getAllCampaigns } from "../../../services/campaignService";
import Partner from "./Section/Partner";
import Donor from "./Section/Donor";
class DetailCampaign extends Component {
   constructor(props) {
      super(props);
      this.state = {
         detailCampaigns: [],
         id: this.props.match && this.props.match.params && this.props.match.params.id,
      };
   }
   async componentDidMount() {
      if (this.state.id) {
         let inputId = this.state.id;
         try {
            let response = await getAllCampaigns(inputId);
            if (response && response.errCode === 0) {
               this.setState({
                  detailCampaigns: response.campaigns,
               });
            }
         } catch (error) {
            console.error("Error fetching campaigns:", error);
         }
      } else {
         console.log("No id found");
      }
   }

   render() {
      const { isLoggedIn } = this.props;
      const status = this.state.detailCampaigns.status;
      return (
         <div>
            <HomeHeader />
            <Overview />
            <Value />
            <Detail />
            <Donor />
            <Partner />
            {isLoggedIn === true && status === "ongoing" && <JoinCampaign />}

            <HomeFooter />
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
   };
};

export default connect(mapStateToProps)(DetailCampaign);
