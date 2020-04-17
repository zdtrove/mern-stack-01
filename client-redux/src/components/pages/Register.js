import React from 'react';
import {connect} from 'react-redux';
import {registerUser, setError, clearError} from '../../redux/actions/AuthActions';
import { Link } from 'react-router-dom';

const Register = (props) => {
    React.useEffect(() => {
        if (props.isAuthenticated || localStorage.token) {
            props.history.push('/');
        }
    }, [props.isAuthenticated, props.history]);
    const [user, setUser] = React.useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });
    const {name, email, password, passwordConfirm} = user;
    const handleChange = evt => {
        setUser({
            ...user,
            [evt.target.name]: evt.target.value
        });
    }
    const handleSubmit = evt => {
        evt.preventDefault();
        if (password !== passwordConfirm) {
            props.setError({msg: "Password not match"});
        } else {
            props.registerUser({name, email, password});
            props.clearError();
        }
    }
    // console.log('RENDER-REGISTER');
    // console.log('-----------------------------------------------------------------------');
    return (
        <div>
            <div className="register">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" value={name} onChange={handleChange} />
                    <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
                    <input type="password" name="passwordConfirm" placeholder="Confirm Password" value={passwordConfirm} onChange={handleChange} required />
                    <input type="submit" value="Sign Up" className="btn" />
                </form>
                <div className="question">
                    {props.errors !== null && 
                        <button className="danger">
                            {props.errors.msg ? props.errors.msg : props.errors[0].msg}
                            <span onClick={() => props.clearError()}>X</span>
                        </button>
                    }
                    <p>Already have an accout? {" "} <Link to='/login'>Sign In </Link></p>
                </div>
            </div >
        </div>
    )
}

const mapStateToProps = state => {
    return {
        errors: state.auth.errors,
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapActionsToProps = {
    registerUser,
    setError,
    clearError
}

export default connect(mapStateToProps, mapActionsToProps)(Register);
