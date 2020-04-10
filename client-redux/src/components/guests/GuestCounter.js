import React from 'react';
import {connect} from 'react-redux';

const GuestCounter = (props) => {
    const confirmed = props.guests.filter(guest => guest.isconfirmed);
    const countByDiet = diet => {
        return {
            total: props.guests.filter(guest => guest.dietary === diet).length,
            confirmed: confirmed.filter(guest => guest.dietary === diet).length
        }
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Guest</th>
                        <th>Invited</th>
                        <th>Attending</th>
                    </tr>
                    <tr>
                        <th>Non-Veg</th>
                        <td>{countByDiet('Non-Veg').total}</td>
                        <td>{countByDiet('Non-Veg').confirmed}</td>
                    </tr>
                    <tr>
                        <th>Vegan</th>
                        <td>{countByDiet('Vegan').total}</td>
                        <td>{countByDiet('Vegan').confirmed}</td>
                    </tr><tr>
                        <th>Pascatarians</th>
                        <td>{countByDiet('Pascatarian').total}</td>
                        <td>{countByDiet('Pascatarian').confirmed}</td>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <td>{props.guests.length}</td>
                        <td>{confirmed.length}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        guests: state.guest.guests
    }
}

export default connect(mapStateToProps)(GuestCounter);
