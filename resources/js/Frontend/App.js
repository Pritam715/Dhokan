import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import Footer from './partials/Footer';
import Header from './partials/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import ProductDetails from './components/pages/Product/ProductDetails';
import PageNotFound from './components/pages/PageNotFound';
import SignIn from './components/Auth/SignIn';
import Signup from './components/Auth/Signup';
import VerifyOtp from './components/Auth/VerifyOtp';

import Cart from './components/pages/Cart/Cart';

import { Provider } from "react-redux";
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import Resend from './components/Auth/Resend';
import ShippingAddress from './components/pages/ShippingAddress/ShippingAddress';
import shop from './components/pages/Shop/shop';

// store.subscribe(() => console.log(store.getState()));



export default function App() {

    return (
        <Router>
            {/* <div className="wrapper"> */}
            <Header />
            <Switch>

                <Route exact path="/" component={Home} />
                <Route exact path="/shop" component={shop} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/resend-otp" component={Resend} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/verify-account/:email" component={VerifyOtp} />
                <Route exact path="/products-info/:slug" component={ProductDetails} />
                <Route exact path="/view/cart" component={Cart} />
                <Route exact path="/shipping/payselect" component={ShippingAddress} />
                <Route component={PageNotFound} />

            </Switch>

            <Footer />

            {/* </div> */}


        </Router>


    );

}
// if (document.getElementById('app')) {
//     ReactDOM.render(<App />, document.getElementById('app'));
// }
if (document.getElementById('app')) {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>

            </Provider>
        </React.StrictMode >,
        document.getElementById('app')
    );
}