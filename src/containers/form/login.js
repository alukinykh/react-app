import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

const form = {
    form: 'login' // a unique identifier for this form
}

@reduxForm(form)
class LoginForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div>
                    <label>Email</label>
                    <div>
                    <Field
                        name="email"
                        component="input"
                        type="email"
                        placeholder="Email"
                    />
                    </div>
                </div>
                <div>
                    <label>Password</label>
                    <div>
                    <Field
                        name="password"
                        component="input"
                        type="password"
                        placeholder="Password"
                    />
                    </div>
                </div>
                <button type="submit">
                    Submit
                </button>
            </form>
        )
    }
}

export default LoginForm
