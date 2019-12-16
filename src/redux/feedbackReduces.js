import * as ActionTypes from './action/ActionTypes';

export const Contacts = (state = { erroMess: null, contacts: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CONTACT:
            let concat = action.payload;
            return { ...state, contacts: state.contacts.concat(contact) };
        default:
            return state;
    }

}