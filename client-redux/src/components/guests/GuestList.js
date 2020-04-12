import React from 'react';
import {connect} from 'react-redux';
import {getGuests} from '../../redux/actions/GuestActions';
import Guest from './GuestItem';
import Pagination from '../Pagination';

const Guests = (props) => {
	const [currentPage, setCurrentPage] = React.useState(1);
	const [guestsPerPage] = React.useState(4);
	const indexOfLastGuest = currentPage * guestsPerPage;
	const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
	const currentGuests = props.guests.slice(indexOfFirstGuest, indexOfLastGuest);
	const paginate = pageNumber => setCurrentPage(pageNumber);
	React.useEffect(() => {
		props.getGuests();
	}, [props.getGuests]);
	if (props.guests === null || props.guests.length === 0) {
		return <h3 className="no-guest">Please add a guest</h3>
	}
	return <>
		<div className="guests">
			{props.searchResult !== null
				? props.searchResult.map(guest =>
					<Guest key={guest._id} guest={guest} />
				)
				: currentGuests.filter(guest => !props.filterGuest || guest.isconfirmed).map(guest => 
					<Guest key={guest._id} guest={guest} />
				)
			}
		</div>
		<Pagination guestsPerPage={guestsPerPage} totalGuests={props.guests.length} paginate={paginate} />
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
