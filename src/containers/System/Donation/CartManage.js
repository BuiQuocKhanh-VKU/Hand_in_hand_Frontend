import React, { Component } from "react";
import { connect } from "react-redux";
import "./CartManage.scss";
import {
    getAllCarts,
    createNewCartService,
    deleteCartService,
    editCartService
} from "../../../services/cartService";
import ModalCart from "./ModalCart";
import ModalEditCart from "./ModalEditCart";
import { emitter } from "../../../utils/emitter";

class CartManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCarts: [], // Danh sách giỏ hàng
            isOpenModalCart: false, // Trạng thái mở modal thêm giỏ hàng
            isOpenModalEditCart: false, // Trạng thái mở modal chỉnh sửa giỏ hàng
            cartEdit: {}, // Giỏ hàng đang chỉnh sửa
        };
    }

    // Gọi API để lấy tất cả giỏ hàng
    async componentDidMount() {
        await this.getAllCartsFromReact();
    }

    // Lấy tất cả giỏ hàng từ API
    getAllCartsFromReact = async () => {
        let response = await getAllCarts("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                arrCarts: response.carts, // Cập nhật danh sách giỏ hàng
            });
        }
    };

    // Mở modal thêm mới giỏ hàng
    handleAddNewCart = () => {
        this.setState({
            isOpenModalCart: true,
        });
    };

    // Đóng/mở modal giỏ hàng
    toggleCartModal = () => {
        this.setState({
            isOpenModalCart: !this.state.isOpenModalCart,
        });
    };

    // Đóng/mở modal chỉnh sửa giỏ hàng
    toggleEditCartModal = () => {
        this.setState({
            isOpenModalEditCart: !this.state.isOpenModalEditCart,
        });
    };

    // Tạo mới giỏ hàng
    createNewCart = async (data) => {
        try {
            let response = await createNewCartService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllCartsFromReact();
                this.setState({
                    isOpenModalCart: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
        } catch (error) {
            console.log("createNewCart error: ", error);
        }
    };

    // Xóa giỏ hàng
    handleDeleteCart = async (cart) => {
        try {
            let response = await deleteCartService(cart.id);
            if (response && response.errCode === 0) {
                await this.getAllCartsFromReact();
            } else {
                alert(response.errMessage);
            }
        } catch (error) {
            console.log("handleDeleteCart error: ", error);
        }
    };

    // Mở modal chỉnh sửa giỏ hàng
    handleEditCart = (cart) => {
        this.setState({
            isOpenModalEditCart: true,
            cartEdit: cart,
        });
    };

    // Chỉnh sửa giỏ hàng
    doEditCart = async (data) => {
        try {
            let response = await editCartService(data);
            console.log("doEditCart: ", data);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditCart: false,
                });
                await this.getAllCartsFromReact();
            } else {
                alert(response.errCode);
            }
        } catch (error) {
            console.log("doEditCart error: ", error);
        }
    };

    // Định dạng số tiền
    formatPrice = (amount) => {
        if (!amount) return "0";
        const finalAmount = amount; 
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0,
        }).format(finalAmount);  // Định dạng dưới dạng tiền tệ
    };

    render() {
        let arrCarts = this.state.arrCarts;
        return (
            <div className="cart-container">
                <ModalCart
                    isOpen={this.state.isOpenModalCart}
                    toggleFromParent={this.toggleCartModal}
                    createNewCart={this.createNewCart}
                />
                {this.state.isOpenModalEditCart && (
                    <ModalEditCart
                        isOpen={this.state.isOpenModalEditCart}
                        toggleFromParent={this.toggleEditCartModal}
                        currentCart={this.state.cartEdit}
                        editCart={this.doEditCart}
                    />
                )}

                <div className="title text-center">Quản lý giỏ hàng</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewCart()}
                    >
                        <i className="fa fa-plus"></i> Thêm mới giỏ hàng
                    </button>
                </div>
                <div className="carts-table mt-3 mx-2">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>ID Giỏ hàng</th>
                                <th>ID Người dùng</th>
                                <th>Người dùng</th>
                                <th>ID Sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>                              
                            </tr>
                        </thead>
                        <tbody>
                            {arrCarts &&
                                arrCarts.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.user_id}</td>
                                            <td>{item.user.name}</td>
                                            <td>{item.product_id}</td>
                                            <td>{item.quantity}</td>
                                            <td>{this.formatPrice(item.total)}</td>
                                            <td>{item.status}</td>

                                            <td>
                                                <button className="btn-edit">
                                                    <i
                                                        className="fa fa-pencil-alt"
                                                        onClick={() =>
                                                            this.handleEditCart(item)
                                                        }
                                                    ></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() =>
                                                        this.handleDeleteCart(item)
                                                    }
                                                >
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

export default connect(mapStateToProps, mapDispatchToProps)(CartManage);
