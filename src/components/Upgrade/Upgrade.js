import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser } from './../../ducks/users';
import { Link } from 'react-router-dom';
import { Elements } from 'react-stripe-elements';
// import InjectedCheckoutForm from './CheckoutForm';

class Private extends Component {
    componentDidMount() {

        this.props.getUser();
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


                <p>Username: {user ? user.user_name : null}</p>
                <h1>Upgrade to Premium for just 99 cents!</h1>
                <p>Premium gets you immediate updates whenever a new vehicle is added to our inventory. With a basic account, notifications are sent out 24 hours after they are logged in our system.</p>







                <script src="https://js.stripe.com/v3/"></script>
                <div className="checkout_form">
                    {/* //WTF??? */}
                    {/* <form action="your-server-side-code" method="POST">
                        <script
                            src="https://checkout.stripe.com/checkout.js" class="stripe-button"
                            data-key="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
                            data-amount="999"
                            data-name="Stripe.com"
                            data-description="Example charge"
                            data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
                            data-locale="auto"
                            data-zip-code="true">
                        </script>
                    </form> */}

                    <Elements>
                        {/* <InjectedCheckoutForm /> */}
                    </Elements>



                </div>




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