import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser} from './../../ducks/users';
import { Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import logo from './Car_logo.png';
import './Dashboard.css';
import MyWaitlist from '../MyWaitlist/MyWaitlist';
import NewWaitlist from '../NewWaitlist/NewWaitlist';

class Private extends Component {
    constructor() {
        super()
        this.state = {
            localUserID: -1,
            userIsAdmin: false,
            userIsPremium: false,



        }

    }
    componentDidMount() {

        this.props.getUser()
            .then((res) => {
                console.log('here it is!', res.value)
                this.setState({
                    localUserID: res.value.id,
                    userIsAdmin: res.value.is_admin
                })
            })

    }
    
    myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }
    
    render() {
        const user = this.props.user;
 
        

        return (
            <div className='dashboard_wrapper'>

                <div className="topnav" id="myTopnav">
                    <a href="/#/dashboard" className="active">Dashboard</a>
                    <a href="/#/search">Search</a>
                    {this.state.userIsAdmin ?
                        <a href="/#/inventory">Inventory</a> : null
                    }
                    {this.state.userIsPremium ? null :
                        <a href="/#/upgrade" >Upgrade</a>}


                    <a href="/#/profile">Profile</a>
                    <a href="http://localhost:3535/auth/logout">Logout</a>
                    <a href="javascript:void(0);" className="icon" onClick={this.myFunction}>&#9776;</a>
                </div>

                <div className="dash_nav">
                    <a href = "/#/dashboard/my_waitlist">My Waitlists</a>
                    <a href="/#/dashboard/new_waitlist">New Waitlist</a>
                </div>

                

                <div className="dash_profile_wrapper">
                    <div className="dash_pic">
                        {user ? <img src={user.image_url} alt='user profile' /> : null}
                    </div>
                    <div className='the_ps'>
                        <p className='p1'>{user ? user.user_name : null}</p>
                        <p className='p2'>{user ? user.email : null}</p>
                    </div>
                </div>

                <Switch>
                    <Route path='/dashboard/my_waitlist' component = {MyWaitlist}/>
                    <Route  path='/dashboard/new_waitlist' component = {NewWaitlist}/>
                </Switch>

            </div>
        )
    }

}
function mapStateToProps(state) {
    const { user } = state
    return {
        user
    }
}

export default connect(mapStateToProps, { getUser})(Private)