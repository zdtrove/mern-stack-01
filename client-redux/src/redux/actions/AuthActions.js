import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from '../types';
import axios from 'axios';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const registerUser = userData => async dispatch => {
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

export const loginUser = userData => async dispatch => {
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
        })
    }
}

export const logoutUser = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}

export const setError = err => dispatch => {
    dispatch({
        type: REGISTER_FAIL,
        payload: err
    });
}

export const clearError = () => dispatch => {
    dispatch({
        type: CLEAR_ERROR
    });
}