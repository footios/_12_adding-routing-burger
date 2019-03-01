import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'


class Checkout extends Component {

    state = { 
        ingredients: null,
        totalPrice: 0
     }

     // After passing the ingredients to the search query in BurgerBuilder
     // now we need to parse them in the Checkout
    // 251. We need to change the life cycle hook to ...WillMount because we
    // get an error. We need to parse the ingredients before it mounts,
    // because otherwise the component will try to render with null ingredients...
    componentWillMount() {
        console.log('Checkout cwm: ', this.props);
        
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = this.props.location.state
        for (const param of query.entries()) {
            // ['salad', '1']
          ingredients[param[0]] = +param[1]
            console.log('ingredients[param[0]]' , param );
            console.log(' +param[1]',  +param[1]);
            
        }
       
        
        console.log('Checkout hash: ', this.props.location.hash);
        console.log('Checkout cwm ingredients: ', ingredients);
        console.log('Checkout price: ', this.props.location.state);
        
        this.setState({ingredients: ingredients, totalPrice: price})
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