import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HashRouter, Switch, Router, Route, Redirect, } from 'react-router-dom'


import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'

import Login from './Login'

const Loading = () => (
    <div>Loading</div>
)

const locationHelper = locationHelperBuilder({})
 
const userIsNotAuthenticated = connectedRouterRedirect({
   // This sends the user either to the query param route if we have one, or to the landing page if none is specified and the user is already logged in
   redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/account',
   // This prevents us from adding the query parameter when we send the user away from the login page
   allowRedirectBack: false,
    // If selector is true, wrapper will not redirect
    // So if there is no user data, then we show the page
   authenticatedSelector: state => state.login.data === null,
   // A nice display name for this check
   wrapperDisplayName: 'UserIsNotAuthenticated'
})

const userIsAuthenticated = connectedRouterRedirect({
    redirectPath: '/login',
    authenticatedSelector: state => state.login.data !== null,
    wrapperDisplayName: 'UserIsAuthenticated',
    // Returns true if the user auth state is loading
    authenticatingSelector: state => state.login.isLoading,
    // Render this component when the authenticatingSelector returns true
    AuthenticatingComponent: Loading
})

const Register = () => (
    <div>Login</div>
)

const Account = () => (
    <div>Account</div>
)

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Route path="/login" component={userIsNotAuthenticated(Login)}/>
                    <Route path="/account" component={userIsAuthenticated(Account)}/>
                </div>
            </HashRouter>
        )
    }
}

const mapStateToProps = state => ({
    user: state.login
})

export default connect(mapStateToProps)(App)