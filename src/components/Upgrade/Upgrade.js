import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser } from './../../ducks/users';
import {Link} from 'react-router-dom';

class Private extends Component {
    componentDidMount() {

        this.props.getUser();
    }

    render() {
        const user = this.props.user;
        return (
            <div>

                <nav class="nav">

<div class="nav-wrapper">

    <div class="logo">
        Logo here
    </div>

    <ul class="links">
        <li class="link"><a href="/#/search"><div class="link">Search</div></a></li>
        <li class="link"><a href="/#/upgrade"><div class="link">Upgrade</div></a></li>
        <li class="link"><a href="/#/dashboard"><div class="link">Dashboard</div></a></li>
        <li class="link"><a href="/#/profile"><div class="link">Edit Profile</div></a></li>
        <li class="link"><a href="/#/inventory"><div class="link">Inventory</div></a></li>
        <li class="link"><a href="http://localhost:3535/auth/logout"><div class="link">Logout</div></a></li>
    </ul>

    <div class="nav-mobile">
        MENU <span>|||</span>
    </div>

</div>





</nav>
                
                <p>Username: { user ? user.user_name : null }</p>
                <h1>Upgrade to Premium for just 99 cents!</h1>
                <p>Premium gets you immediate updates whenever a new vehicle is added to our inventory. With a basic account, notifications are sent out 24 hours after they are logged in our system.</p>
           

          
                

                {/* Strip payment stuff will go here */}


            </div>
        )
    }

}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUser })(Private)