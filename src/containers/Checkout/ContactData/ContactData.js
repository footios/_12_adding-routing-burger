import React, { Component } from 'react';

import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import classes from './ContactData.module.css';

//child of Checkout
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false // this is for the spinner
    }

    orderHandler = (event) => {
      // Because in Checkout we pass the ingredients as props:
      // render={(props) => <ContactData ingredients={this.state.ingredients} />} />
      // we can now access them here.

      // 'preventDefault()' prevents the default which is to send a request which I don't want.
      // I don't want to send a request because this reloads my form.
      event.preventDefault();
      console.log('in orderHandler: ', this.props);
      // So now we need to submit the request...

        // This is from BurgerBuilder
        this.setState({ loading: true });
        //Let's send an order:
        // Note: In real world apps, you wouldn't do the calculation on the page,
        // but on the server. Otherwise the client could manipulate them.
        const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        customer: {
            name: "Foti",
            address: {
            street: "testStreet 1",
            zipCode: "2356",
            country: "Greece"
            },
            email: "test@otest.com"
        },
        deliveryMethod: "fastest"
        };

        // especially for firebase, we add .json
        axios
        .post("/orders.json", order)
        .then(response => this.setState({ loading: false}))
        .then(error => this.setState({ loading: false}));
        // In order to Redirect when we click the ORDER button,
        // we could use the 'this.props.history.push('/')
        // But, in the Checkout we use the 'render' method
        // and not the 'component' to load the ContactData,
        // so now we don't have '...history' object!
        // Now there are two ways we can use to fix this,
        // 1. We can wrap the ContactData with 'withRouter' helper method.
        // 2. pass 'history' which we do get in the props of the render method 
        // in the Checkout where we load ContacData.
        // So we use the second... check Checkout...
        this.props.history.push('/')
        
    }
    render() { 
        let form = (
                <form>
                    <Input inputtype='input' type="text" name="street" placeholder="Street" />
                    <Input inputtype='input' type="text" name="postal" placeholder="Postal Code" />
                    <Input inputtype='input' type="email" name="email" placeholder="Your Mail" />
                    <Input inputtype='input' type="text" name="name" placeholder="Your Name" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return ( 
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                 {form}
            </div>
         );
    }
}
 
export default ContactData;