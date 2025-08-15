import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "../../../utils/emitter";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalProduct extends Component {
   // Hàm này dùng để khởi tạo state hoặc bind các function
   constructor(props) {
      super(props);
      this.state = {
         name: "", // Tên sản phẩm
         description: "", // Mô tả sản phẩm
         price: "", // Giá sản phẩm
         image: "", // Đường dẫn ảnh sản phẩm
      };
      this.listenToEmitter();
   }

   // Hàm này dùng để lắng nghe sự kiện từ emitter
   listenToEmitter = () => {
      emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
         this.setState({
            name: "",
            description: "",
            price: "",
            image: "",
         });
      });
   };

   componentDidMount() {}

   // Hàm này dùng để đóng/mở modal
   toggle = () => {
      this.props.toggleFromParent();
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
      let arrInput = ["name", "description", "price", "image"];
      for (let i = 0; i < arrInput.length; i++) {
         if (!this.state[arrInput[i]]) {
            isValid = false;
            alert("Thiếu tham số: " + arrInput[i]);
            break;
         }
      }
      return isValid;
   };

   // Hàm này dùng để thêm mới sản phẩm
   handleAddNewProduct = () => {
      let isValid = this.checkValidateInput();
      if (isValid === true) {
         this.props.createNewProduct(this.state); // Gọi hàm createNewProduct từ props
      }
   };

   render() {
      return (
         <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} className={"modal-product-container"} size="xl">
            <ModalHeader toggle={() => this.toggle()}>Tạo mới sản phẩm</ModalHeader>
            <ModalBody>
               <div className="modal-product-body">
                  <div className="input-container">
                     <label>Tên sản phẩm</label>
                     <input
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event, "name")}
                        value={this.state.name}
                        className="form-control"
                     />
                  </div>
                  <div className="input-container">
                     <label>Mô tả</label>
                     <input
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event, "description")}
                        value={this.state.description}
                        className="form-control"
                     />
                  </div>
                  <div className="input-container">
                     <label>Giá</label>
                     <input
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event, "price")}
                        value={this.state.price}
                        className="form-control"
                     />
                  </div>
                  <div className="input-container">
                     <label>Đường dẫn ảnh</label>
                     <input
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event, "image")}
                        value={this.state.image}
                        className="form-control"
                     />
                  </div>
               </div>
            </ModalBody>
            <ModalFooter>
               <Button color="primary" className=" px-3" onClick={() => this.handleAddNewProduct()}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);
