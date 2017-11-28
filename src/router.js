import React from 'react'
import { HashRouter, Switch, Router, Route, Redirect, } from 'react-router-dom'

const Login = () => (
    <div>Login</div>
)

const Register = () => (
    <div>Login</div>
)

const Account = () => (
    <div>Account</div>
)

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true
      setTimeout(cb, 100) // fake async
    },
    signout(cb) {
      this.isAuthenticated = false
      setTimeout(cb, 100)
    }
}
  

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      fakeAuth.isAuthenticated ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )

const App = () => (
    <HashRouter>
        <div>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <PrivateRoute path="/account" component={Account}/>
        </div>
    </HashRouter>
    
)

export default App