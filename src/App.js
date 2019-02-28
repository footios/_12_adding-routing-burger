import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom'

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";


// We'll load Checkout with Router later...
class App extends Component {

 
  render() {
   
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Route path='/' exact component={BurgerBuilder} />
            <Route path='/checkout' component={Checkout} />
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
