import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import "./Join.scss";
import { FormattedMessage } from "react-intl";
import Aoe from 'aoejs';  // Import Aoejs

const Join = (props) => {
  const handleNavigate = (path) => {
      props.history.push(path);
  };
  // Hook useEffect để khởi tạo Aoejs
  useEffect(() => {
    // Khởi tạo Aoe
    const aoe = new Aoe();
    aoe.init({
      attributes: {
        dataset: "data-aoe", // Chỉ định thuộc tính `data-aoe` để áp dụng hiệu ứng
        delay: "data-aoe-delay",
        speed: "data-aoe-speed",
      },
      observerRoot: null,
      observeRootMargin: "0px",
      observeRootThreshold: [0, 0.5, 0.75, 1],
      intersectionRatio: 0.5,
      once: false,
      speed: 1500,
      delay: 0,
      timingFunction: "linear",
    });

    // Clean-up để ngắt kết nối observers khi component unmount
    return () => {
      aoe.disconnectObservers();
    };
  }, []); // Chạy sau khi component render lần đầu tiên

  return (
    <div className="join-container">
      <div className="join-img-bgr">
        <div className="join-content">
          {/* Thêm data-aoe cho hiệu ứng fadeIn */}
          <h1 className="title-1" data-aoe="fadeIn">
          <FormattedMessage id={"home-page.Protecting earth's existing Edens"} />
          </h1>
          {/* Thêm data-aoe cho hiệu ứng fadeInRight */}
          <h1 className="title-2" data-aoe="fadeIn">
          <FormattedMessage id={"home-page.Regenerating landscapes to thrive"} />
          </h1>
          <p className="description" data-aoe="fadeIn">
          <FormattedMessage id={"home-page.description"} />
          </p>
          <button className="btn" data-aoe="fadeIn" onClick={()=> handleNavigate('/campaign')}>
            <span><FormattedMessage id={"home-page.Discover Now"} /> <i class="fa fa-chevron-down"></i></span>
          </button>
        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Join));
