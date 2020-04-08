import React from 'react';
import {GuestContext} from '../../context/Guest/GuestProvider';

const GuestForm = () => {
    const {addGuest, editAble, updateGuest, clearEdit} = React.useContext(GuestContext);
    React.useEffect(() => {
        if (editAble !== null) {
            setGuest(editAble);
        } else {
            setGuest({
                name: '',
                phone: '',
                dietary: 'Non-Veg'
            });
        }
    }, [editAble]);
    const [guest, setGuest] = React.useState({
        name: '',
        phone: '',
        dietary: 'Non-Veg'
    });
    const {name, phone, dietary} = guest;
    const handleChange = event => {
        setGuest({
            ...guest,
            [event.target.name]: event.target.value
        });
    }
    const onSubmit = event => {
        event.preventDefault();
        if (editAble === null) {
            addGuest(guest);
        } else {
            updateGuest(guest);
            clearEdit();
        }
        setGuest({
            name: '',
            phone: '',
            dietary: 'Non-Veg'
        });
    }

    return (
        <div className="invite-section">
            <h1>{editAble !== null ? 'Edit Guest' : 'Invite Someone'}</h1>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Name" name="name" 
                    value={name} onChange={handleChange} />
                <input type="text" placeholder="Phone" name="phone" 
                    value={phone} onChange={handleChange} />
                <p className="options-label">Dietary</p>
                <div className="options">
                    <label className="container">Non-veg
                        <input type="radio" name="dietary" value='Non-Veg' 
                            checked={dietary === 'Non-Veg'} onChange={handleChange} />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Vegan
                        <input type="radio" name="dietary" value='Vegan' 
                            checked={dietary === 'Vegan'} onChange={handleChange} />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Pascatarian
                        <input type="radio" name="dietary" value='Pascatarian' 
                            checked={dietary === 'Pascatarian'} onChange={handleChange} />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <input type="submit" value={editAble !== null ? 'Update Guest' : 'Add Guest'} className="btn" />
                {editAble !== null ? <input onClick={clearEdit} value="Cancel" type="button" className="btn clear" /> : null}
            </form>
        </div>
    )
}

export default GuestForm
