import React,{ useEffect }  from "react";
import { connect } from "react-redux";
import "./Approach.scss";
import Aoe from 'aoejs';  // Import Aoejs
import { FormattedMessage } from "react-intl";

const Approach = () => {
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
        <div className="approach-container" data-aoe="fadeInBottom">
            <div className="approach-content" >
                <div className="filter">
                    <div className="left-content">
                        <h1><FormattedMessage id={"home-page.Whole-System Approach"} /></h1>
                    </div>
                    <div className="right-content">
                        <ul> 
                            <li><FormattedMessage id={"home-page.Creation of oxygen for the planet"} /></li>
                            <li><FormattedMessage id={"home-page.Planting trees, plants and shrubs"} /></li>
                            <li><FormattedMessage id={"home-page.Locking in carbon"} /></li>
                            <li><FormattedMessage id={"home-page.Improving soil quality"} /></li>
                            <li><FormattedMessage id={"home-page.Maximising and cleaning water systems"} /></li>
                            <li><FormattedMessage id={"home-page.Creating edible foods"} /></li>
                            <li><FormattedMessage id={"home-page.Protect biodiversity"} /></li>
                            <li><FormattedMessage id={"home-page.Strengthen local communities and support landstewards."} /></li>
                        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Approach);
