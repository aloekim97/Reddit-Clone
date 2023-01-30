import { useDispatch, useSelector } from "react-redux"
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom"
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
                        <div className="sort-by">
                            <div className="sort-butts">
                                <button className="sort-option">Best</button>
                                <button className="sort-option">Hot</button>
                                <button className="sort-option3">New</button>
                                <button className="sort-option">Top</button>
                                <button className="sort-option2">···</button>
                            </div>
                            
                        </div>
                        <PostPage />
                </div>
                <div className="side-cont">
                    <div className="home-mid-box">
                        <div className="home-mid-box-name">
                            <div className="pro-home">{user ? <img className="prof-img" src={user.profile_img}></img> : null } Home</div>
                            <div>Your personal Reddit frontpage. Come here to check in with your favorite communities.</div>
                            </div>
                        <div className="home-side-butt">
                            {user ? <NavLink to={'/newpost'}><button className='side-cr'>Create Post</button></NavLink> : <NavLink to={'/login'}><button className='side-cr'>Create Post</button></NavLink>}
                            {user ? <NavLink to={'/create'}><button className='side-cc'>Create Community</button></NavLink> :<NavLink to={'/login'}><button className='side-cc'>Create Community</button></NavLink>}
                        </div>
                    </div>
                        <div className="home-bot-box">
                            <div className="bot-top">
                                <p>Alex Kim</p>
                                <p>App Academy</p>
                                <p>idk what else to put</p>
                               </div>
                               <div className="bot-bot"> 
                                <p>will come back</p>
                                <p>valley ranch?</p>
                                <p>es just clone</p>
                            </div>
                        </div>
                </div>
            </div> 
    )
}