import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'


class Checkout extends Component {

    state = { 
        // dummy data
        // we will pass the real from BurgerBuilder with Routing...
        ingredients: {
            bacon:1,
            cheese: 1,
            meat: 1,
            salad: 1,
        },
        totalPrice: 0
     }


    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let totalPrice = this.props.location.state;
        for (const param of query.entries()) {
            // ['salad', '1']
                ingredients[param[0]] = +param[1]
            }
        // Because we save the ingredients to state. They will not change if we change the address
        // (if the query params get lost)
        // by going to 'chekout/contact-data'
        this.setState({ingredients: ingredients, totalPrice: totalPrice})
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render() { 

        return ( 
            <div>
            <CheckoutSummary
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler} />
            <Route 
                path={this.props.match.path + '/contact-data'} 
                render={(props) => 
                <ContactData 
                ingredients={this.state.ingredients} 
                price={this.state.totalPrice}
                {...props}/>} />
        </div>
         );
    }
}
 
export default Checkout;