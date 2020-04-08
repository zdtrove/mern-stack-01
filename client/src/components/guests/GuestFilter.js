import React from 'react';
import {GuestContext} from '../../context/Guest/GuestProvider';

const GuestFilter = () => {
	const {toggleFilter} = React.useContext(GuestContext);
  	return (
	    <div className="toggle">
	      	<label className="switch">
	        	<input type="checkbox" onChange={toggleFilter} />
	        	<span className="slider round"></span>
	      	</label>
	      	<p className="lead">Show attending only!</p>
	    </div>
  	)
}

export default GuestFilter
