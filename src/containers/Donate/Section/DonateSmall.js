import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./DonateSmall.scss";
import { withRouter } from "react-router-dom";
import Aoe from "aoejs";

const DonateSmall = (props) => {
  const handleNavigate = (path, targetScrollTop) => {
    if (props.history) {
      props.history.push(path, { targetScrollTop });
    } else {
      console.error("Chuyển hướng thất bại: Không tìm thấy đối tượng History.");
    }
  };

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
      speed: 800,
      delay: 0,
      timingFunction: "linear",
    });

    // Clean-up để ngắt kết nối observers khi component unmount
    return () => {
      aoe.disconnectObservers();
    };
  }, []); // Chạy sau khi component render lần đầu tiên

  useEffect(() => {
    const state = props.location.state || {};
    const targetScrollTop = state.targetScrollTop || 0;

    if (targetScrollTop && document.documentElement) {
      window.scrollTo({ top: targetScrollTop, behavior: "smooth" });
    }
  }, [props.location]);

  const handleNavigate2 = (path, targetScrollTop2) => {
    if (props.history) {
      props.history.push(path, { targetScrollTop2 });
    } else {
      console.error("Chuyển hướng thất bại: Không tìm thấy đối tượng History.");
    }
  };

  useEffect(() => {
    const state = props.location.state || {};
    const targetScrollTop2 = state.targetScrollTop2 || 0;

    if (targetScrollTop2 && document.documentElement) {
      window.scrollTo({ top: targetScrollTop2, behavior: "smooth" });
    }
  }, [props.location]);

  const handleNavigate3 = (path, targetScrollTop3) => {
    if (props.history) {
      props.history.push(path, { targetScrollTop3 });
    } else {
      console.error("Chuyển hướng thất bại: Không tìm thấy đối tượng History.");
    }
  };

  useEffect(() => {
    const state = props.location.state || {};
    const targetScrollTop3 = state.targetScrollTop3 || 0;

    if (targetScrollTop3 && document.documentElement) {
      window.scrollTo({ top: targetScrollTop3, behavior: "smooth" });
    }
  }, [props.location]);

  return (
    <div className="donateSmall-container" data-aoe="driveInBottom">
      <div className="title-donateSmall">
        <h1>Tham gia cộng đồng những người ủng hộ hàng tháng cho kế hoạch tái tạo đất</h1>
      </div>
      <div className="donateSmall-content">
        <div className="donateSmall-content-left">
          <i className="fa fa-solid fa-tree"></i>
          <div className="text-donateSmall">
            <h3>Gói Vàng</h3>
            <span>20 Cây trồng <br /></span>
            <span>mỗi tháng <br /></span>
            <span>400kgs CO2 <br /></span>
            <span>Carbon cân bằng <br /></span>
            <span>mỗi tháng <br /></span>
            <span>700.000 VND <br /></span>
            <span>Một lần</span>
          </div>
          <button className="btn-donateSmall" onClick={() => handleNavigate("/product", 100)}>
            Quyên góp ngay
          </button>
        </div>
        <div className="donateSmall-content-center">
          <i className="fa fa-solid fa-tree"></i>
          <div className="text-donateSmall">
            <h3>Gói Cam</h3>
            <span>10 Cây trồng <br /></span>
            <span>mỗi tháng<br /></span>
            <span>200kgs CO2 <br /></span>
            <span>Carbon cân bằng <br /></span>
            <span>mỗi tháng<br /></span>
            <span>350.000 VND<br /></span>
            <span>Một lần<br /></span>
          </div>
          <button className="btn-donateSmall" onClick={() => handleNavigate2("/product", 100)}>
            Quyên góp ngay
          </button>
        </div>
        <div className="donateSmall-content-right">
          <i className="fa fa-solid fa-tree"></i>
          <div className="text-donateSmall">
            <h3>Gói Xanh</h3>
            <span>5 Cây trồng <br /></span>
            <span>mỗi tháng<br /></span>
            <span>100kgs CO2<br /></span>
            <span>Carbon cân bằng <br /></span>
            <span>mỗi tháng<br /></span>
            <span>180.000 VND<br /></span>
            <span>Một lần<br /></span>
          </div>
          <button className="btn-donateSmall" onClick={() => handleNavigate3("/product", 100)}>
            Quyên góp ngay
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

export default withRouter(connect(mapStateToProps)(DonateSmall));
