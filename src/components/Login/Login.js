import React, { Component } from 'react';
import logo from './Car_logo.png';
import './Login.css';
export default class Login extends Component {
    render() {
        return (
            <div className='login_page'>
                <div className="login_box">
                    <div className="logo_wrapper">
                        <img className="car_logo" src={logo} alt="carlogo" />
                        <h1>JUNKYARD</h1>
                        <a className="login_btn" href={process.env.REACT_APP_LOGIN}>
                            <button>Login</button>
                        </a>
                    </div>

                </div>
            </div>
        )
    }
}