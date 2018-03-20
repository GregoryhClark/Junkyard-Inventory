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

    // this.myFunction = this.myFunction.bind(this)//wtf?

    componentDidMount() {
        let user = this.props.user;
        this.props.getUser();
    }

    onToken(token) {
        let user = this.props.user;
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
        function myFunction() {
            var x = document.getElementById("myTopnav");
            if (x.className === "topnav") {
                x.className += " responsive";
            } else {
                x.className = "topnav";
            }
        } 

        let user = this.props.user;
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





                <div className="topnav" id="myTopnav">
                    <a href="/#/dashboard" >Dashboard</a>
                    <a href="/#/search">Search</a>
                    <a href="/#/upgrade" className="active">Upgrade</a>
                    <a href="/#/inventory">Inventory</a>
                    <a href="javascript:void(0);" className="icon" onClick={myFunction}>&#9776;</a>
                </div>

                


{/* <div className="topnav" id="myTopnav">
  <a href="#home" className="active">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a>
  <a href="javascript:void(0);"className="icon" onclick="myFunction()">&#9776;</a>
</div> */}

<div className="brokenstuff2">
  <h2>Responsive Topnav Example</h2>
  <p>Resize the browser window to see how it works.</p>
</div>













                <p>Username: {user ? user.user_name : null}</p>
                <h1>Upgrade to Premium for just 99 cents!</h1>
                <p>Premium gets you immediate updates whenever a new vehicle is added to our inventory. With a basic account, notifications are sent out 24 hours after they are logged in our system.</p>








                <div className="checkout_form">




                </div>

                <StripeCheckout
                    token={this.onToken}
                    stripeKey='pk_test_uFE6zSqGKm4S9QEMIg47DAPr'
                    amount={0.99} />



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