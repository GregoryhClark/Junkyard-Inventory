import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser } from './../../ducks/users';
import {Link} from 'react-router-dom';

export default class Private extends Component {
    componentDidMount() {

        this.props.getUser();
    }

    render() {
        const user = this.props.user;
        return (
            <div>
                <h1>Search our existing inventory to see if we have what you need!</h1>
            
                <select />
                <select />
                <select />
                <select />
                <select />
                
                <Link to='/dashboard'>
                    <button className='btn'>Dashboard</button>
                </Link>
                <Link to='/upgrade'>
                    <button className='btn'>upgrade</button>
                </Link>
  

                
            </div>
        )
    }

}


