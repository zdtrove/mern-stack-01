import React from 'react';
import {connect} from 'react-redux';
import {searchGuest, clearSearch} from '../../redux/actions/GuestActions';

const GuestSearch = (props) => {
	const searchValue = React.useRef('');
	const handleChange = event => {
		if (searchValue.current.value !== '') {
			searchGuest(event.target.value);
		} else {
			clearSearch();
		}
	}
  	return (
    	<div>
      		<input ref={searchValue} type="text" onChange={handleChange} className="search" placeholder=" Search Guest by name ..." />
      		<i className="fas fa-search search-icon" />
    	</div>
  	)
}

const mapActionsToProps = {
	searchGuest, 
	clearSearch
}

export default connect(null, mapActionsToProps)(GuestSearch);
