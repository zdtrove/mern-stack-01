import {
    TOGGLE_FILTER,
	SEARCH_GUEST,
	CLEAR_SEARCH,
	ADD_GUEST,
	REMOVE_GUEST,
	UPDATE_GUEST,
	LOAD_GUEST_FOR_UPDATE,
	CLEAR_UPDATE_GUEST,
	GET_GUESTS,
	GUESTS_ERROR,
	CLEAR_ERROR_GUEST
} from '../types';
import axios from 'axios';

const config = {
	'Content-Type': 'application/json'
}

export const getGuests = () => async dispatch => {
    if (localStorage.token) {
        axios.defaults.headers.common['auth-token'] = localStorage.token;
    }
    try {
    	const res = await axios.get('/guests');
    	dispatch({
    		type: GET_GUESTS,
    		payload: res.data
    	});
    } catch (err) {
    	dispatch({
    		type: GUESTS_ERROR,
    		payload: err.response.data.errors
    	});
    }
}

export const addGuest = guest => async dispatch => {
    try {
    	const res = await axios.post('/guests', guest, config);
    	dispatch({
    		type: ADD_GUEST,
    		payload: res.data
    	});
    } catch (err) {
    	dispatch({
    		type: GUESTS_ERROR,
    		payload: err.response.data.errors
    	});
    }
}

export const removeGuest = id => async dispatch => {
    try {
        await axios.delete(`/guests/${id}`);
        dispatch({
            type: REMOVE_GUEST,
            payload: id
        });
    } catch (err) {
        dispatch({
            type: GUESTS_ERROR,
            payload: err.response.data.errors
        });
    }
}

export const searchGuest = searchValue => dispatch => {
    dispatch({
        type: SEARCH_GUEST,
        payload: searchValue
    });
}

export const clearSearch = () => dispatch => {
    dispatch({
        type: CLEAR_SEARCH
    });
}

export const toggleFilter = () => dispatch => {
    dispatch({
        type: TOGGLE_FILTER
    });
}

export const updateGuest = guest => async dispatch => {
    try {
        const res = await axios.put(`/guests/${guest._id}`, guest, config);
        dispatch({
            type: UPDATE_GUEST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GUESTS_ERROR,
            payload: err.response.data.errors
        })
    }
}

export const clearUpdateGuest = () => dispatch => {
    dispatch({
        type: CLEAR_UPDATE_GUEST
    });
}

export const loadGuestForUpdate = guest => dispatch => {
    dispatch({
        type: LOAD_GUEST_FOR_UPDATE,
        payload: guest
    });
}

export const setErrorGuest = err => dispatch => {
    dispatch({
        type: GUESTS_ERROR,
        payload: err.errors
    });
}

export const clearErrorGuest = () => dispatch => {
    dispatch({
    	type: CLEAR_ERROR_GUEST
    });
}