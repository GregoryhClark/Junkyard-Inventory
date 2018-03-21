import { slide as Menu } from 'react-burger-menu';
import React, { Component } from 'react'
import { connect } from 'react-redux';
// import { getUser } from './../../ducks/users';
import {Link} from 'react-router-dom';
import './TestComp.css'

export default class TestComp extends Component {
    showSettings (event) {
        event.preventDefault();
        
      }
    render () {
        return (
            <div>
                <h1 className = "testSchtuffMan">testiadhasdgasdfasdfasdfadasdfasdfasdfasdfasdfasdfasdfng</h1>
      

          </div>
        );
      }
}
//connect(mapStateToProps, { getUser })(Private)