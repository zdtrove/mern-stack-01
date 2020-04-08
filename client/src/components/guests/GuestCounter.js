import React from 'react';
import { GuestContext } from '../../context/Guest/GuestProvider';

const GuestCounter = () => {
    const { guests } = React.useContext(GuestContext);
    const confirmed = guests.filter(guest => guest.isconfirmed);
    const countByDiet = diet => {
        return {
            total: guests.filter(guest => guest.dietary === diet).length,
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
                        <td>{guests.length}</td>
                        <td>{confirmed.length}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default GuestCounter
