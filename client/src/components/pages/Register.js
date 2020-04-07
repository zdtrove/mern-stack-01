import React from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import { Link } from 'react-router-dom';

const Register = () => {
    const {registerUser, userAuth, errors} = React.useContext(AuthContext);
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
    const onSubmit = evt => {
        evt.preventDefault();
        if (password !== passwordConfirm) {
            console.log('not match')
        } else {
            registerUser({name, email, password});
        }
    }
    return (
        <div>
            <div className="register">
                <h1>Sign Up</h1>
                <form onSubmit={onSubmit}>
                    <input type="text" name="name" placeholder="Name" value={name} onChange={handleChange}/>
                    <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange}/>
                    <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange}/>
                    <input type="password" name="passwordConfirm" placeholder="Confirm Password" value={passwordConfirm} onChange={handleChange} required />
                    <input type="submit" value="Sing Up" className="btn" />
                </form>
                <div className="question">
                    {errors !== null && 
                        <button className="danger">
                            {errors.msg ? errors.msg : errors.errors[0].msg}
                            <span>X</span>
                        </button>
                    }
                    <p>Already have an accout? {" "} <Link to='/login'>Sign In </Link></p>
                </div>
            </div >
        </div>
    )
}

export default Register;
