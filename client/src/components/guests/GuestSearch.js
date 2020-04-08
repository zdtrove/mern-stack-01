import React from 'react';
import {GuestContext} from '../../context/Guest/GuestProvider';

const GuestSearch = () => {
	const {searchGuest, clearSearch} = React.useContext(GuestContext);
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

export default GuestSearch
