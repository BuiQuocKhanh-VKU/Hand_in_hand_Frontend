import React, { Component } from "react";
import { connect } from "react-redux";
import "./Donor.scss";
import { withRouter } from "react-router-dom";
import { getCampaignDonationsByCampaign } from "../../../../services/campaignDonationService";
class Donors extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrDonors: [],
         id: this.props.match && this.props.match.params && this.props.match.params.id,
      };
   }
   async componentDidMount() {
      await this.handleGetDonors();
   }

   handleGetDonors = async () => {
      let response = await getCampaignDonationsByCampaign(this.state.id);
      if (response && response.errCode === 0) {
         this.setState({
            arrDonors: response.campaignDonations,
         });
      }
   };
   render() {
      const { arrDonors } = this.state;
      console.log("arrDonors", arrDonors);
      return (
         <div className="donors-container">
            <div className="donors-content">
               <h2 className="donors-title">Donors list</h2>
               <div class="bd-example m-0 border-0">
                  <table class="table table-default table-hover  ">
                     <thead>
                        <tr>
                           <th scope="col">ID</th>
                           <th scope="col">Name</th>
                           <th scope="col">Campaign</th>
                           <th scope="col">Amount</th>
                        </tr>
                     </thead>
                     <tbody>
                        {arrDonors &&
                           arrDonors.length > 0 &&
                           arrDonors.map((item, index) => {
                              return (
                                 <tr key={index}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.user.name}</td>
                                    <td>{item.campaign.title}</td>
                                    <td>{item.amount}</td>
                                 </tr>
                              );
                           })}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   //lấy biến thông qua state
   return {
      isLoggedIn: state.user.isLoggedIn,
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   //fire action event của redux
   return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Donors));
