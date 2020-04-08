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

export default (state, action) => {
    switch (action.type) {
        case LOAD_USER:
            return {
                ...state,
                isAuthencated: true,
                user: action.payload,
                loading: false,
                errors: null
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthencated: true,
                loading: null,
                errors: null
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthencated: null,
                user: null,
                loading: false,
                errors: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                errors: null
            }
        default:
            return state;
    }
}