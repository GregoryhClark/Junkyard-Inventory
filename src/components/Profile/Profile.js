import React from 'react'
import { connect } from 'react-redux';
import { getUser } from './../../ducks/users'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
const {REACT_APP_LOGOUT} = process.env
class Private extends React.Component {
    constructor() {
        super()
        this.state = {
            tempName: '',
            tempEmail: '',
            tempCell: '',
            userIsAdmin:false,
            userIsPremium:false
        }
    }


    componentDidMount() {

        
        this.props.getUser()
            .then((res) => {
                console.log('here it is!',res.value)
                this.setState({
                    localUserID: res.value.id,
                    userIsAdmin:res.value.is_admin,
                    userIsPremium:res.value.is_premium
                })
            })
    }

    updateUserInfo() {
        // this.props.user.email
        let profileInfo = this.state;
        profileInfo.user_id = this.props.user.id
        // console.log('profile info is now', profileInfo, this.props.user)
        axios.put('/profile', profileInfo)
            .then(this.setState({
                tempName:'',
                tempEmail: '',
                tempCell: ''
            }),
            alert("Your Info has saved!"),
            
        )
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
            <div>
                
                <div className="topnav" id="myTopnav">
                    <a href="/#/dashboard" >Dashboard</a>
                    <a href="/#/search" >Search</a>
                    {this.state.userIsAdmin ?
                        <a href="/#/inventory">Inventory</a> : null
                    }
                    {this.state.userIsPremium ? null :
                        <a href="/#/upgrade" >Upgrade</a>}


                    <a href="/#/profile" className="active">Profile</a>
                    <a href={REACT_APP_LOGOUT}>Logout</a>
                    <a href="javascript:void(0);" className="icon" onClick={this.myFunction}>&#9776;</a>
                </div>



                <div className = "update_profile_form">
                <div className="change_name">
                    <p>Name:</p>
                    <input value={this.state.tempName} onChange={(e) => this.setState({ tempName: e.target.value })} />
                </div>

                <div className="change_Email">
                    <p>Email:</p>
                    <input value={this.state.tempEmail} onChange={(e) => this.setState({ tempEmail: e.target.value })} />
                </div>

                <div className="change_Phone">
                    <p>Cell Phone:</p>
                    <input value={this.state.tempCell} onChange={(e) => this.setState({ tempCell: e.target.value })} />
                </div>

                <button className="save_profile" onClick={(e) => this.updateUserInfo()}>Save</button>
                {/* This will need an OnClick that invokes a function to update appstate. */}
                </div>

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