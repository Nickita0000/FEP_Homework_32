import {edit, remove} from "./redux/actions";
import {useDispatch} from "react-redux";

export default function User({ user }) {
    const dispatch = useDispatch()

    function onDeleteBtnClick() {
        dispatch(remove(user.id))
    }

    function onEditBtnClick() {
        dispatch(edit(user))
    }

    return(
        <tr>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.phone}</td>
            <td>
                <button onClick={onEditBtnClick}>Edit</button>
                <button onClick={onDeleteBtnClick}>Delete</button>
            </td>
        </tr>
    )
}