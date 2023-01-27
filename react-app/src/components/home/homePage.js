import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useParams } from "react-router-dom"
import PostPage from "../posts/post"
import './home.css'

export default function HomePage() {
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    console.log(user)

    const redire = () => {
        history.push('/newpost')
    }

    return(
        <div className="home-page">
            <div>
                <div className="post-box">
                    <img className="prof-img" src={user.profile_img}></img>
                        <form>
                            <input onClick={redire}
                            className="text-link"
                            placeholder="Create Post" />
                        </form>
                </div> 
                    <PostPage />
            </div>
            <div className="side-cont"></div>
        </div>
    )
}