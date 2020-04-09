import React from 'react';
import {AuthContext} from '../../context/Auth/AuthProvider';
import {Link} from 'react-router-dom';

const Login = (props) => {
    const {loginUser, isAuthencated, errors, clearError} = React.useContext(AuthContext);
    React.useEffect(() => {
        if (isAuthencated || localStorage.token) {
            props.history.push('/');
            clearError();
        } else {
            clearError();
        }
        // eslint-disable-next-line
    }, [isAuthencated, props.history]);
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
        if (errors !== null) { 
            clearError();
        }
    }
    const onSubmit = evt => {
        evt.preventDefault();
        loginUser({email, password});
        clearError();
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="submit" value="Login" className="btn" />
            </form>
            <div className="question">
                {errors !== null && 
                    <button className="danger">
                        {errors[0].msg}
                        <span onClick={() => clearError()}>X</span>
                    </button>
                }
                <p>Dont' have an accout? {" "} <Link to='/register'>Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login;