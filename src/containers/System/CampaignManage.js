import React, { Component } from "react";
import { connect } from "react-redux";
import "./CampaignManage.scss";
import {
   getAllCampaigns,
   createNewCampaignService,
   deleteCampaignService,
   editCampaignService,
} from "../../services/campaignService";
import ModalCampaign from "./ModalCampaign";
import ModalEditCampaign from "./ModalEditCampaign";
import { emitter } from "../../utils/emitter";

class CampaignManage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrCampaigns: [],
         isOpenModalCampaign: false,
         isOpenModalEditCampaign: false,
         campaignEdit: {},
      };
   }

   async componentDidMount() {
      await this.getAllCampaignsFromReact();
   }

   // Hàm này dùng để gọi API lấy tất cả các chiến dịch
   getAllCampaignsFromReact = async () => {
      let response = await getAllCampaigns("ALL");
      if (response && response.errCode === 0) {
         this.setState({
            arrCampaigns: response.campaigns,
         });
      }
   };

   // Hàm này dùng để mở modal thêm chiến dịch mới
   handleAddNewCampaign = () => {
      this.setState({
         isOpenModalCampaign: true,
      });
   };

   // Hàm này dùng để đóng mở modal thêm chiến dịch
   toggleCampaignModal = () => {
      this.setState({
         isOpenModalCampaign: !this.state.isOpenModalCampaign,
      });
   };

   // Hàm này dùng để đóng mở modal chỉnh sửa chiến dịch
   toggleEditCampaignModal = () => {
      this.setState({
         isOpenModalEditCampaign: !this.state.isOpenModalEditCampaign,
      });
   };

   // Hàm này dùng để tạo chiến dịch mới
   createNewCampaign = async (data) => {
      try {
         let response = await createNewCampaignService(data);
         if (response && response.errCode !== 0) {
            alert(response.errMessage);
         } else {
            await this.getAllCampaignsFromReact();
            this.setState({
               isOpenModalCampaign: false,
            });
            emitter.emit("EVENT_CLEAR_MODAL_DATA");
         }
      } catch (error) {
         console.log("createNewCampaign error: ", error);
      }
   };

   // Hàm này dùng để xóa chiến dịch
   handleDeleteCampaign = async (campaign) => {
      try {
         let response = await deleteCampaignService(campaign.id);
         if (response && response.errCode === 0) {
            await this.getAllCampaignsFromReact();
         } else {
            alert(response.errMessage);
         }
      } catch (error) {
         console.log("handleDeleteCampaign error: ", error);
      }
   };

   // Hàm này dùng để mở modal chỉnh sửa chiến dịch
   handleEditCampaign = (campaign) => {
      this.setState({
         isOpenModalEditCampaign: true,
         campaignEdit: campaign,
      });
   };

   // Hàm này dùng để sửa chiến dịch
   doEditCampaign = async (data) => {
      try {
         let response = await editCampaignService(data);
         if (response && response.errCode === 0) {
            this.setState({
               isOpenModalEditCampaign: false,
            });
            await this.getAllCampaignsFromReact();
         } else {
            alert(response.errCode);
         }
      } catch (error) {
         console.log("doEditCampaign error: ", error);
      }
   };

   // Hàm này dùng để định dạng tiền tệ
   formatPrice = (amount) => {
      if (!amount) return "0";
      const finalAmount = amount;
      return new Intl.NumberFormat("vi-VN", {
         style: "currency",
         currency: "VND",
         maximumFractionDigits: 0,
      }).format(finalAmount);
   };

   render() {
      let arrCampaigns = this.state.arrCampaigns;
      return (
         <div className="campaigns-container">
            <ModalCampaign
               isOpen={this.state.isOpenModalCampaign}
               toggleFromParent={this.toggleCampaignModal}
               createNewCampaign={this.createNewCampaign}
            />
            {this.state.isOpenModalEditCampaign && (
               <ModalEditCampaign
                  isOpen={this.state.isOpenModalEditCampaign}
                  toggleFromParent={this.toggleEditCampaignModal}
                  currentCampaign={this.state.campaignEdit}
                  editCampaign={this.doEditCampaign}
               />
            )}

            <div className="title text-center">Quản lý chiến dịch</div>
            <div className="mx-1">
               <button className="btn btn-primary px-3" onClick={() => this.handleAddNewCampaign()}>
                  <i className="fa fa-plus"></i> Thêm chiến dịch mới
               </button>
            </div>
            <div className="campaigns-table mt-3 mx-2">
               <table id="customers">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Hình ảnh</th>
                        <th>Tên chiến dịch</th>
                        <th>Tỉnh thành</th>
                        <th>Vị trí</th>
                        <th>Trạng thái</th>
                        <th>Mục tiêu</th>
                        <th>Hiện tại</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày kết thúc</th>
                        <th>Đối tác</th>
                        <th>Số người ủng hộ</th>
                        <th>Định dạng</th>
                     </tr>
                  </thead>
                  <tbody>
                     {arrCampaigns &&
                        arrCampaigns.map((item, index) => {
                           return (
                              <tr key={index}>
                                 <td>{item.id}</td>
                                 <td>
                                    {item.image && (
                                       <img
                                          src={item.image}
                                          alt={item.title}
                                          style={{
                                             width: "100px",
                                          }}
                                       />
                                    )}
                                 </td>
                                 <td>{item.title}</td>
                                 <td>{item.province.name}</td>
                                 <td>{item.position}</td>
                                 <td>{item.status}</td>
                                 <td>{this.formatPrice(item.target_amount)}</td>
                                 <td>{this.formatPrice(item.current_amount)}</td>

                                 <td>{new Date(item.start_date).toLocaleDateString()}</td>
                                 <td>{new Date(item.end_date).toLocaleDateString()}</td>

                                 <td>
                                    {item.partners.length > 0
                                       ? item.partners.map((partner, index) =>
                                            index === item.partners.length - 1 ? partner.name : `${partner.name}, `
                                         )
                                       : "Không có đối tác"}
                                 </td>
                                 <td>{item.donations.length > 0 ? item.donations.length : "Không có người ủng hộ"}</td>

                                 <td style={{ width: "111px" }}>
                                    <button className="btn-edit">
                                       <i
                                          className="fa fa-pencil-alt"
                                          onClick={() => this.handleEditCampaign(item)}
                                       ></i>
                                    </button>
                                    <button className="btn-delete" onClick={() => this.handleDeleteCampaign(item)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(CampaignManage);
