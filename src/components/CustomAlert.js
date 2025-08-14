import React from "react";
import "./CustomAlert.scss";
const Alert = ({ message, type, onClose }) => {
   return (
      <React.Fragment>
         <div id="toastBox" className="toast" onClick={onClose}>
            <div
               className="icon-box"
               style={{
                  background:
                     type === "success"
                        ? "#6ad8a3"
                        : type === "error"
                        ? "#D9584D"
                        : type === "warning"
                        ? "#f3bb45"
                        : "#2196f3",
               }}
            >
               {type === "success" ? (
                  <i className="fa fa-check" aria-hidden="true"></i>
               ) : type === "error" ? (
                  <i className="fa fa-times" aria-hidden="true"></i>
               ) : type === "warning" ? (
                  <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
               ) : (
                  <i className="fa fa-info" aria-hidden="true"></i>
               )}
            </div>
            <span>{message}</span>
            <div
               className="progress-toast"
               style={{
                  background:
                     type === "success"
                        ? "#6ad8a3"
                        : type === "error"
                        ? "#D9584D"
                        : type === "warning"
                        ? "#f3bb45"
                        : "#2196f3",
               }}
            ></div>
         </div>
      </React.Fragment>
   );
};

export default Alert;
