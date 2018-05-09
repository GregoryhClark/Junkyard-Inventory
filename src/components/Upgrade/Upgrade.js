import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser } from './../../ducks/users';
import { Link } from 'react-router-dom';
import { Elements } from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import './Upgrade.css';
// import InjectedCheckoutForm from './CheckoutForm';
const {REACT_APP_LOGOUT, REACT_APP_PAYMENT_REQ} = process.env
class Private extends Component {
    constructor() {
        super()
        this.state = {

            userIsAdmin: false,
            userIsPremium: false

        }
        this.onToken = this.onToken.bind(this);
    }

    componentDidMount() {
        let user = this.props.user;
        this.props.getUser()

    }

    onToken(token) {

        let user = this.props.user;

        token.card = void 0;
        axios.post(`${REACT_APP_PAYMENT_REQ}${user.id}`, { token, amount: 100 }).then(response => {
            alert(`You have been upgraded to premium!`)
        });

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


        let user = this.props.user;
        return (
            <div>

                <div className="topnav" id="myTopnav">
                    <a href="/#/dashboard" >Dashboard</a>
                    <a href="/#/search" >Search</a>
                    {this.props.user.is_admin ?
                        <a href="/#/inventory">Inventory</a> : null
                    }
                    
                    {this.props.is_premium ? null :
                        <a href="/#/upgrade" >Upgrade</a>}

                    <a href="/#/profile">Profile</a>
                    <a href={REACT_APP_LOGOUT}>Logout</a>
                    <a href="javascript:void(0);" className="icon" onClick={this.myFunction}>&#9776;</a>
                </div>

                <h1 className = "upgrade_header">Upgrade to Premium for just 99 cents!</h1>

             
                
                <div className="upgrade_wrapper">

                   <p> Want immdediate notifications? Premium gets you immediate updates whenever a new vehicle is added to our inventory. With a basic account, notifications are sent out 24 hours after they are logged in our system.</p>

                </div>

                <div className="checkout_form">
                    <StripeCheckout
                        token={this.onToken}
                        stripeKey='pk_test_uFE6zSqGKm4S9QEMIg47DAPr'
                        amount={0.99} />

                </div>

            </div>
        )
    }

}


function mapStateToProps(state) {

    let { user } = state;
    return {
        user: user
    }
}

export default connect(mapStateToProps, { getUser })(Private)