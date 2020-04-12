import React from 'react';

const Pagination = ({ guestsPerPage, totalGuests, paginate }) => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalGuests / guestsPerPage); i++) {
		pageNumbers.push(i);
	}
	const pagination = {
		display: 'inline-block'
	}
	const button = {
		color: 'black',
		float: 'left',
		padding: '8px 16px',
		marginRight: '2px'
	}
	const wrapp = {
		width: '100%',
		textAlign: 'center'
	}
	return (
		<div style={wrapp}>
			<div style={pagination}>
				{pageNumbers.map(number => (
					<button style={button} key={number} onClick={() => paginate(number)} type="button">
						{number}
					</button>
				))}
			</div>
		</div>
	)
}

export default Pagination;