import React, { Component } from "react";
import { connect } from "react-redux";
import "./CampaignDonationManage.scss";
import {
   getAllCampaignDonations,
   createNewCampaignDonationService,
   deleteCampaignDonationService,
   editCampaignDonationService,
} from "../../services/campaignDonationService";
import ModalCampaignDonation from "./ModalCampaignDonation";
import ModalEditCampaignDonation from "./ModalEditCampaignDonation";
import { emitter } from "../../utils/emitter";

class CampaignDonationManage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrCampaignDonations: [], // Danh sách các khoản đóng góp chiến dịch
         isOpenModalCampaignDonation: false, // Trạng thái modal thêm mới
         isOpenModalEditCampaignDonation: false, // Trạng thái modal chỉnh sửa
         campaignDonationEdit: {}, // Dữ liệu khoản đóng góp chiến dịch đang chỉnh sửa
      };
   }

   // Gọi API để lấy danh sách các khoản đóng góp chiến dịch
   async componentDidMount() {
      await this.getAllCampaignDonationsFromReact();
   }

   getAllCampaignDonationsFromReact = async () => {
      let response = await getAllCampaignDonations("ALL");
      if (response && response.errCode === 0) {
         this.setState({
            arrCampaignDonations: response.campaignDonations, // Cập nhật danh sách các khoản đóng góp
         });
      }
   };

   // Mở modal thêm mới khoản đóng góp
   handleAddNewCampaignDonation = () => {
      this.setState({
         isOpenModalCampaignDonation: true,
      });
   };

   // Đóng/mở modal thêm mới
   toggleCampaignDonationModal = () => {
      this.setState({
         isOpenModalCampaignDonation: !this.state.isOpenModalCampaignDonation,
      });
   };

   // Đóng/mở modal chỉnh sửa khoản đóng góp
   toggleEditCampaignDonationModal = () => {
      this.setState({
         isOpenModalEditCampaignDonation: !this.state.isOpenModalEditCampaignDonation,
      });
   };

   // Tạo mới khoản đóng góp chiến dịch
   createNewCampaignDonation = async (data) => {
      try {
         let response = await createNewCampaignDonationService(data);
         if (response && response.errCode !== 0) {
            alert(response.errMessage);
         } else {
            await this.getAllCampaignDonationsFromReact();
            this.setState({
               isOpenModalCampaignDonation: false,
            });
            emitter.emit("EVENT_CLEAR_MODAL_DATA");
         }
      } catch (error) {
         console.log("createNewCampaignDonation error: ", error);
      }
   };

   // Xóa khoản đóng góp chiến dịch
   handleDeleteCampaignDonation = async (campaignDonation) => {
      try {
         let response = await deleteCampaignDonationService(campaignDonation.id);
         if (response && response.errCode === 0) {
            await this.getAllCampaignDonationsFromReact();
         } else {
            alert(response.errMessage);
         }
      } catch (error) {
         console.log("handleDeleteCampaignDonation error: ", error);
      }
   };

   // Mở modal chỉnh sửa một khoản đóng góp
   handleEditCampaignDonation = (campaignDonation) => {
      this.setState({
         isOpenModalEditCampaignDonation: true,
         campaignDonationEdit: campaignDonation,
      });
   };

   // Sửa thông tin khoản đóng góp
   doEditCampaignDonation = async (data) => {
      try {
         let response = await editCampaignDonationService(data);
         if (response && response.errCode === 0) {
            this.setState({
               isOpenModalEditCampaignDonation: false,
            });
            await this.getAllCampaignDonationsFromReact();
         } else {
            alert(response.errCode);
         }
      } catch (error) {
         console.log("doEditCampaignDonation error: ", error);
      }
   };

   // Định dạng tiền
   formatPrice = (amount) => {
      if (!amount) return "0";
      const finalAmount = amount;
      return new Intl.NumberFormat("vi-VN", {
         style: "currency",
         currency: "VND",
         maximumFractionDigits: 0,
      }).format(finalAmount); // Định dạng số dưới dạng tiền tệ
   };

   // Lifecycle method: render
   render() {
      console.log("check state: ", this.state);
      let arrCampaignDonations = this.state.arrCampaignDonations;
      return (
         <div className="campaign-donations-container">
            <ModalCampaignDonation
               isOpen={this.state.isOpenModalCampaignDonation}
               toggleFromParent={this.toggleCampaignDonationModal}
               createNewCampaignDonation={this.createNewCampaignDonation}
            />
            {this.state.isOpenModalEditCampaignDonation && (
               <ModalEditCampaignDonation
                  isOpen={this.state.isOpenModalEditCampaignDonation}
                  toggleFromParent={this.toggleEditCampaignDonationModal}
                  currentCampaignDonation={this.state.campaignDonationEdit}
                  editCampaignDonation={this.doEditCampaignDonation}
               />
            )}

            <div className="title text-center">Quản lý khoản đóng góp chiến dịch</div>
            <div className="mx-1">
               <button className="btn btn-primary px-3" onClick={() => this.handleAddNewCampaignDonation()}>
                  <i className="fa fa-plus"></i> Thêm khoản đóng góp mới
               </button>
            </div>
            <div className="campaign-donations-table mt-3 mx-2">
               <table id="customers">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Email người dùng</th>
                        <th>Chiến dịch</th>
                        <th>Số tiền</th>
                        <th>Thao tác</th>
                     </tr>
                  </thead>
                  <tbody>
                     {arrCampaignDonations &&
                        arrCampaignDonations.map((item, index) => {
                           console.log("check map: ", item, index);
                           return (
                              <tr key={index}>
                                 <td>{item.id}</td>
                                 <td>{item.user.email}</td>
                                 <td>{item.campaign.title}</td>
                                 <td>{this.formatPrice(item.amount)}</td>
                                 <td>
                                    <button className="btn-edit">
                                       <i
                                          className="fa fa-pencil-alt"
                                          onClick={() => this.handleEditCampaignDonation(item)}
                                       ></i>
                                    </button>
                                    <button
                                       className="btn-delete"
                                       onClick={() => this.handleDeleteCampaignDonation(item)}
                                    >
                                       <i className="fa fa-trash"></i>
                                    </button>
                                 </td>
                              </tr>
                           );
                        })}
                  </tbody>
               </table>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignDonationManage);
