import React from 'react'
import { connect } from 'react-redux';
import { getUser } from './../../ducks/users'
import { Link } from 'react-router-dom';
import axios from 'axios';

class Private extends React.Component {
    constructor() {
        super()
        this.state = {
            tempName: '',
            tempEmail: '',
            tempCell: ''
        }
    }


    componentDidMount() {

        this.props.getUser();
    }

    updateUserInfo() {
        // this.props.user.email
        let profileInfo = this.state;
        profileInfo.user_id = this.props.user.id
        // console.log('profile info is now', profileInfo, this.props.user)
        axios.put('/profile', profileInfo)
            .then()
    }

    render() {
        const user = this.props.user;
        return (
            <div>
                <nav className="nav">

                    <div className="nav-wrapper">

                        <div className="logo">
                            Logo here
    </div>

                        <ul className="links">
                            <li className="link"><a href="/#/search"><div className="link">Search</div></a></li>
                            <li className="link"><a href="/#/upgrade"><div className="link">Upgrade</div></a></li>
                            <li className="link"><a href="/#/dashboard"><div className="link">Dashboard</div></a></li>
                            <li className="link"><a href="/#/profile"><div className="link">Edit Profile</div></a></li>
                            <li className="link"><a href="/#/inventory"><div className="link">Inventory</div></a></li>
                            <li className="link"><a href="http://localhost:3535/auth/logout"><div className="link">Logout</div></a></li>
                        </ul>

                        <div className="nav-mobile">
                            MENU <span>|||</span>
                        </div>
                    </div>
                </nav>




                <div className="change_name">
                    <p>Name:</p>
                    <input onChange={(e) => this.setState({ tempName: e.target.value })} />
                </div>

                <div className="change_Email">
                    <p>Email:</p>
                    <input onChange={(e) => this.setState({ tempEmail: e.target.value })} />
                </div>

                <div className="change_Phone">
                    <p>Cell Phone:</p>
                    <input onChange={(e) => this.setState({ tempCell: e.target.value })} />
                </div>

                <button className="save_profile" onClick={(e) => this.updateUserInfo()}>Save</button>
                {/* This will need an OnClick that invokes a function to update appstate. */}


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