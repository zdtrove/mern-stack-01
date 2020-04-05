import React from 'react';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import GuestProvider from './context/GuestContext/GuestProvider';

function App() {
    return (
        <GuestProvider>
            <Navbar />
            <Home />
        </GuestProvider>
    );
}

export default App;
