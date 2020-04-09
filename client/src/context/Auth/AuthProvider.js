import React from 'react';
import axios from 'axios';
import AuthReducer from './AuthReducer';
import setToken from '../../utils/setToken';
import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    CLEAR_ERROR,
    LOGOUT,
    LOAD_USER,
    AUTH_ERROR
} from '../types';

const AuthContext = React.createContext();

const AuthProvider = props => {
    const initialState = {
        isAuthencated: null,
        loading: true,
        user: null,
        errors: null
    };
    const [state, dispatch] = React.useReducer(AuthReducer, initialState);
    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }

    // get user
    const loadUser = async () => {
        if (localStorage.token) {
            setToken(localStorage.token);
        }
        try {
            const res = await axios.get('/auth');
            dispatch({
                type: LOAD_USER,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }
    // register user
    const registerUser = async userData => {
        try {
            const res = await axios.post('/register', userData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.errors
            });
        }
    }
    // login user
    const loginUser = async userData => {
        try {
            const res = await axios.post('/auth', userData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.errors
            });
        }
    }

    const setError = err => {
        dispatch({
            type: REGISTER_FAIL,
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
            type: LOGOUT
        });
    }

    return (
        <AuthContext.Provider value={{
            user: state.user,
            isAuthencated: state.isAuthencated,
            errors: state.errors,
            loading: state.loading,
            loadUser,
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

export {
    AuthContext,
    AuthProvider
}
