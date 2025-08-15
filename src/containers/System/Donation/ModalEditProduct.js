import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";

class ModalEditProduct extends Component {
   constructor(props) {
      super(props);
      this.state = {
         id: "", // ID sản phẩm
         name: "", // Tên sản phẩm
         description: "", // Mô tả sản phẩm
         price: "", // Giá sản phẩm
         image: "", // Đường dẫn ảnh sản phẩm
      };
   }

   // Hàm này để lấy dữ liệu từ props truyền vào và set vào state
   componentDidMount() {
      let product = this.props.currentProduct;
      if (!_.isEmpty(product)) {
         this.setState({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
         });
      }
   }

   toggle = () => {
      this.props.toggleFromParent(); // Đóng/mở modal
   };

   // Hàm này dùng để lưu giá trị của input vào state
   handleOnChangeInput = (event, id) => {
      let copyState = { ...this.state };
      copyState[id] = event.target.value;
      this.setState({
         ...copyState,
      });
   };

   // Hàm này dùng để kiểm tra tính hợp lệ của input
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

   // Hàm này dùng để lưu thông tin sản phẩm đã chỉnh sửa
   handleSaveProduct = () => {
      let isValid = this.checkValidateInput();
      if (isValid === true) {
         this.props.editProduct(this.state); // Gọi hàm editProduct từ props
      }
   };

   render() {
      return (
         <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} className={"modal-product-container"} size="lg">
            <ModalHeader toggle={() => this.toggle()}>Chỉnh sửa sản phẩm</ModalHeader>
            <ModalBody>
               <div className="modal-Product-body">
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
               <Button color="primary" className="px-3" onClick={() => this.handleSaveProduct()}>
                  Lưu thay đổi
               </Button>{" "}
               <Button color="secondary" className="px-3" onClick={() => this.toggle()}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditProduct);
