import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProductManage.scss";
import {
   getAllProducts,
   createNewProductService,
   deleteProductService,
   editProductService,
} from "../../../services/productService";
import ModalProduct from "./ModalProduct";
import ModalEditProduct from "./ModalEditProduct";
import { emitter } from "../../../utils/emitter";

class ProductManage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrProducts: [], // Danh sách sản phẩm
         isOpenModalProduct: false, // Trạng thái mở modal thêm mới
         isOpenModalEditProduct: false, // Trạng thái mở modal chỉnh sửa
         productEdit: {}, // Sản phẩm đang chỉnh sửa
      };
   }

   // Hàm này dùng để gọi API
   async componentDidMount() {
      await this.getAllProductsFromReact();
   }

   // Hàm này dùng để gọi API
   getAllProductsFromReact = async () => {
      let response = await getAllProducts("ALL");
      if (response && response.errCode === 0) {
         this.setState({
            arrProducts: response.products, // Cập nhật danh sách sản phẩm
         });
      }
   };

   // Hàm này dùng để mở modal thêm mới sản phẩm
   handleAddNewProduct = () => {
      this.setState({
         isOpenModalProduct: true,
      });
   };

   // Hàm này dùng để đóng/mở modal sản phẩm
   toggleProductModal = () => {
      this.setState({
         isOpenModalProduct: !this.state.isOpenModalProduct,
      });
   };

   // Hàm này dùng để đóng/mở modal chỉnh sửa sản phẩm
   toggleEditProductModal = () => {
      this.setState({
         isOpenModalEditProduct: !this.state.isOpenModalEditProduct,
      });
   };

   // Hàm này dùng để tạo mới sản phẩm
   createNewProduct = async (data) => {
      try {
         let response = await createNewProductService(data);
         if (response && response.errCode !== 0) {
            alert(response.errMessage);
         } else {
            await this.getAllProductsFromReact();
            this.setState({
               isOpenModalProduct: false,
            });
            emitter.emit("EVENT_CLEAR_MODAL_DATA");
         }
      } catch (error) {
         console.log("Lỗi tạo mới sản phẩm: ", error);
      }
   };

   // Hàm này dùng để xóa sản phẩm
   handleDeleteProduct = async (product) => {
      try {
         let response = await deleteProductService(product.id);
         if (response && response.errCode === 0) {
            await this.getAllProductsFromReact();
         } else {
            alert(response.errMessage);
         }
      } catch (error) {
         console.log("Lỗi xóa sản phẩm: ", error);
      }
   };

   // Hàm này dùng để chỉnh sửa sản phẩm
   handleEditProduct = (product) => {
      this.setState({
         isOpenModalEditProduct: true,
         productEdit: product,
      });
   };

   // Hàm này dùng để sửa thông tin sản phẩm
   doEditProduct = async (data) => {
      try {
         let response = await editProductService(data);
         if (response && response.errCode === 0) {
            this.setState({
               isOpenModalEditProduct: false,
            });
            await this.getAllProductsFromReact();
         } else {
            alert(response.errCode);
         }
      } catch (error) {
         console.log("Lỗi sửa sản phẩm: ", error);
      }
   };

   // Định dạng giá tiền dưới dạng tiền tệ
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
      let arrProducts = this.state.arrProducts;
      return (
         <div className="product-container">
            <ModalProduct
               isOpen={this.state.isOpenModalProduct}
               toggleFromParent={this.toggleProductModal}
               createNewProduct={this.createNewProduct}
            />
            {this.state.isOpenModalEditProduct && (
               <ModalEditProduct
                  isOpen={this.state.isOpenModalEditProduct}
                  toggleFromParent={this.toggleEditProductModal}
                  currentProduct={this.state.productEdit}
                  editProduct={this.doEditProduct}
               />
            )}

            <div className="title text-center">Quản lý sản phẩm</div>
            <div className="mx-1">
               <button className="btn btn-primary px-3" onClick={() => this.handleAddNewProduct()}>
                  <i className="fa fa-plus"></i> Thêm mới sản phẩm
               </button>
            </div>
            <div className="products-table mt-3 mx-2">
               <table id="customers">
                  <thead>
                     <tr>
                        <th>ID Sản phẩm</th>
                        <th>Tên</th>
                        <th>Mô tả</th>
                        <th>Giá</th>
                        <th>Ảnh</th>
                        <th style={{ width: "120px" }}>Thao tác</th>
                     </tr>
                  </thead>
                  <tbody>
                     {arrProducts &&
                        arrProducts.map((item, index) => {
                           return (
                              <tr key={index}>
                                 <td>{item.id}</td>
                                 <td>{item.name}</td>
                                 <td>{item.description}</td>
                                 <td>{this.formatPrice(item.price)}</td>
                                 <td>
                                    <img
                                       src={item.image}
                                       alt={item.name}
                                       className="image"
                                       style={{ width: "100px" }}
                                    />
                                 </td>
                                 <td>
                                    <button className="btn-edit">
                                       <i className="fa fa-pencil-alt" onClick={() => this.handleEditProduct(item)}></i>
                                    </button>
                                    <button className="btn-delete" onClick={() => this.handleDeleteProduct(item)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
