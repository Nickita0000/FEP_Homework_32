import {
    ACTION_SET_CONTACT_LIST,
    ACTION_USER_CREATE,
    ACTION_USER_EDIT,
    ACTION_USER_REMOVE,
    ACTION_USER_UPDATE,
} from "../actions";


export const initialState = {
    list: [],
    userEdit: {
        name: '',
        surname: '',
        phone: '',
    },
}

export default function contactReducer(state = initialState, { type, payload }) {
    switch (type){
        case ACTION_USER_CREATE: return {
            ...state,
            list: [
                ...state.list,
                {...payload}
            ]
        }
        case ACTION_USER_REMOVE:
            const newUserList = state.list.filter(user => user.id !== payload)

            return { ...state, list: newUserList }
        case ACTION_SET_CONTACT_LIST:
            return { ...state, list: payload}
        case ACTION_USER_EDIT:
            return { ...state, userEdit: payload }
        case ACTION_USER_UPDATE:
            const updatedUserList = state.list.map(userItem => userItem.id === payload.id ? payload : userItem)

            return { ...state, list: updatedUserList, userEdit: {} }
        default: return state
    }
}