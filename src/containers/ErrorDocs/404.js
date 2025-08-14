import React from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";

const BadRequest = (props) => {
   const handleNavigate = (path) => {
      props.history.push(path);
   };
   return (
      <React.Fragment>
         <Helmet>
            <meta charset="utf-8" />
            <meta name="author" content="pkfrom" />
            <meta name="keywords" content="404 page, css3, template, html5 template" />
            <meta name="description" content="404 - Mẫu trang lỗi" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link
               type="text/css"
               media="all"
               href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
               rel="stylesheet"
            />
            <link type="text/css" media="all" href="//pkfrom.github.io/404/assets/css/404.min.css" rel="stylesheet" />

            <link
               rel="apple-touch-icon"
               sizes="144x144"
               href="//pkfrom.github.io/404/assets/img/favicons/favicon144x144.png"
            />
            <link
               rel="apple-touch-icon"
               sizes="114x114"
               href="//pkfrom.github.io/404/assets/img/favicons/favicon114x114.png"
            />
            <link
               rel="apple-touch-icon"
               sizes="72x72"
               href="//pkfrom.github.io/404/assets/img/favicons/favicon72x72.png"
            />
            <link rel="apple-touch-icon" href="//pkfrom.github.io/404/assets/img/favicons/favicon57x57.png" />
            <link
               href="http://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800,900"
               rel="stylesheet"
               type="text/css"
            />
         </Helmet>

         <div className="animationload">
            <div className="loader"></div>
         </div>

         <div id="wrapper">
            <div className="container" style={{ border: "none", boxShadow: "none", padding: "0" }}>
               <div className="switcher">
                  <input id="sw" type="checkbox" className="switcher-value" />
                  <label for="sw" className="sw_btn"></label>
                  <div className="bg"></div>
                  <div className="text">
                     Bật <span className="text-l">tắt</span>
                     <span className="text-d">mở</span>
                     <br />
                     đèn
                  </div>
               </div>

               <div id="dark" className="row text-center">
                  <div className="info">
                     <img src="//pkfrom.github.io/404/assets/img/404-dark.png" alt="Lỗi 404" />
                  </div>
               </div>

               <div id="light" className="row text-center">
                  <div className="info">
                     <img src="//pkfrom.github.io/404/assets/img/404-light.gif" alt="Lỗi 404" />
                     <p>Trang bạn đang tìm đã bị di chuyển, xóa, đổi tên hoặc có thể chưa bao giờ tồn tại.</p>
                     <a onClick={() => handleNavigate("/home")} className="btn" style={{ height: "46px" }}>
                        Về Trang Chủ
                     </a>
                  </div>
               </div>
            </div>
         </div>
         {/* Scripts */}
         <Helmet>
            <script src="https://code.jquery.com/jquery-2.2.0.min.js" type="text/javascript"></script>
            <script
               src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
               type="text/javascript"
            ></script>
            <script src="//pkfrom.github.io/404/assets/js/modernizr.custom.js" type="text/javascript"></script>
            <script
               src="https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.6.0/jquery.nicescroll.min.js"
               type="text/javascript"
            ></script>
            <script src="//pkfrom.github.io/404/assets/js/404.min.js" type="text/javascript"></script>
         </Helmet>
      </React.Fragment>
   );
};

export default withRouter(BadRequest);
