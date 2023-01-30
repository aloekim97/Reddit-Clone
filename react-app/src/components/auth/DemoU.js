import { useDispatch } from "react-redux";
import { login } from "../../store/session"


export const AutoLogin = () => {
    const dispatch = useDispatch()
    const loginWfaker = () => {
        dispatch(login('alex@aa.io', 'password'))
    }
    return(
        <button className="auto" onClick={loginWfaker}>Demo User</button>
    )
}