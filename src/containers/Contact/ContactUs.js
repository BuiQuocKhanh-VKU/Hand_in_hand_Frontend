import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import Contact from './Section/Contact';
class ContactUs extends Component {

	render() {

		return (
			<div>
				<HomeHeader
				/>

				<Contact
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
