import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import { getAllCampaigns } from "../../services/campaignService";
import Select from "react-select";
class ModalEditPartner extends Component {
   constructor(props) {
      super(props);
      this.state = {
         name: "",
         logo: "",
         campaignList: [], // Danh sách các chiến dịch cho Select
         selectedOption: null, // Giá trị chọn từ react-select
         campaign_id: "", // ID của chiến dịch đã chọn
      };
   }
   //hàm này để lấy dữ liệu từ props truyền vào và set vào state
   componentDidMount() {
      let partner = this.props.currentPartner;
      if (!_.isEmpty(partner)) {
         this.setState({
            name: partner.name || "",
            logo: partner.logo || "",
            selectedOption: partner.campaign_id ? { value: partner.campaign_id, label: partner.campaign.title } : null,
            campaign_id: partner.campaign_id || "",
         });
      }
      this.loadCampaigns();
   }

   // Gọi API để lấy danh sách các chiến dịch
   loadCampaigns = async () => {
      try {
         let response = await getAllCampaigns("ALL");
         if (response && response.errCode === 0) {
            let options = response.campaigns.map((campaign) => ({
               label: campaign.title, // Hiển thị tên chiến dịch
               value: campaign.id, // Lưu ID chiến dịch
            }));
            this.setState({ campaignList: options }, () => {
               if (this.state.campaign_id) {
                  let selectedOption = options.find((option) => option.value === this.state.campaign_id);
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
   toggle = () => {
      this.props.toggleFromParent();
   };
   handleChange = (selectedOption) => {
      this.setState({
         selectedOption,
         campaign_id: selectedOption ? selectedOption.value : "",
      });
   };
   //hàm này dùng để lưu giá trị của input vào state
   handleOnChangeInput = (event, id) => {
      //good code
      let copyState = { ...this.state };
      copyState[id] = event.target.value;
      this.setState({
         ...copyState,
      });
   };
   checkValidateInput = () => {
      let isValid = true;
      let arrInput = ["name", "logo", "campaign_id"];
      for (let i = 0; i < arrInput.length; i++) {
         if (!this.state[arrInput[i]]) {
            isValid = false;
            alert("Missing parameter: " + arrInput[i]);
            break;
         }
      }
      return isValid;
   };
   handleSavePartner = () => {
      let isValid = this.checkValidateInput();
      if (isValid === true) {
         const dataToSend = {
            id: this.props.currentPartner.id,
            name: this.state.name,
            logo: this.state.logo,
            campaign_id: this.state.campaign_id,
         };
         console.log("Data before submit: ", dataToSend);
         this.props.editPartner(dataToSend);
      }
   };
   render() {
      return (
         <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} className={"modal-partner-container"} size="lg">
            <ModalHeader toggle={() => this.toggle()}>Chỉnh sửa đối tác</ModalHeader>
            <ModalBody>
               <div className="modal-partner-body">
                  <div className="input-container">
                     <label>Logo</label>
                     <input
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event, "logo")}
                        value={this.state.logo}
                        className="form-control"
                     />
                  </div>
                  <div className="input-container">
                     <label>Tên đối tác</label>
                     <input
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event, "name")}
                        value={this.state.name}
                        className="form-control"
                     />
                  </div>

                  <div className="input-container">
                     <label>Chiến dịch</label>
                     <Select
                        value={this.state.selectedOption}
                        onChange={this.handleChange}
                        options={this.state.campaignList}
                     />
                  </div>
               </div>
            </ModalBody>
            <ModalFooter>
               <Button color="primary" className=" px-3" onClick={() => this.handleSavePartner()}>
                  Lưu thay đổi
               </Button>{" "}
               <Button color="secondary" className=" px-3" onClick={() => this.toggle()}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditPartner);
