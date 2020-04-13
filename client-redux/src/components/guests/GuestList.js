import React from 'react';
import {connect} from 'react-redux';
import {getGuests} from '../../redux/actions/GuestActions';
import Guest from './GuestItem';
import Pagination from '../Pagination';

const Guests = (props) => {
	React.useEffect(() => {
		props.getGuests();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [guestsPerPage] = React.useState(3);
	const indexOfLastGuest = currentPage * guestsPerPage;
	const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
	let currentGuests = null;
	let listFilterGuests = null;
	if (props.searchResult !== null) {
		listFilterGuests = props.searchResult.filter(guest => !props.filterGuest || guest.isconfirmed);
		currentGuests = listFilterGuests.slice(indexOfFirstGuest, indexOfLastGuest);
	} else {
		listFilterGuests = props.guests.filter(guest => !props.filterGuest || guest.isconfirmed);
		currentGuests = listFilterGuests.slice(indexOfFirstGuest, indexOfLastGuest);
	}
	const paginate = pageNumber => setCurrentPage(pageNumber);
	if (props.guests === null || props.guests.length === 0) {
		return <h3 className="no-guest">Please add a guest</h3>
	}
	if (props.searchResult !== null && currentGuests.length === 0) {
		return <h3 className="no-guest">Not thing matched</h3>
	}
	if (props.filterGuest && currentGuests.length === 0) {
		return <h3 className="no-guest">No guest confirmed</h3>
	}
	return <>
		<div className="guests">
			{
				currentGuests.map(guest => 
					<Guest key={guest._id} guest={guest} />
				)
			}
		</div>
		<Pagination guestsPerPage={guestsPerPage} totalGuests={listFilterGuests.length} paginate={paginate} />
	</>
}

const mapStateToProps = state => {
	return {
		guests: state.guest.guests,
		searchResult: state.guest.searchResult,
		filterGuest: state.guest.filterGuest
	}
}

const mapActionsToProps = {
	getGuests
}

export default connect(mapStateToProps, mapActionsToProps)(Guests);
