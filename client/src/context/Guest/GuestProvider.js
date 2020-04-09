import React, {useReducer} from 'react';
import axios from 'axios';
import GuestReducer from './GuestReducer';
import setToken from '../../utils/setToken';
import {
	TOGGLE_FILTER,
	SEARCH_GUEST,
	CLEAR_SEARCH,
	ADD_GUEST,
	REMOVE_GUEST,
	UPDATE_GUEST,
	EDIT_GUEST,
	CLEAR_EDIT,
	GET_GUESTS,
	GUESTS_ERROR,
	CLEAR_GUESTS,
	CLEAR_ERROR_GUEST
} from '../types';

const GuestContext = React.createContext();

const GuestProvider = props => {
	const initialState = {
		filterGuest: false,
		searchResult: null,
		editAble: null,
		guests: [],
		errors: null,
		addSuccess: false
	}
	const [state, dispatch] = useReducer(GuestReducer, initialState);
	const config = {
		'Content-Type': 'application/json'
	}
	// get guests
	const getGuests = async () => {
		if (localStorage.token) {
            setToken(localStorage.token);
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
				payload: err.response
			});
		}
	}
	// Add Guest
	const addGuest = async guest => {
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
	// Remove Guest
	const removeGuest = async id => {
		try {
			await axios.delete(`/guests/${id}`);
			dispatch({
				type: REMOVE_GUEST,
				payload: id
			});
		} catch (err) {
			dispatch({
				type: GUESTS_ERROR,
				payload: err.response.msg
			});
		}
		
	}
	// Update Guest
	const updateGuest = async guest => {
		try {
			const res = await axios.put(`/guests/${guest._id}`, guest, config);
			dispatch({
				type: UPDATE_GUEST,
				payload: res.data
			});
			getGuests();
		} catch (err) {
			dispatch({
				type: GUESTS_ERROR,
				payload: err.response
			});
		}
	}
	const toggleFilter = () => {
		dispatch({
			type: TOGGLE_FILTER
		});
	}
	const searchGuest = guest => {
		dispatch({
			type: SEARCH_GUEST,
			payload: guest
		});
	}
	const clearSearch = () => {
		dispatch({
			type: CLEAR_SEARCH
		});
	}
	const editGuest = guest => {
		dispatch({
			type: EDIT_GUEST,
			payload: guest
		});
	}
	const clearEdit = () => {
		dispatch({
			type: CLEAR_EDIT
		});
	}
	const clearGuests = () => {
		dispatch({
			type: CLEAR_GUESTS
		});
	}

	const clearErrorGuest = () => {
		dispatch({
			type: CLEAR_ERROR_GUEST
		});
	}
	
	return (
		<GuestContext.Provider value={{
			addSuccess: state.addSuccess,
			guests: state.guests,
			filterGuest: state.filterGuest,
			searchResult: state.searchResult,
			editAble: state.editAble,
			errors: state.errors,
			getGuests,
			addGuest,
			removeGuest,
			updateGuest,
			editGuest,
			clearEdit,
			toggleFilter,
			searchGuest,
			clearSearch,
			clearGuests,
			clearErrorGuest
		}}>
			{props.children}
		</GuestContext.Provider>
	)
}

export {
	GuestContext,
	GuestProvider
};