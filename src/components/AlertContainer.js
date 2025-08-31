// AlertContainer.js
import React, { Component } from "react";
import CustomAlert from "./CustomAlert";

class AlertContainer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         alerts: [],
      };
   }

   showAlert = (message, type) => {
      const newAlert = { message, type, id: new Date().getTime() };
      this.setState((prevState) => ({
         alerts: [newAlert, ...prevState.alerts],
         
      }));
      setTimeout(() => {
         this.removeAlert(newAlert.id);
      }, 5000); // Ẩn alert sau 3 giây
     
   };

   removeAlert = (id) => {
      this.setState((prevState) => ({
         alerts: prevState.alerts.filter((alert) => alert.id !== id),
      }));
   };

   render() {
      return (
         <div
            className="alert-container"
            style={{
               position: "fixed",
               top: "10px",
               right: "10px",
            }}
         >
            {this.state.alerts.map((alert) => (
               <CustomAlert
                  key={alert.id}
                  message={alert.message}
                  type={alert.type}
                  onClose={() => this.removeAlert(alert.id)}
               />
            ))}
         </div>
      );
   }
}

export default AlertContainer;
