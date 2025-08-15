import React, { Component } from "react";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
import { getAllUsers, getAllCampaigns } from "../../services/campaignDonationService";

class ModalCampaignDonation extends Component {
   // Hàm này dùng để khởi tạo state hoặc bind các function
   constructor(props) {
      super(props);
      this.state = {
         user_id: "",
         campaign_id: "",
         campaignList: [], // Danh sách chiến dịch
         userList: [], // Danh sách người dùng
         selectedCampaign: null, // Chiến dịch đã chọn
         selectedUser: null, // Người dùng đã chọn
         amount: "", // Số tiền đóng góp
      };
      this.listenToEmitter();
   }

   // Hàm này dùng để lắng nghe sự kiện từ emitter
   listenToEmitter = () => {
      emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
         this.setState({
            user_id: "",
            campaign_id: "",
            campaignList: [],
            userList: [],
            selectedCampaign: null,
            selectedUser: null,
            amount: "",
         });
      });
   };

   componentDidMount() {
      this.loadUsers();
      this.loadCampaigns();
   }

   // Tải danh sách chiến dịch
   loadCampaigns = async () => {
      try {
         let response = await getAllCampaigns("ALL");
         console.log("Campaigns response: ", response);
         if (response && response.errCode === 0) {
            let campaignOptions = response.campaigns.map((campaign) => ({
               label: campaign.title,
               value: campaign.id,
            }));
            this.setState({
               campaignList: campaignOptions,
            });
         } else {
            console.log("loadCampaigns error", response.errMessage);
         }
      } catch (error) {
         console.log("loadCampaigns error", error);
      }
   };

   // Tải danh sách người dùng
   loadUsers = async () => {
      try {
         let response = await getAllUsers("ALL");
         console.log("Users response: ", response);
         if (response && response.errCode === 0) {
            let userOptions = response.users.map((user) => ({
               label: user.email,
               value: user.id,
            }));
            this.setState({
               userList: userOptions,
            });
         } else {
            console.log("loadUsers error", response.errMessage);
         }
      } catch (error) {
         console.log("loadUsers error", error);
      }
   };

   // Hàm này dùng để đóng mở modal
   toggle = () => {
      this.props.toggleFromParent();
   };

   // Hàm này dùng để lưu giá trị của input vào state
   handleOnChangeInput = (event, id) => {
      let copyState = { ...this.state };
      copyState[id] = event.target.value;
      this.setState({
         ...copyState,
      });
   };

   // Hàm này dùng để lưu giá trị của select vào state
   handleChangeCampaign = (selectedCampaign) => {
      this.setState({
         selectedCampaign: selectedCampaign,
         campaign_id: selectedCampaign ? selectedCampaign.value : "",
      });
   };

   handleChangeUser = (selectedUser) => {
      this.setState({
         selectedUser: selectedUser,
         user_id: selectedUser ? selectedUser.value : "",
      });
   };

   // Hàm này dùng để kiểm tra xem input có đúng không
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
      // Kiểm tra thêm nếu amount không phải số hoặc nhỏ hơn 0
      if (isValid && isNaN(this.state.amount)) {
         isValid = false;
         alert("Số tiền phải là một số hợp lệ.");
      }
      if (isValid && parseFloat(this.state.amount) <= 0) {
         isValid = false;
         alert("Số tiền phải lớn hơn 0.");
      }
      return isValid;
   };

   // Hàm này dùng để thêm mới campaignDonation
   handleAddNewCampaignDonation = () => {
      let isValid = this.checkValidateInput();
      if (isValid === true) {
         this.props.createNewCampaignDonation(this.state); // Gọi hàm createNewCampaignDonation từ props
      }
   };

   render() {
      return (
         <Modal
            isOpen={this.props.isOpen}
            toggle={() => this.toggle()}
            className={"modal-campaign-donation-container"}
            size="xl"
         >
            <ModalHeader toggle={() => this.toggle()}>Tạo mới khoản đóng góp chiến dịch</ModalHeader>
            <ModalBody>
               <div className="modal-campaign-donation-body">
                  <div className="input-container">
                     <label>Người dùng</label>
                     <Select
                        value={this.state.selectedUser}
                        onChange={(selectedUser) => this.handleChangeUser(selectedUser)}
                        options={this.state.userList}
                     />
                  </div>
                  <div className="input-container">
                     <label>Chiến dịch</label>
                     <Select
                        value={this.state.selectedCampaign}
                        onChange={(selectedCampaign) => this.handleChangeCampaign(selectedCampaign)}
                        options={this.state.campaignList}
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
               <Button color="primary" className="px-3" onClick={() => this.handleAddNewCampaignDonation()}>
                  Thêm mới
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCampaignDonation);
