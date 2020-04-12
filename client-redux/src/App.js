import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Navbar from './components/layouts/Navbar';
import {Provider} from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import PrivateRoute from './components/routes/PrivateRoute';
import axios from 'axios';

const token = localStorage.token;
if (token) {
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['auth-token'] = token;
} else {
    delete axios.defaults.headers.common['auth-token'];
}

function App() {
    // console.log('RENDER-APP');
    // console.log('-----------------------------------------------------------------------');
    return (
        <Fragment>
            <Provider store={store}>
                <Router>
                    <Navbar />
                    <Switch>
                        <PrivateRoute exact path="/" component={Home} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                    </Switch>
                </Router>
            </Provider>
        </Fragment>
    );
}

export default App;
