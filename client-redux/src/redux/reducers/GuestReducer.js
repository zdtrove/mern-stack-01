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

const initialState = {
    filterGuest: false,
    searchResult: null,
    editAble: null,
    guests: [],
    errors: null,
    addSuccess: false
}

export default function (state = initialState, {type, payload}) {
    switch (type) {
        default:
            return state;
    }
}