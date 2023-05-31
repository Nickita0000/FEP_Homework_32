import TableHeader from "./TableHeader";
import User from "./User.js"
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchAPI} from "./redux/actions";

export default function List() {
    const list = useSelector((state) => state.list)
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(fetchAPI())
    }, [dispatch])

    return (
        <table>
            <TableHeader/>
            <tbody>
            {
                list.map(user => (
                    <User
                        key={user.id}
                        user={user}
                    />
                ))
            }
            </tbody>
        </table>
    )
}