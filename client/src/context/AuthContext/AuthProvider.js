import React from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import {
    SUCCESS_REGISTER,
    SUCCESS_LOGIN,
    FAIL_REGISTER,
    FAIL_LOGIN
} from '../types';

const AuthProvider = props => {
    const initialState = {
        userAuth: null,
        errors: null
    };
    const [state, dispatch] = React.useReducer(AuthReducer, initialState);
    // register user
    const registerUser = async userData => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/register', userData, config);
            dispatch({
                type: SUCCESS_REGISTER,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: FAIL_REGISTER,
                payload: err.response.data
            });
        }
    }
    // login user
    const loginUser = async userData => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/auth', userData, config);
            dispatch({
                type: SUCCESS_LOGIN,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: FAIL_LOGIN,
                payload: err.response.data
            });
        }
    }

    return (
        <AuthContext.Provider value={{
            userAuth: state.userAuth,
            errors: state.errors,
            registerUser,
            loginUser
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
