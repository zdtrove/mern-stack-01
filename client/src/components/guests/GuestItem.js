import React from 'react';
import {GuestContext} from '../../context/Guest/GuestProvider';

const Guest = ({guest}) => {
    const {removeGuest, updateGuest, editGuest, clearEdit} = React.useContext(GuestContext);
    const {_id, name, dietary, phone, isconfirmed} = guest;

    const handleRemove = () => {
        removeGuest(_id);
        clearEdit();
    }

    const handleIsconfirmed = () => {
        updateGuest({...guest, isconfirmed: !isconfirmed});
    }

    return (
        <div className="guest-card">
            <div className="card-head">
                <div>
                    <label className={`${isconfirmed && 'confirm'}`}> Confirmed
                        <i className={`fas fa-check-square ${isconfirmed && 'confirm'}`}>
                            <input type="checkbox" onChange={handleIsconfirmed} />
                        </i>
                    </label>
                </div>
                <div>
                    <button title="Edit Guest">
                        <i className="fas fa-user-edit" onClick={() => editGuest(guest)}></i>
                    </button>
                    <button onClick={handleRemove}>
                        <i className="fas fa-trash-alt remove"></i>
                    </button>
                </div>
            </div>
            <div className="card-body">
                <h2>{name}</h2>
                <span className={`badge ${dietary === 'Non-Veg' ? 'red' : dietary === 'Vegan' ? 'green' : 'seaGreen'}`}>{dietary}</span>
                <div className="contact">
                    <i className="fas fa-phone-alt" />
                    <p>{phone}</p>
                </div>
            </div>
        </div>
  )
}

export default Guest
