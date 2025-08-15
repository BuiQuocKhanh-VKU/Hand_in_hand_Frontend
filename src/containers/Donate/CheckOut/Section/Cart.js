import React, { Component } from "react";
import { connect } from "react-redux";
import "./Cart.scss";
import { withRouter } from "react-router-dom";
import { getCartByUser, deleteCartService, editCartService } from "../../../../services/cartService";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { createNewDonationService } from "../../../../services/donationService";

class Cart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         user_id: this.props.userInfo ? this.props.userInfo.id : "",
         arrCarts: [], // Gồm image, name, quantity, total
         total_amount: "",
         status_purchased: "purchased",
         isOpenModalQR: false,
      };
   }

   handleNavigate = (path) => {
      this.props.history.push(path);
   };

   formatPrice = (amount) => {
      if (!amount) return "0";
      const finalAmount = amount;
      return new Intl.NumberFormat("vi-VN", {
         style: "currency",
         currency: "VND",
         maximumFractionDigits: 0,
      }).format(finalAmount); // Định dạng dưới dạng tiền tệ
   };

   async componentDidMount() {
      await this.getAllCartsFromReact();
      this.setState({
         total_amount: this.calculateTotalAmount(),
      });
      console.log("state", this.state);
   }

   getAllCartsFromReact = async () => {
      let response = await getCartByUser(this.state.user_id, "pending");
      if (response && response.errCode === 0) {
         this.setState({
            arrCarts: response.carts,
         });
      }
   };

   handleDeleteCart = async (cart) => {
      try {
         let response = await deleteCartService(cart.id);
         if (response && response.errCode === 0) {
            await this.getAllCartsFromReact();
         } else {
            alert(response.errMessage);
         }
      } catch (e) {
         console.log("handleDeleteDonation error: ", e);
      }
   };

   calculateSubtotal = () => {
      const { arrCarts } = this.state;
      let subtotal = 0;
      if (arrCarts && arrCarts.length > 0) {
         subtotal = arrCarts.reduce((acc, item) => {
            const itemTotal = parseFloat(item.total) || 0; // Chuyển đổi thành số, dùng 0 nếu không hợp lệ
            return acc + itemTotal;
         }, 0);
      }
      return subtotal;
   };

   calculateTotalAmount = () => {
      const { arrCarts } = this.state;
      let total_amount = 0;
      if (arrCarts && arrCarts.length > 0) {
         total_amount = arrCarts.reduce((acc, item) => {
            const itemTotal = parseFloat(item.total) || 0;
            return acc + itemTotal;
         }, 0);
      }

      const result = total_amount * 1.1; // Thêm 10%
      return result;
   };

   toggle = () => {
      this.setState({
         isOpenModalQR: !this.state.isOpenModalQR,
      });
   };

   handleAddNewDonation = async () => {
      const { total_amount, user_id, arrCarts } = this.state;
      console.log("Biến truyền vào để tạo donation", { total_amount, user_id });
      try {
         let response = await createNewDonationService({
            total_amount: total_amount,
            user_id: user_id,
         });
         if (response && response.errCode === 0) {
            console.log("Đã tạo donation thành công. Cập nhật tất cả các giỏ hàng...");

            try {
               const updatePromises = arrCarts.map((cart) =>
                  editCartService({
                     id: cart.id,
                     product_id: cart.product_id,
                     quantity: cart.quantity,
                     user_id: cart.user_id,
                     status: "purchased",
                  })
               );

               await Promise.all(updatePromises);

               console.log("Cập nhật tất cả giỏ hàng thành công.");
            } catch (error) {
               console.error("Lỗi khi cập nhật giỏ hàng:", error);
            }
            await this.getAllCartsFromReact();
            alert("Tạo donation thành công");
         }
      } catch (error) {
         console.log("handleAddNewCampaignDonation error: ", error);
      }
   };

   render() {
      const { userInfo } = this.props;
      const userEmail = userInfo ? userInfo.email : "";
      let arrCarts = this.state.arrCarts;
      let isOpenModalQR = this.state.isOpenModalQR;

      return (
         <React.Fragment>
            {isOpenModalQR && (
               <Modal isOpen={isOpenModalQR} toggle={() => this.toggle()} className={"modal-email-container"} size="ml">
                  <ModalHeader toggle={() => this.toggle()}>Vui lòng thanh toán để tiếp tục</ModalHeader>
                  <ModalBody>
                     <div className="modal-email-body">
                        <div className="input-container">
                           <label>Trước khi thay đổi tài khoản, bạn cần nhập mã mà chúng tôi đã gửi đến</label>
                           <label
                              style={{
                                 marginTop: "10px",
                                 fontWeight: "600",
                              }}
                           >
                              Nhập mã
                           </label>
                        </div>
                     </div>
                  </ModalBody>
               </Modal>
            )}
            <div className="Cart-container">
               <div className="banner"></div>
               <div className="cart_content">
                  <div className="left_content">
                     <div className="left_content_inner">
                        <div className="page_title">
                           <h1>Giỏ hàng</h1>
                        </div>
                        <div className="cart_item">
                           {arrCarts.length > 0 ? (
                              arrCarts &&
                              arrCarts.map((item) => (
                                 <div className="cart_item_inner">
                                    <div className="cart_item_content">
                                       <div className="cart_item_img">
                                          {item.product.image && (
                                             <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                style={{
                                                   width: "70px",
                                                   height: "70px",
                                                   marginRight: "11px",
                                                   borderRadius: "5px",
                                                }}
                                             />
                                          )}
                                       </div>
                                       <div className="cart_item_wrap">
                                          <div className="cart_item_wrap_top">
                                             <div className="name_item">
                                                <p>{item.product.name}</p>
                                             </div>
                                             <div className="remove_item">
                                                <span className="item-name">
                                                   <button
                                                      className="remove_button"
                                                      onClick={() => this.handleDeleteCart(item)}
                                                   >
                                                      <i class="fa fa-times" aria-hidden="true"></i>
                                                   </button>
                                                </span>
                                             </div>
                                          </div>
                                          <div className="cart_item_wrap_bottom">
                                             <div className="cart_item_quantity">
                                                <div className="cart_item_quantity_inner">
                                                   <span className="seclect_quantity">Số lượng: {item.quantity}</span>
                                                   <div className="arrow_column">
                                                      <div className="arrow">▲</div>
                                                      <div className="arrow">▼</div>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="cart_item_price">
                                                <div className="cart_item_price_inner">
                                                   {this.formatPrice(item.total)}
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              ))
                           ) : (
                              <p>Giỏ hàng của bạn đang trống.</p>
                           )}
                        </div>
                        <hr></hr>
                        <table className="summary">
                           <tbody className="summary_body">
                              <tr className="summary_row_item">
                                 <td className="summary_row_item_title">Tổng phụ</td>
                                 <td className="summary_row_item_price">
                                    {this.formatPrice(this.calculateSubtotal())}
                                 </td>
                              </tr>
                              <tr className="summary_row_tip">
                                 <td className="summary_row_tip_title">Tiền thưởng</td>
                                 <td className="summary_row_tip_price">10%</td>
                              </tr>
                           </tbody>
                           <tbody className="summary_body">
                              <tr className="summary_row_total">
                                 <td className="summary_row_total_title">Tổng cộng</td>
                                 <td className="summary_row_total_price">
                                    <span className="summary_total">
                                       {this.formatPrice(this.calculateTotalAmount())}
                                    </span>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                        <div className="shopping_continue">
                           <div className="shopping_continue_inner">
                              Đang tìm thêm cây để trồng?
                              <p> Tiếp tục chọn lựa</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="right_content">
                     <div className="right_content_inner">
                        <div className="right_title">
                           <h1>Thanh toán</h1>
                        </div>
                        <div className="right_email">
                           <div className="right_email_text">
                              <p>Địa chỉ này sẽ được sử dụng để gửi thông tin cập nhật trạng thái đơn hàng cho bạn.</p>{" "}
                           </div>
                           <div className="email_container">
                              <input
                                 type="email"
                                 className="email_input"
                                 placeholder="Nhập email của bạn"
                                 required
                                 value={userEmail} // Gán giá trị email của người dùng
                                 readOnly // Giúp ngừng chỉnh sửa nếu không muốn người dùng sửa email
                              />
                           </div>
                        </div>
                        <div className="right_checkout_needAgreement">
                           <div className="right_checkout_button">
                              <button className="checkout_button" onClick={() => this.handleAddNewDonation()}>
                                 Thanh toán
                              </button>
                           </div>
                           <div className="right_checkout_needAgreement_text">
                              <i className="fas fa-lock"></i>
                              <p>Tất cả dữ liệu được truyền mã hóa qua kết nối TLS bảo mật.</p>
                           </div>
                        </div>

                        <div className="right_next">
                           <hr></hr>
                           <div className="next_top">
                              <h3>Thông tin thanh toán</h3>
                              <p>Chọn phương thức thanh toán và nhập thông tin thanh toán của bạn.</p>
                           </div>
                           <div className="next_bottom">
                              <h3>Xác nhận đơn hàng</h3>
                              <p>Đặt hàng và nhận email xác nhận.</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </React.Fragment>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
