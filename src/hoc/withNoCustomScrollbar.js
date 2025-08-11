import React, { Component } from "react";

const withCustomScrollbar = (WrappedComponent) => {
    return class extends Component {
        componentDidMount() {
            if (this.props.location.pathname === "/profile") {
                const parent = document.querySelector(".custom-scrollbar");
                if (parent) {
                    const child = parent.children[0];
                    if (child) {
                        child.style.overflow = "unset";
                        child.style.marginRight = "0";
                        child.style.marginBottom = "0";
                    }
                }
            }else{
                const parent = document.querySelector(".custom-scrollbar");
                if (parent) {
                    const child = parent.children[0];
                    if (child) {
                        child.style.overflow = "scroll";
                        child.style.marginRight = "-15px";
                        child.style.marginBottom = "-15px";
                    }
                }
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
};

export default withCustomScrollbar;