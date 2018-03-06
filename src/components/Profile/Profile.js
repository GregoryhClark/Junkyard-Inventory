import React from 'react'
import { connect } from 'react-redux';
import { getUser } from './../../ducks/users'
import { Link } from 'react-router-dom';

class Private extends React.Component {
    componentDidMount() {

        this.props.getUser();
    }

    updateUserInfo(){
        this.props.user.email 
    }

    render() {
        const user = this.props.user;
        return (
            <div>
                <h1>Only you can change your profile. No one else.</h1>

                <div className="change_name">
                    <p>Name:</p>
                    <input />
                </div>

                <div className="change_Email">
                    <p>Email:</p>
                    <input />
                </div>

                <div className="change_Phone">
                    <p>Cell Phone:</p>
                    <input />
                </div>

                <button className="save_profile">Save</button>
                {/* This will need an OnClick that invokes a function to update appstate. */}
               

            </div>
        )
    }

}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {getUser} )(Private)