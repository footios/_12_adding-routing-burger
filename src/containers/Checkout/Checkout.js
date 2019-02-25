import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

// Checkout should have a tiny summary of the checkout.
// So basically what the user is about to buy 
// and the price probably and then a button to cancel the checkout
// process and go back to the burger Builder and of course a button to continue.
// And I guess for the summary it would be nice 
// to not again show just a list of the ingredients but maybe
// show the burger itself rebuilt the burger in this checkout summary.
// So that's the goal here. Show the
// summary and then when the user clicks on continue 
// I don't want to load the contact form... so step by step.
class Checkout extends Component {

    state = { 
        // dummy data
        // we will pass the real from BurgerBuilder with Routing...
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
     }

     // After passing the ingredients to the search query in BurgerBuilder
    // now we need to parse them in the Checkout
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        for (const param of query.entries()) {
            ingredients[param[0]] = +param[1]
        }
        this.setState({ingredients: ingredients})
    }

     checkoutCancelledHandler = () => {
         this.props.history.goBack()
     }

     checkoutContinuedHandler = () => {
         this.props.history.replace('/checkout/contact-data')
     }

    render() { 

        return ( 
           <div>
               <CheckoutSummary 
               ingredients={this.state.ingredients}
               checkoutCancelled={this.checkoutCancelledHandler}
               checkoutContinued={this.checkoutContinuedHandler}/>
               <Route 
                path={this.props.match.path + '/contact-data'}  
                component={ContactData} />
           </div> 
         );
    }
}
 
export default Checkout;