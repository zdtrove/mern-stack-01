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
    	case GET_GUESTS:
    		return {
    			...state,
    			guests: payload,
    			errors: null
    		}
    	case ADD_GUEST:
    		return {
    			...state,
                addSuccess: true,
    			guests: [...state.guests, payload]
    		}
        case LOAD_GUEST_FOR_UPDATE:
            return {
                ...state,
                editAble: payload
            }
        case UPDATE_GUEST:
            return {
                ...state,
                guests: state.guests.map(guest => guest._id === payload._id ? payload : guest)
            }
        case CLEAR_UPDATE_GUEST:
            return {
                ...state,
                editAble: null
            }
        case REMOVE_GUEST:
            return {
                ...state,
                guests: state.guests.filter(guest => guest._id !== payload)
            }
    	case GUESTS_ERROR:
    		return {
    			...state,
                addSuccess: false,
    			errors: payload
    		}
    	case CLEAR_ERROR_GUEST:
    		return {
    			...state,
    			errors: null,
                addSuccess: false
    		}
        case TOGGLE_FILTER:
            return {
                ...state,
                filterGuest: !state.filterGuest
            }
        case SEARCH_GUEST:
            const reg = new RegExp(payload, 'gi');
            return {
                ...state,
                searchResult: state.guests.filter(guest => guest.name.match(reg))
            }
        case CLEAR_SEARCH:
            return {
                ...state,
                searchResult: null
            }
        default:
            return state;
    }
}