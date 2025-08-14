import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Payment.scss";
import { emitter } from "../../../../utils/emitter";
import { withRouter } from "react-router-dom";
import { createNewDonationService } from "../../../../services/donationService";
import { getAllCarts } from "../../../../services/cartService";
import AlertContainer from "../../../../components/AlertContainer";

const COUNTDOWN_TIME = 300; // 10 giây -- 300 giây = 5 phút

class Payment extends Component {
   constructor(props) {
      super(props);
      this.state = {
         user_id: this.props.userInfo ? this.props.userInfo.id : "",
         cartItem_id: this.props.match && this.props.match.params && this.props.match.params.id,
         detailPayment: [],
         total_amount: "",
         transfer_content: "",
         showQRCode: false,
         transactionStatus: null,
      };
      this.alertRef = React.createRef();
      this.listenToEmitter();
   }

   showAlert = (message, type) => {
      this.alertRef.current.showAlert(message, type);
   };

   listenToEmitter = () => {
      emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
         this.setState({
            user_id: this.props.userInfo ? this.props.userInfo.id : "",
            total_amount: "",
            transfer_content: "",
         });
      });
   };

   handleOnChangeInput = (event, id) => {
      let copyState = { ...this.state };
      copyState[id] = event.target.value;
      this.setState({
         ...copyState,
      });
   };

   // Kiểm tra xem input có đúng không
   checkValidateInput = () => {
      let isValid = true;
      let arrInput = ["user_id", "cartItem_id", "total_amount"];
      for (let i = 0; i < arrInput.length; i++) {
         if (!this.state[arrInput[i]]) {
            isValid = false;
            this.showAlert("Vui lòng nhập " + arrInput[i], "warning");
            break;
         }
      }
      // Kiểm tra thêm nếu amount không phải số hoặc nhỏ hơn 0
      if (isValid && isNaN(this.state.total_amount)) {
         isValid = false;
         this.showAlert("Số tiền phải là một số!", "warning");
      }
      if (isValid && parseFloat(this.state.total_amount) <= 1000) {
         isValid = false;
         this.showAlert("Số tiền phải lớn hơn 1000 VND!", "warning");
      }
      return isValid;
   };

   // Lấy dữ liệu chuyển khoản
   async checkPaid() {
      const API_KEY =
         "AK_CS.7ff8b6d0bdd311ef9cf3ed0b3d7702f1.DVYCoU7C36BG4vFZBpGsCyHH2KbQfzyjqbVMZg7cKk54ckCiHIdcPSWCei8cMetNoH8d2rxN";
      const API_URL = "https://oauth.casso.vn/v2/transactions";
      const response = await fetch(API_URL, {
         headers: {
            Authorization: `apikey ${API_KEY}`,
            "Content-Type": "application/json",
         },
      });
      const data = await response.json();
      return data;
   }

   // Kiểm tra tính hợp lệ của giao dịch
   checkTransactionValidity = async () => {
      const startTime = new Date().getTime();
      const maxDuration = COUNTDOWN_TIME * 600; // 5 phút
      let transactionValid = false;
      const { total_amount, transfer_content } = this.state;
      while (!transactionValid && new Date().getTime() - startTime < maxDuration) {
         try {
            const data = await this.checkPaid();
            if (data.error === 0 && data.data && data.data.records.length > 0) {
               const transaction = data.data.records.find(
                  (record) =>
                     parseFloat(record.total_amount) === parseFloat(total_amount) &&
                     record.description.includes(transfer_content) &&
                     new Date(record.when).getTime() >= startTime
               );
               if (transaction) {
                  transactionValid = true;
                  clearInterval(this.countdownInterval); // Dừng đếm ngược
                  this.setState({
                     transactionStatus: "success",
                     showQRCode: false,
                  }); // Hiển thị thông báo giao dịch thành công
                  this.handleAddNewPaymentDonation();
                  break;
               }
            }
         } catch (error) {
            this.showAlert("Lỗi khi kiểm tra giao dịch", "error");
         }
         await new Promise((resolve) => setTimeout(resolve, 5000)); // Mỗi 5 giây kiểm tra một lần
      }
      if (!transactionValid) {
         clearInterval(this.countdownInterval);
         this.setState({ transactionStatus: "fail", showQRCode: false });
      }
   };

   // Xử lý sự kiện khi click vào nút donate
   handleDonateClick = () => {
      let isValid = this.checkValidateInput();
      if (isValid) {
         this.setState({ showQRCode: true, transactionStatus: null }); // Hiển thị QR code
         this.startCountdown(); // Bắt đầu đếm ngược
         this.checkTransactionValidity(); // Kiểm tra giao dịch
      }
   };

   async handleGetDonationDetail() {
      if (this.props.match && this.props.match.params && this.props.match.params.id) {
         let inputId = this.props.match.params.id;
         try {
            let response = await getAllCarts(inputId);
            if (response && response.errCode === 0) {
               this.setState({ detailPayment: response.campaigns });
            }
         } catch (error) {}
      }
   }

   // Lưu user_id vào localStorage để khi reload trang vẫn giữ được user_id
   componentDidMount() {
      this.handleGetDonationDetail();
      const savedUserId = localStorage.getItem("user_id");
      if (savedUserId) {
         this.setState({
            user_id: savedUserId,
         });
      }
   }

   // Cập nhật lại user_id khi user đăng nhập
   componentDidUpdate(prevProps) {
      if (prevProps.userInfo !== this.props.userInfo && this.props.userInfo) {
         this.setState({
            user_id: this.props.userInfo ? this.props.userInfo.id : "",
         });
         localStorage.setItem("user_id", this.props.userInfo.id);
      }
   }

   // Thêm mới donation
   handleAddNewPaymentDonation = async () => {
      let isValid = this.checkValidateInput();
      const { user_id, cartItem_id, total_amount } = this.state;
      if (isValid === true) {
         try {
            let response = await createNewDonationService({
               user_id,
               cartItem_id,
               total_amount,
            });
            if (response && response.errCode !== 0) {
               alert(response.errMessage);
            } else {
               emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
         } catch (error) {}
      }
   };

   startCountdown = () => {
      this.setState({ countdown: COUNTDOWN_TIME }); // 300 giây = 5 phút
      this.countdownInterval = setInterval(() => {
         this.setState((prevState) => {
            if (prevState.countdown <= 1) {
               clearInterval(this.countdownInterval);
               emitter.emit("EVENT_CLEAR_MODAL_DATA");
               return { countdown: 0, showQRCode: false }; // Hết giờ, ẩn mã QR
            }
            return { countdown: prevState.countdown - 1 };
         });
      }, 1000); // Cập nhật mỗi giây
   };

   render() {
      const url = `https://img.vietqr.io/image/MB-00170920050-compact2.png?amount=${this.state.total_amount}&addInfo=${this.state.transfer_content}&accountName=GreenPaws%20Organization`;
      const { showQRCode, countdown, transactionStatus, detailPayment } = this.state;

      return (
         <div className="payment-container">
            <div className="payment-content">
               <div className="right-content">
                  <div className="payment-container">
                     <div className="card cart">
                        <label className="title">THANH TOÁN</label>
                        <div className="steps">
                           <div className="step">
                              <div>
                                 <span>QUYÊN GÓP</span>
                                 <p>
                                    {detailPayment.id}, {detailPayment.title}
                                 </p>
                              </div>
                              <hr />
                              <div>
                                 <span>PHƯƠNG THỨC THANH TOÁN</span>
                                 <p>Ngân hàng trực tuyến</p>
                                 <p>MBBank</p>
                              </div>
                              <hr />
                              <div className="promo">
                                 <span>NHẬP THÔNG TIN THANH TOÁN</span>
                                 <form className="form">
                                    <input
                                       type="text"
                                       placeholder="Nhập số tiền quyên góp"
                                       className="input_field"
                                       onChange={(event) => this.handleOnChangeInput(event, "total_amount")}
                                       value={this.state.total_amount}
                                    />
                                    <textarea
                                       type="text"
                                       placeholder="Nhập nội dung chuyển khoản"
                                       className="input_field"
                                       onChange={(event) => this.handleOnChangeInput(event, "transfer_content")}
                                       value={this.state.transfer_content}
                                    />
                                 </form>
                              </div>
                              <hr />
                              <div className="payments">
                                 <span>THANH TOÁN</span>
                                 <div className="details">
                                    <span>Tổng phụ:</span>
                                    <span>
                                       {this.state.total_amount
                                          ? parseInt(this.state.total_amount).toLocaleString("vi-VN") + "đ"
                                          : "0đ"}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="card checkout">
                        <div className="footer">
                           <label className="price">
                              {this.state.total_amount
                                 ? parseInt(this.state.total_amount).toLocaleString("vi-VN") + "đ"
                                 : "0đ"}
                           </label>
                           <button type="submit" className="checkout-btn" onClick={() => this.handleDonateClick()}>
                              Quyên góp
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="left-content">
                  <div className="filter">
                     <div className="qr">
                        {transactionStatus === null && showQRCode ? (
                           <>
                              <img src={url} alt="qr" />
                              <p>
                                 Bạn còn {Math.floor(countdown / 60)} phút {countdown % 60} giây để thực hiện giao dịch.
                              </p>
                           </>
                        ) : transactionStatus === "success" ? (
                           <div className="success-container">
                              <div className="left-side">
                                 <div className="card">
                                    <div className="card-line"></div>
                                    <div className="buttons"></div>
                                 </div>
                                 <div className="post">
                                    <div className="post-line"></div>
                                    <div className="screen">
                                       <div className="dollar">Thành công</div>
                                    </div>
                                    <div className="numbers"></div>
                                    <div className="numbers-line2"></div>
                                 </div>
                              </div>
                              <div className="right-side"></div>
                           </div>
                        ) : transactionStatus === "fail" ? (
                           <div className="fail-container">
                              <div className="left-side">
                                 <div className="card">
                                    <div className="card-line"></div>
                                    <div className="buttons"></div>
                                 </div>
                                 <div className="post">
                                    <div className="post-line"></div>
                                    <div className="screen">
                                       <div className="dollar">Thất bại</div>
                                    </div>
                                    <div className="numbers"></div>
                                    <div className="numbers-line2"></div>
                                 </div>
                              </div>
                              <div className="right-side"></div>
                           </div>
                        ) : null}
                     </div>
                  </div>
               </div>
            </div>
            <AlertContainer ref={this.alertRef} />
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
      language: state.app.language,
      userInfo: state.user.userInfo,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Payment));
