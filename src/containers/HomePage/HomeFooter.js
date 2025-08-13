import React from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss";

const HomeFooter = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="logo"></div>
        <div className="contact">
          <div className="menu">
            <div className="menu-item">
              <a>Giới thiệu</a>
              <a>Liên hệ</a>
              <a>Thực tế</a>
              <a>Chiến dịch</a>
              <a>Ủng hộ</a>
              <a>Điều khoản và Điều kiện</a>
              <a>Chính sách cookie</a>
              <a>Chính sách quyền riêng tư</a>
            </div>
          </div>
          <div className="branch">
            <div className="branch-item">
              <a>Da Nang</a>
              <a>Binh Dinh</a>
              <a>Hue</a>
              <a>Quang Nam</a>
            </div>
          </div>
        </div>
        <div className="mail">
          <div className="mail-title">
            <h1>Đăng kí nhận tin</h1>
          </div>
          <div className="mail-input">
            <h1>Email:</h1>
            <input type="text" placeholder="Nhập địa chỉ email" />
          </div>
          <div className="sign-up">
            <button className="btn">Đăng kí</button>
          </div>
        </div>
      </div>
      <div className="hr"></div>
      <div className="copy-right">
        <p>&copy; 2025 Khanh. Mọi quyền được bảo lưu.</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
