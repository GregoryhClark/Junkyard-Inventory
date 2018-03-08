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
                <Link to='/profile'>
                    <button className='btn'>Edit Profile</button>
                </Link>
                <Link to='/dashboard'>
                    <button className='btn'>Dashboard</button>
                </Link>
                <Link to='/upgrade'>
                    <button className='btn'>Upgrade</button>
                </Link>
                <a href='http://localhost:3535/auth/logout'><button>Log out</button></a>
                <p>Username: { user ? user.user_name : null }</p>
                <h1>Upgrade to Premium for just 99 cents!</h1>
                <p>Premium gets you immediate updates whenever a new vehicle is added to our inventory. With a basic account, notifications are sent out 24 hours after they are logged in our system.</p>
           
                <Link to='/dashboard'>
                    <button className='btn'>Dashboard</button>
                </Link>
          
                

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