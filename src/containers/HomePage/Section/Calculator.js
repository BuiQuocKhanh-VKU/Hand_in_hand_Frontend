import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import "./Calculator.scss";
import Aoe from "aoejs"; // Import Aoejs
import { FormattedMessage } from "react-intl";

const Calculator = (props) => {
    const handleNavigate = (path) => {
        props.history.push(path);
    }
    useEffect(() => {
        const aoe = new Aoe();
        aoe.init({
            attributes: {
                dataset: "data-aoe",
                delay: "data-aoe-delay",
                speed: "data-aoe-speed",
            },
            observerRoot: null,
            observeRootMargin: "0px",
            observeRootThreshold: [0, 0.5, 0.75, 1],
            intersectionRatio: 0.5,
            once: false,
            speed: 600,
            delay: 0,
            timingFunction: "linear",
        });

        return () => {
            aoe.disconnectObservers();
        };
    }, []);
    return (
        <div className="calculator-container" >
            <div className="calculator-content">
                <div className="filter">
                    <h1 data-aoe="popInBottom"><FormattedMessage id={"home-page.Calculate Your Carbon Footprint"} /></h1>
                    <p data-aoe="popInBottom"><FormattedMessage id={"home-page.Do you want to help strengthen climate change resilience for your future?"} /></p>
                    <button className="btn" data-aoe="popInBottom" onClick={()=> handleNavigate('/campaign')}><FormattedMessage id={"home-page.Calculate Your Footprint"} /> <i class="fa fa-chevron-right"></i></button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Calculator));
