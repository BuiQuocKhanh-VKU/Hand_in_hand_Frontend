import React, { Component } from "react";
import { connect } from "react-redux";
import "./PartnerManage.scss";
import {
   getAllPartners,
   createNewPartnerService,
   deletePartnerService,
   editPartnerService,
} from "../../services/partnerService";
import ModalPartner from "./ModalPartner";
import ModalEditPartner from "./ModalEditPartner";
import { emitter } from "../../utils/emitter";

class PartnerManage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrPartners: [], // Danh sách các đối tác
         isOpenModalPartner: false, // Kiểm soát modal thêm mới đối tác
         isOpenModalEditPartner: false, // Kiểm soát modal sửa đối tác
         partnerEdit: {}, // Đối tác đang được chỉnh sửa
      };
   }

   // Hàm lấy danh sách các đối tác từ API
   async componentDidMount() {
      await this.getAllPartnersFromReact();
   }

   // Gọi API lấy danh sách các đối tác
   getAllPartnersFromReact = async () => {
      let response = await getAllPartners("ALL");
      if (response && response.errCode === 0) {
         this.setState({
            arrPartners: response.partners, // Cập nhật danh sách đối tác vào state
         });
      }
   };

   // Hàm mở modal thêm mới đối tác
   handleAddNewPartner = () => {
      this.setState({
         isOpenModalPartner: true,
      });
   };

   // Hàm đóng/mở modal thêm mới đối tác
   togglePartnerModal = () => {
      this.setState({
         isOpenModalPartner: !this.state.isOpenModalPartner,
      });
   };

   // Hàm đóng/mở modal chỉnh sửa đối tác
   toggleEditPartnerModal = () => {
      this.setState({
         isOpenModalEditPartner: !this.state.isOpenModalEditPartner,
      });
   };

   // Hàm tạo mới đối tác
   createNewPartner = async (data) => {
      try {
         let response = await createNewPartnerService(data);
         if (response && response.errCode !== 0) {
            alert(response.errMessage); // Thông báo lỗi nếu không tạo được
         } else {
            await this.getAllPartnersFromReact();
            this.setState({
               isOpenModalPartner: false, // Đóng modal khi thêm thành công
            });
            emitter.emit("EVENT_CLEAR_MODAL_DATA"); // Xóa dữ liệu trong modal
         }
      } catch (error) {
         console.log("createNewPartner error: ", error);
      }
   };

   // Hàm xóa đối tác
   handleDeletePartner = async (partner) => {
      try {
         let response = await deletePartnerService(partner.id);
         if (response && response.errCode === 0) {
            await this.getAllPartnersFromReact();
         } else {
            alert(response.errMessage); // Thông báo lỗi nếu không xóa được
         }
      } catch (error) {
         console.log("handleDeletePartner error: ", error);
      }
   };

   // Hàm mở modal chỉnh sửa đối tác
   handleEditPartner = (partner) => {
      this.setState({
         isOpenModalEditPartner: true,
         partnerEdit: partner, // Lưu thông tin đối tác đang được chỉnh sửa
      });
   };

   // Hàm sửa đối tác
   doEditPartner = async (data) => {
      try {
         let response = await editPartnerService(data);
         if (response && response.errCode === 0) {
            this.setState({
               isOpenModalEditPartner: false, // Đóng modal khi sửa thành công
            });
            await this.getAllPartnersFromReact();
         } else {
            alert(response.errCode); // Thông báo lỗi nếu không sửa được
         }
      } catch (error) {
         console.log("doEditPartner error: ", error);
      }
   };

   render() {
      let arrPartners = this.state.arrPartners;
      return (
         <div className="partner-container">
            <ModalPartner
               isOpen={this.state.isOpenModalPartner}
               toggleFromParent={this.togglePartnerModal}
               createNewPartner={this.createNewPartner}
            />
            {this.state.isOpenModalEditPartner && (
               <ModalEditPartner
                  isOpen={this.state.isOpenModalEditPartner}
                  toggleFromParent={this.toggleEditPartnerModal}
                  currentPartner={this.state.partnerEdit}
                  editPartner={this.doEditPartner}
               />
            )}

            <div className="title text-center">Quản lý đối tác</div>
            <div className="mx-1">
               <button className="btn btn-primary px-3" onClick={() => this.handleAddNewPartner()}>
                  <i className="fa fa-plus"></i> Thêm mới đối tác
               </button>
            </div>
            <div className="partners-table mt-3 mx-2">
               <table id="customers">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Logo</th>
                        <th>Tên đối tác</th>
                        <th>Tên chiến dịch</th>
                        <th>Hành động</th>
                     </tr>
                  </thead>
                  <tbody>
                     {arrPartners &&
                        arrPartners.map((item, index) => {
                           return (
                              <tr key={index}>
                                 <td>{item.id}</td>
                                 <td>
                                    {
                                       <img
                                          src={item.logo}
                                          alt={item.name}
                                          className="logo"
                                          style={{ width: "100px" }}
                                       />
                                    }
                                 </td>
                                 <td>{item.name}</td>
                                 <td>{item.campaign.title}</td>
                                 <td>
                                    <button className="btn-edit">
                                       <i className="fa fa-pencil-alt" onClick={() => this.handleEditPartner(item)}></i>
                                    </button>
                                    <button className="btn-delete" onClick={() => this.handleDeletePartner(item)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(PartnerManage);
