import React, { Component } from 'react'

import Order from '../../components/Order/Order'

class Orders extends Component {
    state = {  }
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
 
export default Orders;