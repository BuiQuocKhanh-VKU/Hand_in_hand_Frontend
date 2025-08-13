import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./Banner.scss";
import hill1 from "../../../assets/images/hill1.png";
import hill2 from "../../../assets/images/hill2.png";
import hill3 from "../../../assets/images/hill3.png";
import hill4 from "../../../assets/images/hill4.png";
import hill5 from "../../../assets/images/hill5.png";
import tree from "../../../assets/images/tree.png";
import leaf from "../../../assets/images/leaf.png";
import plant from "../../../assets/images/plant.png";
import deer from "../../../assets/images/deer.png";

const Banner = ({ scrollbarsRef }) => {
  const textRef = useRef();
  const leafRef = useRef();
  const hill1Ref = useRef();
  const hill4Ref = useRef();
  const hill5Ref = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const value = scrollbarsRef.current.scrollTop;

      if (textRef.current) {
        textRef.current.style.marginTop = value * 2 + "px";
      }
      if (leafRef.current) {
        leafRef.current.style.top = value * -1 + "px";
      }
      if (leafRef.current) {
        leafRef.current.style.left = value * 1 + "px";
      }
      if (hill5Ref.current) {
        hill5Ref.current.style.left = value * 1 + "px";
      }
      if (hill4Ref.current) {
        hill4Ref.current.style.left = value * -1 + "px";
      }
      if (hill1Ref.current) {
        hill1Ref.current.style.top = value * 1 + "px";
      }
    };

    if (scrollbarsRef.current) {
      scrollbarsRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollbarsRef.current) {
        scrollbarsRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollbarsRef]);

  return (
    <div className="banner-container">
      <img ref={hill1Ref} src={hill1} id="hill1" alt="hill1" />
      <img src={hill2} id="hill2" alt="hill2" />
      <img src={hill3} id="hill3" alt="hill3" />
      <img ref={hill4Ref} src={hill4} id="hill4" alt="hill4" />
      <img ref={hill5Ref} src={hill5} id="hill5" alt="hill5" />
      <img src={tree} id="tree" alt="tree" />
      <div className="shadow"></div>
      <h2 className="text" ref={textRef} id="text">
        Hand in Hand
      </h2>
      <img ref={leafRef} src={leaf} id="leaf" alt="leaf" />
      <img src={deer} id="deer" alt="deer" />
      <img src={plant} id="plant" alt="plant" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
