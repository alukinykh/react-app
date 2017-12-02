import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import LoginForm from './form/login'
import { login } from '../actions/login'

const mapStateToProps = state => ({
    user: state.login
})

const mapDispatchToProps = (dispatch) => ({
    login: (data, redirect) => dispatch(login(data, redirect)),
})

@connect(mapStateToProps, mapDispatchToProps)
class Login extends Component {
    handleSubmit = values => {
        console.log(values, this.props.redirect)
        this.props.login(values, this.props.redirect)
    }
    render() {
        console.log(this.props)
        return (
            <LoginForm onSubmit={this.handleSubmit}/>
        )
    }
}

export default Login