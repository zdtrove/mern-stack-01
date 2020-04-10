import React from 'react';
import { connect } from 'react-redux';
import {addGuest, updateGuest, clearEdit, clearErrorGuest} from '../../redux/actions/GuestActions';

const GuestForm = (props) => {
    React.useEffect(() => {
        if (props.editAble !== null) {
            setGuest(props.editAble)
        } else {
            if (props.addSuccess || props.editAble === null) {
                setGuest({
                    name: '',
                    phone: '',
                    dietary: 'Non-Veg'
                });
            }
        }
    }, [props.editAble, props.addSuccess]);
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
    const onSubmit =  event => {
        event.preventDefault();
        if (props.editAble === null) {
            addGuest(guest);
            clearErrorGuest();
        } else {
            updateGuest(guest);
            clearEdit();
        }
    }
    return (
        <div className="invite-section">
            <h1>{props.editAble !== null ? 'Edit Guest' : 'Invite Someone'}</h1>
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
                <div className="question">
                    {props.errors !== null && 
                        <button className="danger">
                            {props.errors[0].msg}
                            <span onClick={() => props.clearErrorGuest()}>X</span>
                        </button>
                    }
                </div>
                <input type="submit" value={props.editAble !== null ? 'Update Guest' : 'Add Guest'} className="btn" />
                {props.editAble !== null ? <input onClick={props.clearEdit} value="Cancel" type="button" className="btn clear" /> : null}
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        editAble: state.guest.editAble,
        addSuccess: state.guest.addSuccess,
        errors: state.guest.errors
    }
}

const mapActionsToProps = {
    addGuest, 
    updateGuest, 
    clearEdit, 
    clearErrorGuest
}

export default connect(mapStateToProps, mapActionsToProps)(GuestForm);
