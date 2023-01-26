import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useParams } from "react-router-dom"
import PostPage from "../posts/post"

export default function HomePage() {
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    console.log(user)

    const redire = () => {
        history.push('/newpost')
    }

    return(
        <div>
            <button onClick={redire}>
                <img className="prof-img" src={user.profile_img}></img>
                <form>
                    <input placeholder="Create Post" />
                </form>
            </button>
            <PostPage />
        </div>
    )
}