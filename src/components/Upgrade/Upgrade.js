import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser } from './../../ducks/users';
import { Link } from 'react-router-dom';
import { Elements } from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import './Upgrade.css';
// import InjectedCheckoutForm from './CheckoutForm';

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
        // .then((res) => {
        //     console.log('here it is!',res.value)
        //     this.setState({
        //         localUserID: res.value.id,
        //         userIsAdmin:res.value.is_admin,
        //         userIsPremium:res.value.is_premium
        //     })
        // })
    }

    onToken(token) {

        let user = this.props.user;
        console.log(user)
        token.card = void 0;
        console.log('token', token);
        axios.post(`http://localhost:3535/api/payment/${user.id}`, { token, amount: 100 }).then(response => {
            alert(`We are in business user ${user.id}`)
            console.log(response)
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
                    <a href="/#/search">Search</a>
                    {this.state.userIsAdmin ?
                        <a href="/#/inventory">Inventory</a> : null
                    }
                    {this.state.userIsPremium ? null :
                        <a href="/#/upgrade" className="active">Upgrade</a>}


                    <a href="/#/profile">Profile</a>
                    <a href="http://localhost:3535/auth/logout">Logout</a>
                    <a href="javascript:void(0);" className="icon" onClick={this.myFunction}>&#9776;</a>
                </div>

                <div className="upgrade_wrapper">

                    <h1>Upgrade to Premium for just 99 cents!</h1>
                    <p>Premium gets you immediate updates whenever a new vehicle is added to our inventory. With a basic account, notifications are sent out 24 hours after they are logged in our system.</p>
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