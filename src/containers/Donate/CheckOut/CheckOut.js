import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import "./CheckOut.scss";
import Cart from "./Section/Cart";
import Payment from "./Section/Payment";


class CheckOut extends Component {
	render() {
		return (
			<div>
				<HomeHeader />
				<Cart />
				<HomeFooter />

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
	};
};

export default connect(mapStateToProps)(CheckOut);
