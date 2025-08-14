import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import "./JoinCampaign.scss";
import { emitter } from "../../../../utils/emitter";
import { withRouter } from "react-router-dom";
import { createNewCampaignDonationService } from "../../../../services/campaignDonationService";
import { getAllCampaigns } from "../../../../services/campaignService";
import AlertContainer from "../../../../components/AlertContainer";
const COUNTDOWN_TIME = 300; //10 giây -- 300 giây = 5 phút
class JoinCampaign extends Component {
   constructor(props) {
      super(props);
      this.state = {
         user_id: this.props.userInfo ? this.props.userInfo.id : "",
         campaign_id: this.props.match && this.props.match.params && this.props.match.params.id,
         detailCampaigns: [],
         amount: "",
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
            amount: "",
            transfer_content: "",
         });
      });
   };

   handleOnChangeInput = (event, id) => {
      //good code
      let copyState = { ...this.state };
      copyState[id] = event.target.value;
      this.setState({
         ...copyState,
      });
   };
   //hàm này dùng để kiểm tra xem input có đúng không
   checkValidateInput = () => {
      let isValid = true;
      let arrInput = ["user_id", "campaign_id", "amount"];
      for (let i = 0; i < arrInput.length; i++) {
         if (!this.state[arrInput[i]]) {
            isValid = false;
            this.showAlert("Please input " + arrInput[i], "warning");
            break;
         }
      }
      // Kiểm tra thêm nếu amount không phải số hoặc nhỏ hơn 0
      if (isValid && isNaN(this.state.amount)) {
         isValid = false;
         this.showAlert("Amount must be a number!", "warning");
      }
      if (isValid && parseFloat(this.state.amount) <= 1000) {
         isValid = false;
         this.showAlert("Amount must be greater than 1000 VND!", "warning");
      }
      return isValid;
   };
   //hàm lấy dữ liệu chuyển khoản
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
   //hàm này dùng để giới hạn thời gian chuyển khoản
   checkTransactionValidity = async () => {
      const startTime = new Date().getTime();
      const maxDuration = COUNTDOWN_TIME * 600; // 5 phút
      let transactionValid = false;
      const { amount, transfer_content } = this.state;
      while (!transactionValid && new Date().getTime() - startTime < maxDuration) {
         try {
            const data = await this.checkPaid();
            if (data.error === 0 && data.data && data.data.records.length > 0) {
               const transaction = data.data.records.find(
                  (record) =>
                     parseFloat(record.amount) === parseFloat(amount) &&
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
                  this.handleAddNewCampaignDonation();
                  break;
               }
            }
         } catch (error) {
            console.error("Lỗi khi kiểm tra giao dịch: ", error);
            this.showAlert("Error when checking transaction", "error");
         }
         await new Promise((resolve) => setTimeout(resolve, 5000)); //mỗi 5s kiểm tra 1 lần
      }
      if (!transactionValid) {
         clearInterval(this.countdownInterval);
         this.setState({ transactionStatus: "fail", showQRCode: false });
      }
   };
   //hàm này dùng để xử lý sự kiện khi click vào nút donate
   handleDonateClick = () => {
      let isValid = this.checkValidateInput();
      if (isValid) {
         this.setState({ showQRCode: true, transactionStatus: null }); // Hiển thị QR code
         this.startCountdown(); // Bắt đầu đếm ngược
         this.checkTransactionValidity(); // Kiểm tra giao dịch
      }
   };
   async handleGetCampaignDetail() {
      if (this.props.match && this.props.match.params && this.props.match.params.id) {
         let inputId = this.props.match.params.id;
         try {
            let response = await getAllCampaigns(inputId);
            if (response && response.errCode === 0) {
               this.setState({ detailCampaigns: response.campaigns });
            }
         } catch (error) {
            console.error("Error fetching campaigns:", error);
         }
      } else {
         console.log("No id found");
      }
   }
   //hàm này dùng để lưu user_id vào localStorage để khi reload trang vẫn giữ được user_id
   componentDidMount() {
      this.handleGetCampaignDetail();
      const savedUserId = localStorage.getItem("user_id");
      if (savedUserId) {
         this.setState({
            user_id: savedUserId,
         });
      }
   }
   //hàm này dùng để cập nhật lại user_id khi user đăng nhập
   componentDidUpdate(prevProps) {
      if (prevProps.userInfo !== this.props.userInfo && this.props.userInfo) {
         this.setState({
            user_id: this.props.userInfo ? this.props.userInfo.id : "",
         });
         localStorage.setItem("user_id", this.props.userInfo.id);
      }
   }
   //hàm này dùng để thêm mới campaignDonation
   handleAddNewCampaignDonation = async () => {
      let isValid = this.checkValidateInput();
      const { user_id, campaign_id, amount } = this.state;
      if (isValid === true) {
         try {
            let response = await createNewCampaignDonationService({
               user_id,
               campaign_id,
               amount,
            });
            if (response && response.errCode !== 0) {
               alert(response.errMessage);
            } else {
               emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
         } catch (error) {
            console.log("Create New Campaign Donation error: ", error);
         }
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
      console.log("su thay doi cua state ", this.state);
      const url = `https://img.vietqr.io/image/MB-00170920050-compact2.png?amount=${this.state.amount}&addInfo=${this.state.transfer_content}&accountName=GreenPaws%20Organization`;
      const { showQRCode, countdown, transactionStatus, detailCampaigns } = this.state;

      return (
         <div className="join-campaign-container">
            <div className="join-campaign-content">
               <div className="right-content">
                  {/* tạo form điền thông tin quyên góp */}
                  <div className="payment-container">
                     <div className="card cart">
                        <label className="title">JOIN CAMPAIGN</label>
                        <div className="steps">
                           <div className="step">
                              <div>
                                 <span>CAMPAIGN</span>
                                 <p>
                                    {detailCampaigns.id}, {detailCampaigns.title}
                                 </p>
                              </div>
                              <hr />
                              <div>
                                 <span>PAYMENT METHOD</span>
                                 <p>Internet Banking</p>
                                 <p>MBBank</p>
                              </div>
                              <hr />
                              <div className="promo">
                                 <span>INPUT PAYMENT INFORMATION</span>
                                 <form className="form">
                                    <input
                                       type="text"
                                       placeholder="Enter donation amount"
                                       className="input_field"
                                       onChange={(event) => this.handleOnChangeInput(event, "amount")}
                                       value={this.state.amount}
                                    />
                                    <textarea
                                       type="text"
                                       placeholder="Enter transfer content"
                                       className="input_field"
                                       onChange={(event) => this.handleOnChangeInput(event, "transfer_content")}
                                       value={this.state.transfer_content}
                                    />
                                 </form>
                              </div>
                              <hr />
                              <div className="payments">
                                 <span>PAYMENT</span>
                                 <div className="details">
                                    <span>Subtotal:</span>
                                    <span>
                                       {this.state.amount
                                          ? parseInt(this.state.amount).toLocaleString("vi-VN") + "đ"
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
                              {this.state.amount ? parseInt(this.state.amount).toLocaleString("vi-VN") + "đ" : "0đ"}
                           </label>
                           <button type="submit" className="checkout-btn" onClick={() => this.handleDonateClick()}>
                              Donate
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
                                 You have {Math.floor(countdown / 60)} m {countdown % 60} s to make transaction.
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
                                       <div className="dollar">Successful</div>
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
                                       <div className="dollar">Failed</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JoinCampaign));
