import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {GuestProvider} from './context/Guest/GuestProvider';
import {AuthProvider} from './context/Auth/AuthProvider';
import setToken from '../src/utils/setToken';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import PrivateRoute from '../src/components/pages/routes/PrivateRoute';
import './App.css';

if (localStorage.token) {
    setToken(localStorage.token);
}

const App = () => {
    return (
        <AuthProvider>
            <GuestProvider>
                <Router>
                    <Navbar />
                    <Switch>
                        <PrivateRoute exact path='/' component={Home} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/login' component={Login} />
                    </Switch>
                </Router>
            </GuestProvider>
        </AuthProvider>
    );
}

export default App;
