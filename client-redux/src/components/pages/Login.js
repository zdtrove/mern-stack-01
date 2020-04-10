import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginUser, clearError} from '../../redux/actions/AuthActions';

const Login = (props) => {
    React.useEffect(() => {
        if (props.isAuthenticated || localStorage.token) {
            props.history.push('/');
        }
    }, [props.isAuthenticated, props.history]);
    const [user, setUser] = React.useState({
        email: '',
        password: ''
    });
    const {email, password} = user;
    const handleChange = evt => {
        setUser({
            ...user,
            [evt.target.name]: evt.target.value
        });
        if (props.errors !== null) { 
            props.clearError();
        }
    }
    const handleSubmit = evt => {
        evt.preventDefault();
        props.loginUser({email, password});
        props.clearError();
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} required />
                <input type="submit" value="Login" className="btn" />
            </form>
            <div className="question">
                {props.errors !== null && 
                    <button className="danger">
                        {props.errors.msg ? props.errors.msg : props.errors[0].msg}
                        <span onClick={() => props.clearError()}>X</span>
                    </button>
                }
                <p>Dont' have an accout? {" "} <Link to='/register'>Sign Up</Link></p>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        errors: state.auth.errors
    }
}

const mapActionsToProps = {
    loginUser,
    clearError
}

export default connect(mapStateToProps, mapActionsToProps)(Login);