import React from 'react';

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'

// Child of Checkout in containers
const checkoutSummary = (props) => {
    return ( 
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '300px', height: '300px', margin: 'auto'}}>
               <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType='Danger' clicked>CANCEL</Button>
            <Button btnType='Success' clicked>CONTINUE</Button>
        </div>
     );
}
 
export default checkoutSummary;