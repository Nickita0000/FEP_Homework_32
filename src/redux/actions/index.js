import UsersListAPI from "../../contactAPI/UsersListAPI";

export const ACTION_USER_CREATE = 'create'
export const ACTION_USER_REMOVE = 'remove'
export const ACTION_USER_EDIT = 'edit'
export const ACTION_USER_UPDATE = 'update'
export const ACTION_SET_CONTACT_LIST = 'set-list'

export function fetchAPI() {
    return (dispatch) => {
        UsersListAPI.getList().then((newList) =>
        {
            dispatch(setList(newList))
        })
    }
}

export function setList(list) {
    return { type: ACTION_SET_CONTACT_LIST, payload: list}
}

export function create(user) {
    return { type: ACTION_USER_CREATE, payload: user}
}

export function remove(id) {
    return ((dispatch) => {
        UsersListAPI.deleteUser(id).then(() => {
            dispatch({ type: ACTION_USER_REMOVE, payload: id})
        })
    })
}

export function edit(user) {
    return { type: ACTION_USER_EDIT, payload: user }
}

export function update(changes) {
    return { type: ACTION_USER_UPDATE, payload: changes }
}

export function save(user) {
    return ((dispatch) => {
        if(user.id) {
            UsersListAPI.updateUser(user.id, user). then(() => {
                dispatch(update(user))
            })
        } else {
            UsersListAPI.createUser(user).then((newUser) => {
                dispatch(create(newUser))
            })
        }
    })
}
