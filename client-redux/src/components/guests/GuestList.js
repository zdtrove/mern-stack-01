import React from 'react';
import {connect} from 'react-redux';
import {filterGuest, getGuests} from '../../redux/actions/GuestActions';
import Guest from './GuestItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Guests = (props) => {
	React.useEffect(() => {
		getGuests();
	});
	if (props.guests === null || props.guests.length === 0) {
		return <h3 className="no-guest">Please add a guest</h3>
	}
	return (
		<TransitionGroup className="guests">
			{props.searchResult !== null
				? props.searchResult.map(guest =>
					<CSSTransition key={guest._id} timeout={600} classNames='item'>
						<Guest guest={guest} />
					</CSSTransition>
				)
				: props.guests.filter(guest => !props.filterGuest || guest.isconfirmed).map(guest => 
					<CSSTransition key={guest._id} timeout={600} classNames='item'>
						<Guest guest={guest} />
					</CSSTransition>
				)
			}
		</TransitionGroup>
	)
}

const mapStateToProps = state => {
	return {
		guests: state.guest.guests,
		searchResult: state.guest.searchResult
	}
}

const mapActionsToProps = {
	filterGuest,
	getGuests
}

export default connect(mapStateToProps, mapActionsToProps)(Guests);
