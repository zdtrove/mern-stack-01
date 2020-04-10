import React from 'react';
import {connect} from 'react-redux';
import {toggleFilter} from '../../redux/actions/GuestActions';

const GuestFilter = (props) => {
  	return (
	    <div className="toggle">
	      	<label className="switch">
	        	<input type="checkbox" onChange={props.toggleFilter} />
	        	<span className="slider round"></span>
	      	</label>
	      	<p className="lead">Show attending only!</p>
	    </div>
  	)
}

export default connect(null, {toggleFilter})(GuestFilter);
