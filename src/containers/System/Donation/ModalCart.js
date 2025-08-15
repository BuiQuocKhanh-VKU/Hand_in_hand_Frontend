import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "../../../utils/emitter";
import { getAllProducts } from "../../../services/cartService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalCart extends Component {
   // Hàm này dùng để khởi tạo state hoặc bind các function
   constructor(props) {
      super(props);
      this.state = {
         user_id: "", // ID người dùng
         productList: [], // Danh sách sản phẩm
         quantity: "", // Số lượng
         status: "", // Trạng thái
         total: "", // Tổng tiền
      };
      this.listenToEmitter(); // Gọi hàm này để lắng nghe sự kiện từ emitter
   }

   // Hàm này dùng để lắng nghe sự kiện từ emitter, dùng để clear data khi có sự kiện
   listenToEmitter = () => {
      emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
         this.setState({
            user_id: "",
            productList: [],
            quantity: "",
            status: "",
            total: "",
         });
      });
   };

   // Hàm này để lấy dữ liệu sản phẩm từ API
   componentDidMount() {
      this.loadProducts();
   }

   // Hàm này dùng để đóng/mở modal
   toggle = () => {
      this.props.toggleFromParent();
   };

   // Hàm này dùng để tải danh sách sản phẩm
   loadProducts = async () => {
      try {
         let response = await getAllProducts("ALL");
         console.log(response);
         if (response && response.errCode === 0) {
            console.log("Đang thiết lập danh sách sản phẩm:", response.Products);
            this.setState({
               productList: response.products || [], // Đảm bảo luôn gán giá trị mảng
            });
            console.log(this.state.productList);
         } else {
            console.error("Không thể tải sản phẩm: ", response.errMessage);
         }
      } catch (error) {
         console.error("Lỗi khi tải sản phẩm: ", error);
      }
   };

   // Hàm này dùng để lưu giá trị của input vào state
   handleOnChangeInput = (event, id) => {
      let copyState = { ...this.state };
      copyState[id] = event.target.value;
      this.setState({
         ...copyState,
      });
   };

   // Hàm này dùng để kiểm tra xem input có đúng không
   checkValidateInput = () => {
      let isValid = true;
      let arrInput = ["user_id", "product_id", "quantity", "total", "status"];
      for (let i = 0; i < arrInput.length; i++) {
         if (!this.state[arrInput[i]]) {
            isValid = false;
            alert("Thiếu tham số: " + arrInput[i]);
            break;
         }
      }
      return isValid;
   };

   // Hàm này dùng để thêm mới giỏ hàng
   handleAddNewCart = () => {
      let isValid = this.checkValidateInput();
      if (isValid === true) {
         this.props.createNewCart(this.state); // Gọi hàm createNewCart từ props, ở đây là từ mapDispatchToProps
      }
   };

   render() {
      return (
         <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} className={"modal-cart-container"} size="xl">
            <ModalHeader toggle={() => this.toggle()}>Tạo giỏ hàng mới</ModalHeader>
            <ModalBody>
               <div className="modal-cart-body">
                  <div className="input-container">
                     <label>ID Người dùng</label>
                     <input
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event, "user_id")}
                        value={this.state.user_id}
                        className="form-control"
                     />
                  </div>
                  <div className="input-container">
                     <label>Sản phẩm</label>
                     <select
                        className="form-control"
                        onChange={(event) => this.handleOnChangeInput(event, "product_id")}
                        value={this.state.product_id}
                     >
                        <option value="">Chọn sản phẩm</option>
                        {this.state.productList.map((product) => (
                           <option key={product.id} value={product.id}>
                              {product.name}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="input-container">
                     <label>Số lượng</label>
                     <input
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event, "quantity")}
                        value={this.state.quantity}
                        className="form-control"
                     />
                  </div>
                  <div className="input-container">
                     <label>Trạng thái</label>
                     <select
                        className="form-control"
                        value={this.state.status}
                        onChange={(event) => this.handleOnChangeInput(event, "status")}
                     >
                        <option value="">Chọn trạng thái</option>
                        <option value="pending">Chờ xử lý</option>
                        <option value="purchased">Đã mua</option>
                     </select>
                  </div>
                  <div className="input-container">
                     <label>Tổng tiền</label>
                     <input
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event, "total")}
                        value={this.state.total}
                        className="form-control"
                     />
                  </div>
               </div>
            </ModalBody>
            <ModalFooter>
               <Button color="primary" className=" px-3" onClick={() => this.handleAddNewCart()}>
                  Thêm mới
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCart);
