import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom'

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout'
// We'll load Checkout with Router later...
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            {/* With just 'exact' the order doesn't matter, but with Switch it does! */}
            <Route path='/checkout' exact component={Checkout} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
