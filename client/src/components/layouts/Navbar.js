import React, {Fragment} from 'react';
import {AuthContext} from '../../context/Auth/AuthProvider';
import {Link} from 'react-router-dom';

const Navbar = () => {
    const {isAuthencated, logout, clearError, user} = React.useContext(AuthContext);
    const onLogout = () => {
        logout();
        clearError();
    }
    const userLinks = (
        <Fragment>
            <li>Hello, {user && user.name}</li>
            <span className="sm-hide">|</span>
            <li>
                <a href="/" onClick={onLogout}>
                    <span className="sm-hide">Logout</span>
                    <i className="fas fa-sign-out-alt"></i>
                </a>
            </li>
        </Fragment>
    );
    const authLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <span className="sm-hide">|</span>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    );
    return (
        <div className="navbar">
            <div className="logo">
                <h1><i className='fas fa-glass-cheers' />
                    Party RSVP
                </h1>
                <p>Made with <span>❤</span> by Mu Idrees</p>
            </div>
            <ul>
                {isAuthencated ? userLinks : authLinks}
            </ul>
        </div>
    )
}

export default Navbar