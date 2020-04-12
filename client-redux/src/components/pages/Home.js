import React from 'react'
import GuestFilter from '../guests/GuestFilter'
import GuestSearch from '../guests/GuestSearch'
import GuestForm from '../guests/GuestForm'
import GuestCounter from '../guests/GuestCounter'
import GuestList from '../guests/GuestList'
import {connect} from 'react-redux';
import {loadUser} from '../../redux/actions/AuthActions';

const Home = (props) => {
    React.useEffect(() => {
        props.loadUser();
    }, [props])
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
            <GuestList />
        </div>
    )
}

export default connect(null, {loadUser})(Home);
