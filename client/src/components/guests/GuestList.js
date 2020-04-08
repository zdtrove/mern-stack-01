import React from 'react'
import Guest from './GuestItem'
import { GuestContext } from '../../context/Guest/GuestProvider';
import { AuthContext } from '../../context/Auth/AuthProvider';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Guests = () => {
	const { guests, filterGuest, searchResult, getGuests } = React.useContext(GuestContext);
	const { loading } = React.useContext(AuthContext);
	React.useEffect(() => {
		getGuests();
		// eslint-disable-next-line
	}, []);
	if (guests === null || guests.length === 0) {
		return <h3 className="no-guest">{loading ? 'Loading guests...' : 'Please add a guest'}</h3>
	}
	return (
		<TransitionGroup className="guests">
			{searchResult !== null
				? searchResult.map(guest =>
					<CSSTransition key={guest._id} timeout={600} classNames='item'>
						<Guest guest={guest} />
					</CSSTransition>
				)
				: guests.filter(guest => !filterGuest || guest.isconfirmed).map(guest => 
					<CSSTransition key={guest._id} timeout={600} classNames='item'>
						<Guest guest={guest} />
					</CSSTransition>
				)
			}
		</TransitionGroup>
	)
}
export default Guests
