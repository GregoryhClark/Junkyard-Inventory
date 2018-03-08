import { slide as Menu } from 'react-burger-menu';
import React, { Component } from 'react'
import { connect } from 'react-redux';
// import { getUser } from './../../ducks/users';
import {Link} from 'react-router-dom';

export default class TestComp extends Component {
    showSettings (event) {
        event.preventDefault();
        
      }
    render () {
        return (
            <div>
                <h1>testing</h1>
          <Menu>
            <a id="home" className="menu-item" href="/">Home</a>
            <a id="about" className="menu-item" href="/about">About</a>
            <a id="contact" className="menu-item" href="/contact">Contact</a>
            <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
          </Menu>

          </div>
        );
      }
}
//connect(mapStateToProps, { getUser })(Private)