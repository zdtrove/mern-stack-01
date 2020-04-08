import React from 'react';
import {AuthContext} from '../../context/Auth/AuthProvider';
import GuestForm from '../guests/GuestForm'
import GuestCounter from '../guests/GuestCounter'
import GuestFilter from '../guests/GuestFilter'
import GuestSearch from '../guests/GuestSearch'
import Guests from '../guests/GuestList'

const Home = () => {
    const {loadUser} = React.useContext(AuthContext);
    React.useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);
    return (
        <div className="app-container">
            <div className="main">
                <div className="filter">
                    <GuestFilter />
                    <GuestSearch />
                </div>
                <GuestForm />
                <GuestCounter />
            </div>
            <Guests />
        </div>
    )
}

export default Home;