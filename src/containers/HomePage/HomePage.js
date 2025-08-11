import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Banner from './Section/Banner';
import Join from './Section/Join';
import Method from './Section/Method';
import HomeFooter from './HomeFooter';
import './HomePage.scss';

class HomePage extends Component {
    scrollbarsRef = createRef();

    render() {
        const { language } = this.props;
        const webBodyStyle = language === 'vi' ? { fontFamily: 'Arial, Helvetica, sans-serif' } : {};
        return (
            
                <div className='web-body' ref={this.scrollbarsRef} style={webBodyStyle}>
                    <HomeHeader />
                    <Banner scrollbarsRef={this.scrollbarsRef} />
                    <Join/>
                     <Method/>
                    <HomeFooter />
                </div>
        
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);