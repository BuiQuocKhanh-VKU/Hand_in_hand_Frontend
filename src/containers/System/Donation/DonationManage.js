import React, { Component } from "react";
import { connect } from "react-redux";
import "./DonationManage.scss";
import { getAllDonations, deleteDonationService } from "../../../services/donationService";
import { emitter } from "../../../utils/emitter";

class DonationManage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrDonations: [], // Danh sách các khoản đóng góp
         isOpenModalDonation: false, // Trạng thái modal thêm mới
         isOpenModalEditDonation: false, // Trạng thái modal chỉnh sửa
         donationEdit: {}, // Khoản đóng góp đang chỉnh sửa
      };
   }

   // Hàm này dùng để gọi API
   async componentDidMount() {
      await this.getAllDonationsFromReact();
   }

   // Hàm này dùng để gọi API
   getAllDonationsFromReact = async () => {
      let response = await getAllDonations("ALL");
      console.log("Kiểm tra phản hồi: ", response);
      if (response && response.errCode === 0) {
         this.setState({
            arrDonations: response.donations, // Cập nhật danh sách các khoản đóng góp
         });
      }
   };

   // Hàm này dùng để xóa khoản đóng góp
   handleDeleteDonation = async (donation) => {
      try {
         let response = await deleteDonationService(donation.id);
         if (response && response.errCode === 0) {
            await this.getAllDonationsFromReact();
         } else {
            alert(response.errMessage);
         }
      } catch (error) {
         console.log("Lỗi xóa khoản đóng góp: ", error);
      }
   };

   // Định dạng số tiền thành tiền tệ
   formatPrice = (amount) => {
      if (!amount) return "0";
      const finalAmount = amount;
      return new Intl.NumberFormat("vi-VN", {
         style: "currency",
         currency: "VND",
         maximumFractionDigits: 0,
      }).format(finalAmount); // Định dạng dưới dạng tiền tệ
   };

   render() {
      console.log("Kiểm tra state: ", this.state);
      let arrDonations = this.state.arrDonations;
      return (
         <div className="donation-container">
            <div className="title text-center">Quản lý các khoản đóng góp</div>
            <div className="donations-table mt-5 mx-3">
               <table id="customers">
                  <thead>
                     <tr>
                        <th>ID khoản đóng góp</th>
                        <th>ID người dùng</th>
                        <th>Người dùng</th>
                        <th>Tổng số tiền</th>
                        <th>Thao tác</th>
                     </tr>
                  </thead>
                  <tbody>
                     {arrDonations &&
                        arrDonations.map((item, index) => {
                           return (
                              <tr key={index}>
                                 <td>{item.id}</td>
                                 <td>{item.user_id}</td>
                                 <td>{item.user.name}</td>
                                 <td>{this.formatPrice(item.total_amount)}</td>

                                 <td>
                                    <button className="btn-edit">
                                       <i
                                          className="fa fa-pencil-alt"
                                          onClick={() => this.handleEditDonation(item)}
                                       ></i>
                                    </button>
                                    <button className="btn-delete" onClick={() => this.handleDeleteDonation(item)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(DonationManage);
