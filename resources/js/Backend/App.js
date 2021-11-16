import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './partials/Header';
import Sidebar from './partials/Sidebar';
import Footer from './partials/Footer';
import Login from './components/auth/Login';
import PageNotFound from './components/pages/PageNotFound';
import { isAuthenticated } from './components/config/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
    if (isAuthenticated) {
        return (
            <Router>
                {/* <Switch> */}
                <div className="wrapper">
                    <Header />
                    <Sidebar />
                    <Footer />
                </div>
                {/* </Switch> */}


            </Router>


        );
    }
    else {

        return (
            <Router>
                <Switch>
                    <Route exact path="/admin/login" component={Login} />
                    <Route component={PageNotFound} />
                </Switch>
            </Router>


        );

    }

}
export default App;
if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}