import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "../../axios";
import * as actions from "../../store/actions";
import { withRouter } from "react-router-dom";
import HomeHeader from "../HomePage/HomeHeader";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Profile.scss";
import { editUserService, getAllUsers, deleteUserService } from "../../services/userService";
import { getCartByUser } from "../../services/cartService";
import { getCampaignDonationsByUser } from "../../services/campaignDonationService";

class Profile extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrCampaignDonations: [],
         arrPurchaseCart: [],
         arrUsers: [],
         user_id: this.props.userInfo ? this.props.userInfo.id : "",
         isEditName: false,
         isOpenModalEditEmail: false,
         isEditEmail: false,
         isEditAddress: false,
         isEditPhone: false,
         phone: "",
         email: "",
         name: "",
         address: "",
      };
      this.yourAccountRef = React.createRef();
      this.securityRef = React.createRef();
      this.donationRef = React.createRef();
      this.campaignRef = React.createRef();
      this.scrollbarsRef = React.createRef();
   }

   async componentDidMount() {
      await this.getAllCampaignDonationsFromReact();
      await this.getAllUsersFromReact();
      await this.getCartByUserFromReact();
      if (this.scrollbarsRef.current) {
         this.scrollbarsRef.current.addEventListener("scroll", this.handleScroll);
      }
   }

   getAllCampaignDonationsFromReact = async () => {
      let response = await getCampaignDonationsByUser(this.state.user_id);
      if (response && response.errCode === 0) {
         this.setState({
            arrCampaignDonations: response.campaignDonations,
         });
      }
   };

   getAllUsersFromReact = async () => {
      let response = await getAllUsers(this.state.user_id);
      if (response && response.errCode === 0) {
         this.setState({
            arrUsers: response.users,
         });
      }
   };

   getCartByUserFromReact = async () => {
      let response = await getCartByUser(this.state.user_id, "purchased");
      if (response && response.errCode === 0) {
         this.setState({
            arrPurchaseCart: response.carts,
         });
      }
   };

   componentWillUnmount() {
      if (this.scrollbarsRef.current) {
         this.scrollbarsRef.current.removeEventListener("scroll", this.handleScroll);
      }
   }

   handleScroll = () => {
      const your_account = document.querySelector(".your-account-btn");
      const security = document.querySelector(".security-btn");
      const donation = document.querySelector(".donation-btn");
      const campaign = document.querySelector(".campaign-btn");
      const scrollbarsRef = this.scrollbarsRef.current.scrollTop;
      const scrollbarsRefBottom = this.scrollbarsRef.current.scrollHeight - this.scrollbarsRef.current.clientHeight;
      if (scrollbarsRef >= 0 && scrollbarsRef < 670) {
         your_account.style.backgroundColor = "rgba(205, 159, 255, 0.219)";
      } else {
         your_account.style.backgroundColor = "transparent";
      }
      if (scrollbarsRef > 670 && scrollbarsRef < 1003) {
         security.style.backgroundColor = "rgba(205, 159, 255, 0.219)";
      } else {
         security.style.backgroundColor = "transparent";
      }
      if (scrollbarsRef > 1003 && scrollbarsRef < 1007.5) {
         donation.style.backgroundColor = "rgba(205, 159, 255, 0.219)";
      } else {
         donation.style.backgroundColor = "transparent";
      }
      if (scrollbarsRef > 1007.5 && scrollbarsRef < scrollbarsRefBottom) {
         campaign.style.backgroundColor = "rgba(205, 159, 255, 0.219)";
      } else {
         campaign.style.backgroundColor = "transparent";
      }
   };

   scrollToSection = (ref) => {
      if (ref.current) {
         ref.current.scrollIntoView({ behavior: "smooth" });
      }
   };

   onChangeEditName = () => {
      this.setState({ isEditName: !this.state.isEditName });
   };

   onChangeEditEmail = () => {
      this.setState({ isEditEmail: !this.state.isEditEmail });
   };

   onChangeEditAddress = () => {
      this.setState({ isEditAddress: !this.state.isEditAddress });
   };

   onChangeEditPhone = () => {
      this.setState({ isEditPhone: !this.state.isEditPhone });
   };

   toggle = () => {
      this.setState({
         isOpenModalEditEmail: !this.state.isOpenModalEditEmail,
      });
   };

   handleNavigate = (path) => {
      this.props.history.push(path);
   };

   handleEditEmail = () => {
      this.setState({ isOpenModalEditEmail: true });
   };

   handleOnChangeInput = (event, id) => {
      let copyState = { ...this.state };
      copyState[id] = event.target.value;
      this.setState({ ...copyState });
   };

   checkValidateName = () => {
      if (!this.state.name) {
         alert("Tên là bắt buộc");
         return false;
      }
      return true;
   };

   checkValidateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.state.email || !emailPattern.test(this.state.email)) {
         alert("Định dạng email không hợp lệ");
         return false;
      }
      return true;
   };

   checkValidatePhone = () => {
      const phonePattern = /^[0-9]{10}$/;
      if (!this.state.phone || !phonePattern.test(this.state.phone)) {
         alert("Số điện thoại không hợp lệ");
         return false;
      }
      return true;
   };

   checkValidateAddress = () => {
      if (!this.state.address) {
         alert("Địa chỉ là bắt buộc");
         return false;
      }
      return true;
   };

   handleSaveName = async () => {
      if (this.checkValidateName()) {
         try {
            let response = await editUserService({
               id: this.state.user_id,
               name: this.state.name,
            });
            if (response && response.errCode === 0) {
               this.setState({
                  isEditName: false,
               });
               await this.getAllUsersFromReact();
            }
         } catch (error) {
            console.log("handleSaveName error: ", error);
         }
      }
   };

   handleSaveEmail = async () => {
      if (this.checkValidateEmail()) {
         try {
            let response = await editUserService({
               id: this.state.user_id,
               email: this.state.email,
            });
            if (response && response.errCode === 0) {
               this.setState({
                  isEditEmail: false,
               });
               this.getAllUsersFromReact();
            }
         } catch (error) {
            console.log("handleSaveEmail error: ", error);
         }
      }
   };

   handleSavePhone = async () => {
      if (this.checkValidatePhone()) {
         try {
            let response = await editUserService({
               id: this.state.user_id,
               phone: this.state.phone,
            });
            if (response && response.errCode === 0) {
               this.setState({
                  isEditPhone: false,
               });
               await this.getAllUsersFromReact();
            }
         } catch (error) {
            console.log("handleSavePhone error: ", error);
         }
      }
   };

   handleSaveAddress = async () => {
      if (this.checkValidateAddress()) {
         try {
            let response = await editUserService({
               id: this.state.user_id,
               address: this.state.address,
            });
            if (response && response.errCode === 0) {
               this.setState({
                  isEditAddress: false,
               });
               await this.getAllUsersFromReact();
            }
         } catch (error) {
            console.log("handleSaveAddress error: ", error);
         }
      }
   };

   handleDeleteUser = async () => {
      const confirmDelete = window.confirm(
         "Bạn có chắc chắn muốn xóa tài khoản của mình không? Tất cả dữ liệu liên quan đến tài khoản này cũng sẽ bị xóa."
      );
      if (confirmDelete) {
         try {
            let response = await deleteUserService(this.state.user_id);
            if (response && response.errCode === 0) {
               await this.getAllUsersFromReact();
               this.props.processLogout();
            } else {
               alert(response.errMessage);
            }
         } catch (error) {
            console.log("handleDeleteUser error: ", error);
         }
      }
   };

   render() {
      const isEditName = this.state.isEditName;
      const isEditEmail = this.state.isEditEmail;
      const isEditAddress = this.state.isEditAddress;
      const isEditPhone = this.state.isEditPhone;
      const isOpenModalEditEmail = this.state.isOpenModalEditEmail;
      const arrUsers = this.state.arrUsers;
      const arrPurchaseCarts = this.state.arrPurchaseCart;
      const createdAt = arrUsers && arrUsers.createdAt ? arrUsers.createdAt : "";
      const date = new Date(createdAt);
      const formattedDateTime = `${date.toLocaleDateString("vi-VN", {
         day: "2-digit",
         month: "2-digit",
         year: "numeric",
      })} ${date.toLocaleTimeString("vi-VN", {
         hour: "2-digit",
         minute: "2-digit",
         second: "2-digit",
         hour12: false,
      })}`;
      let arrCampaignDonations = this.state.arrCampaignDonations;
      return (
         <div>
            {isOpenModalEditEmail && (
               <Modal
                  isOpen={isOpenModalEditEmail}
                  toggle={() => this.toggle()}
                  className={"modal-email-container"}
                  size="ml"
               >
                  <ModalHeader toggle={() => this.toggle()}>Chúng tôi đã gửi mã cho bạn</ModalHeader>
                  <ModalBody>
                     <div className="modal-email-body">
                        <div className="input-container">
                           <label>
                              Trước khi thay đổi tài khoản, bạn cần nhập mã mà chúng tôi đã gửi tới{" "}
                              {arrUsers && arrUsers.email ? arrUsers.email : ""}
                           </label>
                           <label
                              style={{
                                 marginTop: "10px",
                                 fontWeight: "600",
                              }}
                           >
                              Nhập mã
                           </label>
                           <input
                              type="text"
                              onChange={(event) => this.handleOnChangeInput(event, "name")}
                              className="form-control"
                           />
                           <label
                              style={{
                                 marginTop: "10px",
                                 color: "rgb(38, 38, 38)",
                              }}
                           >
                              Chưa nhận được mã? Gửi lại trong 22 giây
                           </label>
                        </div>
                     </div>
                  </ModalBody>
                  <ModalFooter>
                     <Button color="primary" className=" px-3" onClick={() => this.onChangeEditEmail() + this.toggle()}>
                        Gửi
                     </Button>
                  </ModalFooter>
               </Modal>
            )}
            <HomeHeader />
            <div className="your-account-container">
               <div className="space" />
               <div className="your-account-content">
                  <div className="left-content">
                     <div className="overview">
                        <div className="profile-img">
                           <i class="fa fa-user-circle"></i>
                        </div>
                        <div className="overview-info">
                           <h1>{arrUsers && arrUsers.name ? arrUsers.name : ""}</h1>
                           <p>{arrUsers && arrUsers.email ? arrUsers.email : ""}</p>
                        </div>
                     </div>
                     <div className="selection">
                        <div
                           className="selection-content your-account-btn"
                           onClick={() => this.scrollToSection(this.yourAccountRef)}
                        >
                           <div className="icon">
                              <i class="fa fa-user" aria-hidden="true"></i>
                           </div>
                           <div className="selection-item">
                              <p>Tài khoản của bạn</p>
                           </div>
                        </div>
                        <div
                           className="selection-content security-btn"
                           onClick={() => this.scrollToSection(this.securityRef)}
                        >
                           <div className="icon">
                              <i class="fa fa-lock" aria-hidden="true"></i>
                           </div>
                           <div className="selection-item">
                              <p>Tài khoản và bảo mật</p>
                           </div>
                        </div>
                        <div
                           className="selection-content donation-btn"
                           onClick={() => this.scrollToSection(this.donationRef)}
                        >
                           <div className="icon">
                              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                           </div>
                           <div className="selection-item">
                              <p>Lịch sử quyên góp</p>
                           </div>
                        </div>
                        <div
                           className="selection-content campaign-btn"
                           onClick={() => this.scrollToSection(this.campaignRef)}
                        >
                           <div className="icon">
                              <i class="fa fa-credit-card" aria-hidden="true"></i>
                           </div>
                           <div className="selection-item">
                              <p>Lịch sử quyên góp chiến dịch</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="right-content" ref={this.scrollbarsRef}>
                     <div className="right-container">
                        <div className="your-account" ref={this.yourAccountRef}>
                           <div className="your-account-header">
                              <h1>Tài khoản của bạn</h1>
                           </div>
                           <div className="profile-image" style={{ height: "100px" }}>
                              <h5>Email</h5>
                              {!isEditEmail ? (
                                 <div className="profile-image-content">
                                    <div className="profile-img">
                                       <h6>{arrUsers && arrUsers.email ? arrUsers.email : ""}</h6>
                                    </div>
                                    <div className="interact-btn">
                                       <button className="change-image" onClick={() => this.onChangeEditEmail()}>
                                          Sửa
                                       </button>
                                    </div>
                                 </div>
                              ) : (
                                 <div className="edit-name">
                                    <input
                                       type="email"
                                       className="form-control"
                                       placeholder={arrUsers && arrUsers.email ? arrUsers.email : ""}
                                       value={this.state.email}
                                       onChange={(event) => this.handleOnChangeInput(event, "email")}
                                    />
                                    <button className="btn btn-light" onClick={this.onChangeEditEmail}>
                                       Hủy
                                    </button>
                                    <button className="btn btn-success" onClick={this.handleSaveEmail}>
                                       Lưu
                                    </button>
                                 </div>
                              )}
                              <hr class="_PhRSQ" />
                           </div>
                           <div className="profile-image" style={{ height: "100px" }}>
                              <h5>Tên</h5>
                              {!isEditName ? (
                                 <div className="profile-image-content">
                                    <div className="profile-img">
                                       <h6>{arrUsers && arrUsers.name ? arrUsers.name : ""}</h6>
                                    </div>
                                    <div className="interact-btn">
                                       <button className="change-image" onClick={this.onChangeEditName}>
                                          Sửa
                                       </button>
                                    </div>
                                 </div>
                              ) : (
                                 <div className="edit-name">
                                    <input
                                       type="text"
                                       className="form-control"
                                       placeholder={arrUsers && arrUsers.name ? arrUsers.name : ""}
                                       value={this.state.name}
                                       onChange={(event) => this.handleOnChangeInput(event, "name")}
                                    />
                                    <button className="btn btn-light" onClick={this.onChangeEditName}>
                                       Hủy
                                    </button>
                                    <button className="btn btn-success" onClick={this.handleSaveName}>
                                       Lưu
                                    </button>
                                 </div>
                              )}
                              <hr class="_PhRSQ" />
                           </div>
                           <div className="profile-image" style={{ height: "100px" }}>
                              <h5>Địa chỉ</h5>
                              {!isEditAddress ? (
                                 <div className="profile-image-content">
                                    <div className="profile-img">
                                       <h6>{arrUsers && arrUsers.address ? arrUsers.address : ""}</h6>
                                    </div>
                                    <div className="interact-btn">
                                       <button className="change-image" onClick={this.onChangeEditAddress}>
                                          Sửa
                                       </button>
                                    </div>
                                 </div>
                              ) : (
                                 <div className="edit-name">
                                    <input
                                       type="text"
                                       className="form-control"
                                       placeholder={arrUsers && arrUsers.address ? arrUsers.address : ""}
                                       value={this.state.address}
                                       onChange={(event) => this.handleOnChangeInput(event, "address")}
                                    />
                                    <button className="btn btn-light" onClick={this.onChangeEditAddress}>
                                       Hủy
                                    </button>
                                    <button className="btn btn-success" onClick={this.handleSaveAddress}>
                                       Lưu
                                    </button>
                                 </div>
                              )}
                              <hr class="_PhRSQ" />
                           </div>
                           <div className="profile-image" style={{ height: "100px" }}>
                              <h5>Số điện thoại</h5>
                              {!isEditPhone ? (
                                 <div className="profile-image-content">
                                    <div className="profile-img">
                                       <h6>{arrUsers && arrUsers.phone ? arrUsers.phone : ""}</h6>
                                    </div>
                                    <div className="interact-btn">
                                       <button className="change-image" onClick={this.onChangeEditPhone}>
                                          Sửa
                                       </button>
                                    </div>
                                 </div>
                              ) : (
                                 <div className="edit-name">
                                    <input
                                       type="phone"
                                       className="form-control"
                                       placeholder={arrUsers && arrUsers.phone ? arrUsers.phone : ""}
                                       value={this.state.phone}
                                       onChange={(event) => this.handleOnChangeInput(event, "phone")}
                                    />
                                    <button className="btn btn-light" onClick={this.onChangeEditPhone}>
                                       Hủy
                                    </button>
                                    <button className="btn btn-success" onClick={this.handleSavePhone}>
                                       Lưu
                                    </button>
                                 </div>
                              )}
                              <hr class="_PhRSQ" />
                           </div>
                        </div>
                        <div className="security" ref={this.securityRef}>
                           <h1>Tài khoản và bảo mật</h1>
                           <div className="change-password">
                              <div className="change-password-content">
                                 <h5>Đổi mật khẩu</h5>
                                 <div className="change-password-box">
                                    <div className="icon-box">
                                       <i class="fa fa-lock" aria-hidden="true"></i>
                                    </div>
                                    <div className="right">
                                       <h1>Mật khẩu</h1>
                                       <p>
                                          Để thêm mật khẩu vào tài khoản của bạn lần đầu tiên, bạn sẽ cần sử dụng{" "}
                                          <a>trang đặt lại mật khẩu</a> để chúng tôi xác minh danh tính của bạn.
                                       </p>
                                    </div>
                                 </div>
                                 <hr class="_PhRSQ" />
                              </div>
                           </div>
                           <div className="delete-account">
                              <h5>Xóa tài khoản của bạn</h5>
                              <p>
                                 Khi bạn xóa tài khoản của mình, bạn sẽ không thể truy cập các thiết kế của mình hoặc đăng nhập vào GreenPaws nữa. Tài khoản GreenPaws của bạn được tạo vào {formattedDateTime}.
                              </p>
                              <button onClick={this.handleDeleteUser}>Xóa tài khoản</button>
                           </div>
                        </div>
                        <hr class="_PhRSQ" />
                        <div className="donation" ref={this.donationRef}>
                           <div className="donation-title">
                              <h1>Lịch sử quyên góp</h1>
                           </div>
                           {arrPurchaseCarts &&
                              arrPurchaseCarts.map((item, index) => {
                                 return (
                                    <div key={index}>
                                       <div className="product">
                                          <div className="product-img">
                                             <img src={item.product.image}></img>
                                          </div>
                                          <div className="product-info">
                                             <h1>{item.product.name}</h1>
                                             <p>Đã mua vào: {new Date(item.createdAt).toLocaleDateString()}</p>
                                             <p>x{item.quantity}</p>
                                          </div>
                                          <div className="total-price">
                                             <h1>đ{item.total}</h1>
                                          </div>
                                       </div>
                                       <div className="repurchase-btn">
                                          <button>Mua lại</button>
                                       </div>
                                    </div>
                                 );
                              })}
                        </div>
                        <hr class="_PhRSQ" />
                        <div className="campaign" ref={this.campaignRef}>
                           <div className="campaign-title">
                              <h1>Lịch sử quyên góp chiến dịch</h1>
                           </div>
                           <div className="search">
                              <div className="input-container">
                                 <label>Vị trí</label>
                                 <input type="text" placeholder="Tìm kiếm theo mã giao dịch" className="form-control" />
                              </div>
                           </div>
                           <div className="campaign-content">
                              <table class="table  table-hover">
                                 <thead>
                                    <tr>
                                       <th scope="col">Mã giao dịch</th>
                                       <th scope="col">Chiến dịch</th>
                                       <th scope="col">Số tiền</th>
                                       <th scope="col">Hoạt động</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {arrCampaignDonations &&
                                       arrCampaignDonations.map((item, index) => {
                                          return (
                                             <tr key={index}>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.campaign.title}</td>
                                                <td>{item.amount}đ</td>
                                                <td>
                                                   <i
                                                      class="fa fa-info-circle"
                                                      aria-hidden="true"
                                                      onClick={() => this.handleNavigate("/detail/" + item.campaign_id)}
                                                   ></i>
                                                </td>
                                             </tr>
                                          );
                                       })}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
      userInfo: state.user.userInfo,
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      processLogout: () => dispatch(actions.processLogout()),
   };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
