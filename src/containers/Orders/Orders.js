import React, { Component } from 'react'

import Order from '../../components/Order/Order'
import axios from "../../axios-orders";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
    state = { 
        orders: [],
        loading: true
     }
    
    componentDidMount() {
        // From orders we fetch an object.
        axios.get('/orders.json')
            .then(res => {
                console.log(res.data) // Why is 'data' what we get back from Firebase?
                
                this.setState({loading: false, orders: res.data})
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }

    ordersMethod = () => {
        console.log('ordersMethod', Object.entries(this.state.orders));
        // returns and array where each element is an order.
        // Each order is an array which has as its first element the 'id'
        // (that's why:  key={order[0].key})  
        // and as second element, the rest...
        // e.g.:
        // [0] -LZjuuLT0gBWB4WL8y7W
        // [1]
        //  customer: {...}
        //      deliveryMethod: "fastest"
        //  ingredients: {...}
        //  price: " "
        
        return Object.entries(this.state.orders).map(order => {
            return (
                <Order 
                key={order[0].key}
                price={order[1].price}
                ingredients={order[1].ingredients} />
            )
        })
    }
    
    render() { 
        // I obviously want to output multiple orders, 
        // actually as many orders as needed and the orders I need to output
        // of course should be fetched from the backend.
        return ( 
        <div>
          {this.ordersMethod()}
        </div> 
        );
    }
}
 
export default withErrorHandler(Orders, axios);