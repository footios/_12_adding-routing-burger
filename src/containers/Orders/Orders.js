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
                //convert the object into an array:
                    const fetchedOrders = []
                for (const key in res.data) {
                    if (res.data.hasOwnProperty(key)) {
                       fetchedOrders.push({...res.data[key], id: key});
                        
                    }
                }
                this.setState({loading: false, orders: fetchedOrders})
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }
    
    render() { 
        // I obviously want to output multiple orders, 
        // actually as many orders as needed and the orders I need to output
        // of course should be fetched from the backend.
        return ( 
        <div>
            <Order />
            <Order />
        </div> 
        );
    }
}
 
export default withErrorHandler(Orders, axios);