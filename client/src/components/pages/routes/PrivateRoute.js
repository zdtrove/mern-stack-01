import React from 'react';
import AuthContext from '../../../context/AuthContext/AuthContext';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
	const {userAuth} = React.useContext(AuthContext);
	return (
		<Route 
			{...rest}
			render={props => (!userAuth && !localStorage.token) ? <Redirect to='/login' /> : <Component {...props} />}
		/>
	);
}

export default PrivateRoute;