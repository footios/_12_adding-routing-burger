import React, { Component } from 'react';

import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.module.css';

//child of Checkout
class ContactData extends Component {
	state = {
		orderForm: {
			/* And you could of course write a bit
            leaner code, you could create a helper function 
            which creates such a javascript object so that here
            you call just a function which initializes it. */
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Name'
				},
				value: ''
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: ''
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'zip code'
				},
				value: ''
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: ''
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'e-mail'
				},
				value: ''
			},
			deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
		},
		loading: false
	};

	orderHandler = (event) => {
		// Because in Checkout we pass the ingredients as props:
		// render={(props) => <ContactData ingredients={this.state.ingredients} />} />
		// we can now access them here.

		// 'preventDefault()' prevents the default which is to send a request which I don't want.
		// I don't want to send a request because this reloads my form.
		event.preventDefault();
		console.log('in orderHandler: ', this.props);

		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price
		};

		axios
			.post('/orders.json', order)
			.then((response) => this.setState({ loading: false }))
			.then((error) => this.setState({ loading: false }));
		this.props.history.push('/');
	};
	render() {
		const formElementsArray = [];
		for (const key in this.state.orderForm) {
			if (this.state.orderForm.hasOwnProperty(key)) {
				formElementsArray.push({
					id: key,
					config: this.state.orderForm[key]
				});
			}
		}
		let form = (
			<form>
				{formElementsArray.map((formElement) => (
					<Input
                        key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
					/>
				))}
				<Button btnType="Success" clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
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
