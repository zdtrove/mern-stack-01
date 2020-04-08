import React from 'react';
import {AuthContext} from '../../../context/Auth/AuthProvider';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
	const {isAuthencated} = React.useContext(AuthContext);
	return (
		<Route 
			{...rest}
			render={props => (!isAuthencated && !localStorage.token) ? <Redirect to='/login' /> : <Component {...props} />}
		/>
	);
}

export default PrivateRoute;