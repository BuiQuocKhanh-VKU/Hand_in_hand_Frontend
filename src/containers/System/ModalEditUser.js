import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            email: "",
            phone: "",
            address: "",
            role: "",
        };
    }
    //hàm này để lấy dữ liệu từ props truyền vào và set vào state
    componentDidMount() {
        let user = this.props.currentUser;
        if (!_.isEmpty(user)) {
            this.setState({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            });
        }
    }
    toggle = () => {
        this.props.toggleFromParent();
    };
    handleOnChangeInput = (event, id) => {
        //good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ["name", "email", "phone", "address", "role"];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing parameter: " + arrInput[i]);
                break;
            }
        }
        return isValid;
    };
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.editUser(this.state);
        }
    };
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={"modal-user-container"}
                size="lg"
            >
                <ModalHeader toggle={() => this.toggle()}>
                    Chỉnh sửa người tham gia
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Tên</label>
                            <input
                                type="text"
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "name")
                                }
                                value={this.state.name}
                                className="form-control"
                            />
                        </div>
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "email")
                                }
                                value={this.state.email}
                                className="form-control"
                            />
                        </div>
                        <div className="input-container">
                            <label>SĐT</label>
                            <input
                                type="phone"
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "phone")
                                }
                                value={this.state.phone}
                                className="form-control"
                            />
                        </div>
                        <div className="input-container">
                            <label>Địa chỉ</label>
                            <input
                                type="text"
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "address")
                                }
                                value={this.state.address}
                                className="form-control"
                            />
                        </div>
                        <div className="input-container">
                            <label>Vai trò</label>
                            {/* dropdown */}
                            <select
                                className="form-control"
                                value={this.state.role}
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "role")
                                }
                            >
                                <option value="user">Người tham gia</option>
                                <option value="admin">Quản lí</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className=" px-3"
                        onClick={() => this.handleSaveUser()}
                    >
                        Lưu thay đổi
                    </Button>{" "}
                    <Button
                        color="secondary"
                        className=" px-3"
                        onClick={() => this.toggle()}
                    >
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
