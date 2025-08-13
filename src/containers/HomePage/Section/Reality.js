import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./Reality.scss";
import Aoe from "aoejs"; // Import Aoejs
import { FormattedMessage } from "react-intl";

const Reality = () => {
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
        <div className="reality-container" >
            <div className="reality-content">
                <div className="filter">
                    <div className="left-content" data-aoe="hitLeft">
                        <h1><FormattedMessage id={"home-page.1million"} /></h1>
                        <div class="small-hr"/>
                        <p><FormattedMessage id={"home-page.1 million species risk of extinction"} /></p>
                    </div>
                    <div className="center-content" data-aoe="ball">
                        <h1>83%</h1>
                        <div class="small-hr"/>
                        <p><FormattedMessage id={"home-page.Decline in freshwater species in the past 50 yrs"} /></p>
                    </div>
                    <div className="right-content" data-aoe="hitRight">
                        <h1><FormattedMessage id={"home-page.13mimllion"} /></h1>
                        <div class="small-hr"/>
                        <p><FormattedMessage id={"home-page.13 million hectares of forest lost each year"} /></p>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Reality);
