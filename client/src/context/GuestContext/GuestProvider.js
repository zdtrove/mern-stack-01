import React, {useReducer} from 'react';
import GuestContext from './GuestContext';
import GuestReducer from './GuestReducer';
import {
	TOGGLE_FILTER,
	SEARCH_GUEST,
	CLEAR_SEARCH,
	ADD_GUEST,
	REMOVE_GUEST,
	UPDATE_GUEST,
	EDIT_GUEST,
	CLEAR_EDIT
} from '../types';

const GuestProvider = props => {
	const initialState = {
		filterGuest: false,
		search: null,
		editAble: null,
		guests: [
			{
				id: 1,
				name: 'Jake Smith',
				phone: '333 444 9999',
				dietary: 'Vegan',
				isconfirmed: false
			},
			{
				id: 2,
				name: 'Merry Williams',
				phone: '222 888 8888',
				dietary: 'Non-Veg',
				isconfirmed: true
			},
			{
				id: 3,
				name: 'Azhaan Idress',
				phone: '333 666 4444',
				dietary: 'Pascatarian',
				isconfirmed: false
			}
		]
	}
	const [state, dispatch] = useReducer(GuestReducer, initialState);
	// Add Guest
	const addGuest = guest => {
		guest.id = Date.now();
		guest.isconfirmed = false;
		dispatch({
			type: ADD_GUEST,
			payload: guest
		});
	}
	// Remove Guest
	const removeGuest = id => {
		dispatch({
			type: REMOVE_GUEST,
			payload: id
		});
	}
	// Update Guest
	const updateGuest = guest => {
		dispatch({
			type: UPDATE_GUEST,
			payload: guest
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

	return (
		<GuestContext.Provider value={{
			guests: state.guests,
			filterGuest: state.filterGuest,
			search: state.search,
			editAble: state.editAble,
			addGuest,
			removeGuest,
			updateGuest,
			editGuest,
			clearEdit,
			toggleFilter,
			searchGuest,
			clearSearch
		}}>
			{props.children}
		</GuestContext.Provider>
	)
}

export default GuestProvider;