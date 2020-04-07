import React from 'react'
import Guest from './Guest'
import GuestContext from '../../context/GuestContext/GuestContext';

const Guests = () => {
	const {guests, filterGuest, search, getGuests} = React.useContext(GuestContext);
	React.useEffect(() => {
		getGuests();
	}, [getGuests]);
  	return (
    	<div className="guests">
      		{search !== null 
      			? search.map(guest => <Guest key={guest.id} guest={guest} />)
      			: guests.filter(guest => !filterGuest || guest.isconfirmed).map(guest => <Guest key={guest.id} guest={guest} />)
      		}
    	</div>
  	)
}
export default Guests
