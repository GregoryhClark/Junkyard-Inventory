import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser } from './../../ducks/users';
import { Link } from 'react-router-dom';

class Private extends Component {
    componentDidMount() {

        this.props.getUser();
        //axios call to get given users preferences.
        //axios call to get the color, make, model, year, date options
    }

    // displayWaitlistForm() { I changed this to make it simple. later, I may want to revisit this.
    //     return (
    //         <div>
    //             <select name="" id="" className="new_waitlist">
    //                 <option value="Honda"></option>
    //                 <option value="Toyota"></option>
    //                 <option value="GMC"></option>
    //             </select>

    //         </div>
    //     )
    // }
    render() {
        const user = this.props.user;
        console.log("user is now ", user)
        return (
            <div>
                <h1>Only you can see this. No one else.</h1>

                {/* <a href={process.env.REACT_APP_PROFILE}>
                    <button>Edit Profile</button>
                </a> */}
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
                <p>{user ? <img src={user.image_url} /> : null}</p>
                <p>Username: {user ? user.user_name : null}</p>
                <p>Email: {user ? user.email : null}</p>

                <p>ID: {user ? user.auth_id : null}</p>


                <div className="new_waitlist">
                    <h1>New Waitlist</h1>
                    <div className="new_make">
                        <p>Make:</p>
                        <select name="" id="">
                            <option value="">Honda</option>
                            <option value="">Toyota</option>
                            <option value="">Ford</option>
                        </select>
                    </div>
                    <div className="new_make">
                        <p>Model:</p>
                        <select name="" id="">
                            <option value="">Depends</option>
                            <option value="">Depends</option>
                            <option value="">Depends</option>
                        </select>
                    </div>
                    <div className="new_make">
                        <p>Year:</p>
                        <select name="" id="">
                            <option value="">1998</option>
                            <option value="">1999</option>
                            <option value="">2000</option>
                        </select>
                    </div>
                    <div className="new_make">
                        <p>Color:</p>
                        <select name="" id="">
                            <option value="">Red</option>
                            <option value="">Blue</option>
                            <option value="">Green</option>
                        </select>
                    </div>
                    <div className="new_make">
                        <p>Days on lot:</p>
                        <select name="" id="">
                            <option value="">10</option>
                            <option value="">20</option>
                            <option value="">30</option>
                        </select>
                    </div>
                    <button>Save</button>

                </div>

                <div className="current_waitlist"></div>

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