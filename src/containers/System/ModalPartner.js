import React, { Component } from "react";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
import { getAllCampaigns } from "../../services/campaignService";

class ModalPartner extends Component {
   constructor(props) {
      super(props);
      this.state = {
         name: "",
         logo: "",
         campaignList: [], // Danh sách các chiến dịch cho Select
         selectedOption: null, // Giá trị chọn từ react-select
         campaign_id: "", // ID của chiến dịch đã chọn
      };
      this.listenToEmitter();
   }

   listenToEmitter = () => {
      emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
         this.setState({
            name: "",
            logo: "",
            campaignList: [],
            selectedOption: null,
            campaign_id: "",
         });
      });
   };

   componentDidMount() {
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
            this.setState({
               campaignList: options,
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

   handleOnChangeInput = (event, id) => {
      let copyState = { ...this.state };
      copyState[id] = event.target.value;
      this.setState({
         ...copyState,
      });
   };

   handleChange = (selectedOption) => {
      this.setState({
         selectedOption,
         campaign_id: selectedOption ? selectedOption.value : "",
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

   handleAddNewPartner = () => {
      let isValid = this.checkValidateInput();
      if (isValid) {
         this.props.createNewPartner(this.state);
      }
   };

   render() {
      return (
         <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} className={"modal-partner-container"} size="lg">
            <ModalHeader toggle={() => this.toggle()}>Tạo đối tác mới</ModalHeader>
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
                        placeholder="Chọn chiến dịch"
                     />
                  </div>
               </div>
            </ModalBody>
            <ModalFooter>
               <Button color="primary" className="px-3" onClick={() => this.handleAddNewPartner()}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalPartner);
