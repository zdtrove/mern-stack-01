import React from 'react'
import GuestFilter from '../guests/GuestFilter'
import GuestSearch from '../guests/GuestSearch'
import GuestForm from '../guests/GuestForm'
import GuestCounter from '../guests/GuestCounter'
import GuestList from '../guests/GuestList'

const Home = (props) => {
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

export default Home
