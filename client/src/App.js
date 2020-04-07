import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import GuestProvider from './context/GuestContext/GuestProvider';
import AuthProvider from './context/AuthContext/AuthProvider';
import Register from './components/pages/Register';
import Login from './components/pages/Login';

function App() {
    return (
        <AuthProvider>
            <GuestProvider>
                <Router>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/login' component={Login} />
                    </Switch>
                </Router>
            </GuestProvider>
        </AuthProvider>
    );
}

export default App;
