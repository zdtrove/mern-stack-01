import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {logoutUser, clearError} from '../../redux/actions/AuthActions';
import {Link} from 'react-router-dom';

const Navbar = (props) => {
    const onLogout = () => {
        props.logoutUser();
        props.clearError();
    }
    const userLinks = (
        <Fragment>
            <li>Hello, {props.user && props.user.name}</li>
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
                <Link to='/'><h1><i className='fas fa-glass-cheers' />Party RSVP</h1></Link>
                <p>Made with <span>❤</span> by Mu Idrees</p>
            </div>
            <ul>
                {props.isAuthenticated ? userLinks : authLinks}
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, {logoutUser, clearError})(Navbar);