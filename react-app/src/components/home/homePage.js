import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useParams } from "react-router-dom"
import PostPage from "../posts/post"
import './home.css'

export default function HomePage() {
    const user = useSelector(state => state.session.user)
    const history = useHistory()

    const redire = () => {
        history.push('/newpost')
    }

    return(
            <div className="home-container">
                <div className="maybe">
                    {user ? <div className="post-box">
                        <img className="prof-img" src={user.profile_img}></img>
                            <form>
                                <input onClick={redire}
                                className="text-link"
                                placeholder="Create Post" />
                            </form>
                    </div> : null }
                        <PostPage />
                </div>
                <div className="side-cont"></div>
            </div> 
    )
}