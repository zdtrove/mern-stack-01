import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    SET_AUTHENTICATED
} from '../types';

const initialState = {
    isAuthenticated: null,
    user: null,
    errors: null,
}

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: true,
                errors: null
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                errors: null
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: null,
                user: null,
                errors: payload
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