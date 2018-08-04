import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser } from './../../ducks/users';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import MyWaitlist from '../MyWaitlist/MyWaitlist';
import NewWaitlist from '../NewWaitlist/NewWaitlist';

const { REACT_APP_LOGOUT } = process.env

class Private extends Component {

    componentDidMount() {

        this.props.getUser()
    }

    changeHamburger() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }


    render() {
        const user = this.props.user;
        function checkWaitlistLength() {
            axios.get(`/user_waitlist/${user.id}`).then(res => {
                if(res.data.length === 0){
                    alert("It looks like you don't have any vehicles in your waitlist at this time.")
                }
            })
        }


        return (
            <div className='dashboard_wrapper'>

                <div className="topnav" id="myTopnav">
                    <a href="/#/dashboard" className="active">Dashboard</a>
                    <a href="/#/search" >Search</a>
                    {this.props.user.is_admin ?
                        <a href="/#/inventory">Inventory</a> : null
                    }

                    {this.props.user.is_premium ? null :
                        <a href="/#/upgrade" >Upgrade</a>}


                    <a href="/#/profile">Profile</a>
                    <a href={REACT_APP_LOGOUT}>Logout</a>
                    <a href="javascript:void(0);" className="icon" onClick={this.changeHamburger}>&#9776;</a>
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

                <div className="dash_nav">
                    <a href="/#/dashboard/my_waitlist" onClick={()=>checkWaitlistLength()}>
                        <div>
                            <p>MY WAITLISTS</p>
                        </div></a>
                    <a href="/#/dashboard/new_waitlist">
                        <div>
                            <p>ADD WAITLIST</p>
                        </div></a>
                </div>

                <Switch>
                    <Route path='/dashboard/my_waitlist' component={MyWaitlist} />
                    <Route path='/dashboard/new_waitlist' component={NewWaitlist} />
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

export default connect(mapStateToProps, { getUser })(Private)