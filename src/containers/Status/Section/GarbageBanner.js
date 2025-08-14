import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./GarbageBanner.scss";
import Aoe from "aoejs";

const GarbageBanner = (props) => {
   // Hook useEffect thay thế componentDidMount
   useEffect(() => {
      // Tạo instance Aoe và khởi tạo
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
         speed: 1000,
         delay: 0,
         timingFunction: "linear",
      });

      // Clean-up khi component bị unmount hoặc khi effect thay đổi
      return () => {
         aoe.disconnectObservers();
      };
   }, []); // Dependency array rỗng để chạy effect sau khi render lần đầu tiên

   return (
      <div className="garbage-banner-container">
         <div className="garbage-banner-content">
            <div className="left-content" data-aoe="popInBottom">
               <h1>Rác thải</h1>

               <p>
                  Rác thải, đặc biệt là nhựa và các vật liệu không phân hủy, đang gây ra tác động nghiêm trọng đến động
                  vật hoang dã trên toàn cầu. Các loài động vật thường bị vướng vào hoặc nuốt phải rác, dẫn đến nguy cơ
                  tử vong cao.
               </p>
               <p>
                  Bên cạnh đó, rác thải cũng gây ô nhiễm môi trường sống của động vật, ảnh hưởng đến các hệ sinh thái tự
                  nhiên mà chúng phụ thuộc vào.
               </p>
            </div>
            <div className="right-content" data-aoe="popInBottom">
               <div className="girl-img"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GarbageBanner);
