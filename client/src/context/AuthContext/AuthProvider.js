import React from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import setToken from '../../utils/setToken';
import {
    SUCCESS_REGISTER,
    SUCCESS_LOGIN,
    FAIL_REGISTER,
    FAIL_LOGIN,
    SET_ERROR,
    CLEAR_ERROR,
    LOG_OUT,
    SET_USER,
    AUTH_ERROR
} from '../types';

const AuthProvider = props => {
    const initialState = {
        user: null,
        userAuth: null,
        errors: null
    };
    const [state, dispatch] = React.useReducer(AuthReducer, initialState);
    // get user
    const getUser = async () => {
        if (localStorage.token) {
            setToken(localStorage.token);
        }
        try {
            const res = await axios.get('/auth');
            dispatch({
                type: SET_USER,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: err
            })
        }
    }
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

    const setError = err => {
        dispatch({
            type: SET_ERROR,
            payload: err
        });
    }

    const clearError = () => {
        dispatch({
            type: CLEAR_ERROR
        });
    }

    const logout = () => {
        dispatch({
            type: LOG_OUT
        });
    }

    return (
        <AuthContext.Provider value={{
            user: state.user,
            userAuth: state.userAuth,
            errors: state.errors,
            getUser,
            registerUser,
            loginUser,
            logout,
            setError,
            clearError
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
