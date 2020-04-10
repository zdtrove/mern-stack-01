import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from './reducers/AuthReducer';
import GuestReducer from './reducers/GuestReducer';
import {createLogger} from 'redux-logger';

const initialState = {};
const middleware = [thunk, createLogger()];
const reducers = combineReducers({
    auth: AuthReducer,
    guest: GuestReducer
});

const store = createStore(
    reducers,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;