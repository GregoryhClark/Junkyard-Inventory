import React, { Component } from 'react';
import logo from './Car_logo.png';
import './Login.css';
import Button from '@material-ui/core/Button';
export default class Login extends Component {
    render() {
        return (
            <div className='login_page'>
                <div className="login_text">
                    <h1 className="welcome_intro">
                        Welcome to the Junkyard Waitlist App!
                </h1>
                    <p>The days of wasted trips to the Junkyard are over!</p>
                </div>
                <div className="whatever">
                    <div className="logo_wrapper">
                        <img className="car_logo" src={logo} alt="carlogo" />
                    </div>
                </div>
                <div className="login_button_wrapper">
                    <a className="login_btn" href={process.env.REACT_APP_LOGIN}>
                        <Button>Login</Button>
                        {/* <button>Login</button> */}
                    </a>
                </div>

            </div>
        )
    }
}