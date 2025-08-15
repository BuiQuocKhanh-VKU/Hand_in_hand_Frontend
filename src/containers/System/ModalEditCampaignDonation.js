import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import Select from "react-select";
import { getAllCampaigns, getAllUsers } from "../../services/campaignDonationService";

class ModalEditCampaignDonation extends Component {
   constructor(props) {
      super(props);
      this.state = {
         user_id: "", // ID người dùng
         campaign_id: "", // ID chiến dịch
         campaignList: [], // Danh sách chiến dịch
         userList: [], // Danh sách người dùng
         selectedCampaign: null, // Chiến dịch đã chọn
         selectedUser: null, // Người dùng đã chọn
         amount: "", // Số tiền đóng góp
      };
   }

   // Hàm này dùng để lấy dữ liệu từ props truyền vào và set vào state
   componentDidMount() {
      let campaignDonation = this.props.currentCampaignDonation;
      if (!_.isEmpty(campaignDonation)) {
         this.setState({
            user_id: campaignDonation.user_id || "",
            campaign_id: campaignDonation.campaign_id || "",
            amount: campaignDonation.amount,
            selectedCampaign: campaignDonation.campaign_id
               ? { value: campaignDonation.campaign_id, label: campaignDonation.campaign.title }
               : null,
            selectedUser: campaignDonation.user_id
               ? { value: campaignDonation.user_id, label: campaignDonation.user.email }
               : null,
         });
      }
      this.loadCampaigns();
      this.loadUsers();
   }

   // Tải danh sách chiến dịch
   loadCampaigns = async () => {
      try {
         let response = await getAllCampaigns("ALL");
         if (response && response.errCode === 0) {
            let campaignOptions = response.campaigns.map((campaign) => ({
               label: campaign.title, // Hiển thị tên chiến dịch
               value: campaign.id, // Lưu ID chiến dịch
            }));
            this.setState({ campaignList: campaignOptions }, () => {
               if (this.state.campaign_id) {
                  let selectedOption = campaignOptions.find((option) => option.value === this.state.campaign_id);
                  this.setState({ selectedOption });
               }
            });
         } else {
            console.log("loadCampaignList error", response.errMessage);
         }
      } catch (error) {
         console.log("loadCampaignList error", error);
      }
   };

   // Tải danh sách người dùng
   loadUsers = async () => {
      try {
         let response = await getAllUsers("ALL");
         if (response && response.errCode === 0) {
            let userOptions = response.users.map((user) => ({
               label: user.email, // Hiển thị email người dùng
               value: user.id, // Lưu ID người dùng
            }));
            this.setState({ userList: userOptions }, () => {
               if (this.state.user_id) {
                  let selectedOption = userOptions.find((option) => option.value === this.state.user_id);
                  this.setState({ selectedOption });
               }
            });
         } else {
            console.log("loadCampaignDonationList error", response.errMessage);
         }
      } catch (error) {
         console.log("loadCampaignDonationList error", error);
      }
   };

   // Hàm này dùng để đóng mở modal
   toggle = () => {
      this.props.toggleFromParent();
   };

   // Hàm này dùng để lưu giá trị của select vào state
   handleChangeCampaign = (selectedCampaign) => {
      this.setState({
         selectedCampaign,
         campaign_id: selectedCampaign ? selectedCampaign.value : "",
      });
   };

   handleChangeUser = (selectedUser) => {
      this.setState({
         selectedUser,
         user_id: selectedUser ? selectedUser.value : "",
      });
   };

   // Hàm này dùng để lưu giá trị của input vào state
   handleOnChangeInput = (event, id) => {
      let copyState = { ...this.state };
      copyState[id] = event.target.value;
      this.setState({
         ...copyState,
      });
   };

   // Kiểm tra tính hợp lệ của input
   checkValidateInput = () => {
      let isValid = true;
      let arrInput = ["user_id", "campaign_id", "amount"];
      for (let i = 0; i < arrInput.length; i++) {
         if (!this.state[arrInput[i]]) {
            isValid = false;
            alert("Thiếu tham số: " + arrInput[i]);
            break;
         }
      }
      return isValid;
   };

   // Hàm này dùng để lưu các thay đổi và gửi dữ liệu
   handleSaveCampaignDonation = () => {
      let isValid = this.checkValidateInput();
      if (isValid === true) {
         const dataToSend = {
            id: this.props.currentCampaignDonation.id,
            user_id: this.state.user_id,
            campaign_id: this.state.campaign_id,
            amount: this.state.amount,
         };
         console.log("Data before submit: ", dataToSend);
         this.props.editCampaignDonation(dataToSend); // Gọi hàm editCampaignDonation từ props
      }
   };

   render() {
      return (
         <Modal
            isOpen={this.props.isOpen}
            toggle={() => this.toggle()}
            className={"modal-campaign-donation-container"}
            size="lg"
         >
            <ModalHeader toggle={() => this.toggle()}>Chỉnh sửa khoản đóng góp chiến dịch</ModalHeader>
            <ModalBody>
               <div className="modal-campaign-donation-body">
                  <div className="input-container">
                     <label>Chiến dịch</label>
                     <Select
                        value={this.state.selectedCampaign}
                        onChange={this.handleChangeCampaign}
                        options={this.state.campaignList}
                     />
                  </div>
                  <div className="input-container">
                     <label>Người dùng</label>
                     <Select
                        value={this.state.selectedUser}
                        onChange={this.handleChangeUser}
                        options={this.state.userList}
                     />
                  </div>
                  <div className="input-container">
                     <label>Số tiền</label>
                     <input
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event, "amount")}
                        value={this.state.amount}
                        className="form-control"
                     />
                  </div>
               </div>
            </ModalBody>
            <ModalFooter>
               <Button color="primary" className="px-3" onClick={() => this.handleSaveCampaignDonation()}>
                  Lưu thay đổi
               </Button>{" "}
               <Button color="secondary" className="px-3" onClick={() => this.toggle()}>
                  Đóng
               </Button>
            </ModalFooter>
         </Modal>
      );
   }
}

const mapStateToProps = (state) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCampaignDonation);
