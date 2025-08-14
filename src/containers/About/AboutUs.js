import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import AboutHeader from './Section/AboutHeader';
import WhoAreGP from './Section/WhoAreGP';
import VisionMission from './Section/VisionMission';
import WhyYouSupport from './Section/WhyYouSupport';
import StartYourCacbon from './Section/StartYourCacbon';
import './AboutUs.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class AboutUs extends Component {

	render() {

		return (
			<div>
				<HomeHeader
				/>

				<AboutHeader
				/>

				<WhoAreGP
				/>

				<VisionMission
				/>

				<WhyYouSupport
				/>

				<StartYourCacbon
				/>

				<HomeFooter
				/>

			</div>
		);
	}

}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.user.isLoggedIn
	};
};

const mapDispatchToProps = dispatch => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
