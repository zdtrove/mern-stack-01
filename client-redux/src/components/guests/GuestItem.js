import React from 'react';
import {connect} from 'react-redux';
import {removeGuest, updateGuest, loadGuestForUpdate, clearUpdateGuest} from '../../redux/actions/GuestActions';

const Guest = props => {
    const {_id, name, dietary, phone, isconfirmed} = props.guest;

    const handleRemove = () => {
        props.removeGuest(_id);
    }

    const handleIsconfirmed = () => {
        props.updateGuest({...props.guest, isconfirmed: !isconfirmed});
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
                        <i className="fas fa-user-edit" onClick={() => props.loadGuestForUpdate(props.guest)}></i>
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

const mapActionsToProps = {
    removeGuest, 
    updateGuest, 
    loadGuestForUpdate, 
    clearUpdateGuest
}

export default connect(null, mapActionsToProps)(Guest);
