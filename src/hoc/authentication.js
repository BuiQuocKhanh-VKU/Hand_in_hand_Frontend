import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: '/login'
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: (state, ownProps) => 
        {
        if(ownProps.location.pathname === '/login') { 
             return locationHelper.getRedirectQueryParam(ownProps) || '/home';//nếu chưa pathname là /login thì chuyển về trang home
        }else{
            return '/detail/' + ownProps.location.pathname.replace("/login/", "");// nếu pathname khác thì chuyển về trang detail
        }
    },
    allowRedirectBack: false
});
export const userIsAdmin = connectedRouterRedirect({
    authenticatedSelector: state => state.user.isLoggedIn && state.user.role === 'admin',
    wrapperDisplayName: 'UserIsAdmin',
    redirectPath: '/home',
    allowRedirectBack: false
});