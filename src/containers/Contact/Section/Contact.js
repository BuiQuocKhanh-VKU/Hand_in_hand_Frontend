import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl"; // Đa ngôn ngữ
import "./Contact.scss";

class Contact extends Component {
   render() {
      return (
         <div className="Contact-container">
            <div className="transparent"></div>
            <div className="Contact-content">
               <div className="Contact-content-top">
                  <div className="top-bg">
                     <div className="text-contact">Liên hệ Hand in Hand</div>
                  </div>
               </div>
               <div className="Contact-content-bottom">
                  <div className="bottom-content">
                     <div className="bottom-content-left">
                        <div className="bottom-content-left-top">
                           <h3>
                              <span>Liên hệ với chúng tôi</span>
                           </h3>
                        </div>
                        <div className="bottom-content-left-middle">
                           <p>Chúng tôi cam kết hỗ trợ bạn trong khả năng tốt nhất.</p>
                           <p>Hãy để lại thông tin và chúng tôi sẽ liên lạc lại với bạn sớm nhất.</p>
                        </div>
                        <div className="bottom-content-left-under">
                           <div className="col-12 form-group send-mess">
                              <input type="text" className="form-control" placeholder="Tên:"></input>
                           </div>
                           <div className="col-12 form-group send-mess">
                              <input type="email" className="form-control" placeholder="Email:"></input>
                           </div>
                           <div className="col-12 form-group send-mess">
                              <textarea type="text" className="form-control" placeholder="Tin nhắn:"></textarea>
                           </div>
                           <button className="btn-send-mess" type="submit">
                              Gửi Tin Nhắn
                           </button>
                        </div>
                     </div>
                     <div className="bottom-content-right">
                        <div className="bottom-content-right-content">
                           <i className="fas fa-map-marker-alt"></i>
                           <p>Bình Định</p>
                           <p>Đà Nẵng</p>
                           <p>Viet-Han</p>
                           <i className="fas fa-envelope"></i>
                           <p>nghianb.23itb@vku.udn.vn</p>
                           <p>khanhbq.23itb@vku.udn.vn</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   // Lấy biến thông qua state
   return {
      isLoggedIn: state.user.isLoggedIn,
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   // Gửi action event của redux
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact); // Kết nối redux với react
