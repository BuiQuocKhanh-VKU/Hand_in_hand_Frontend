import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        };
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    // Lấy tất cả người dùng
    getAllUsersFromReact = async () => {
        let response = await getAllUsers("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    };

    // Mở modal thêm người dùng
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };

    // Đóng/mở modal người dùng
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };

    // Đóng/mở modal chỉnh sửa người dùng
    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        });
    };

    // Tạo người dùng mới
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
        } catch (error) {
            console.log("createNewUser error: ", error);
        }
    };

    // Xóa người dùng
    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id);
            if (response && response.errCode === 0) {
                await this.getAllUsersFromReact();
            } else {
                alert(response.errMessage);
            }
        } catch (error) {
            console.log("handleDeleteUser error: ", error);
        }
    };

    // Chỉnh sửa thông tin người dùng
    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        });
    };

    // Lưu thay đổi khi chỉnh sửa người dùng
    doEditUser = async (data) => {
        try {
            let response = await editUserService(data);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false,
                });
                await this.getAllUsersFromReact();
            } else {
                alert(response.errCode);
            }
        } catch (error) {
            console.log("doEditUser error: ", error);
        }
    };

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser && (
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                )}

                <div className="title text-center">Quản lý người tham gia</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        style={{ marginLeft: "10px" }}
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fa fa-plus"></i> Thêm người mới
                    </button>
                </div>
                <div className="users-table mt-3 mx-2">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>Vai trò</th>
                                <th>SĐT</th>
                                <th>Địa chỉ</th>
                                <th>Đinh dạng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers &&
                                arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit">
                                                    <i
                                                        className="fa fa-pencil-alt"
                                                        onClick={() => this.handleEditUser(item)}
                                                    ></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => this.handleDeleteUser(item)}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
