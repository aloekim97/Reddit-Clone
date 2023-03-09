import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { loadCommunityThunk, loadOneCommunityThunk } from '../../store/community'
import PostDiv from "../posts/postDiv";
import { NavLink } from "react-router-dom";
import './community.css'
import { loadPostsThunk } from '../../store/post';
import { loadVotesThunk } from '../../store/votes';

export default function CommPage(){
    const dispatch = useDispatch()
    const history = useHistory()
    const {communityId} = useParams()
    const user = useSelector(state => state.session.user)
    const comm = useSelector(state => state.community.oneCommunity[0])
    const posts = useSelector(state => state.community.oneCommunity[0]?.post)
    const leng = comm?.member.length
    const desc = comm?.description

    const redire = () => {
        history.push('/newpost')
    }
    
    useEffect( async() => {
        await dispatch(loadOneCommunityThunk(communityId))
    }, [dispatch, communityId])
    
    useEffect(() => {
        dispatch(loadCommunityThunk())
        dispatch(loadVotesThunk())
    },[dispatch])

    if(!comm) return null

    return(
        <div className='comm-container'>
            <img src={comm.background_img} className='background-img'></img>
            <div className='comm-name-bar'>
            <div className='comm-container-contents'>
                <div className='the-comm-names'>
                    <img src={comm.community_img} className='commu-img'></img>
                    <div className='sub-r'>
                        <div className='main-name'>{comm.name}</div> 
                        <div>r/{comm.name}</div>
                    </div>
                    {user && comm.owner_id === user.id ? 
                    <button className='edit-join'>
                        <NavLink to={`/community/${communityId}/edit`} className='edit-comm'>Edit</NavLink>
                    </button> : 
                    <button className='edit-join'>Join</button>}
                    </div>
                </div>
            </div>
            <div className='post-sidebox'>
                <div className='commu-post'>
                    {user ? <div className="post-box">
                        <img className="prof-img" src={user.profile_img}></img>
                        <form>
                            <input onClick={redire}
                            className="text-link"
                            placeholder="Create Post" />
                        </form>
                    </div> : null }

                    {comm?.post.length === 0 ? 
                    <div className='comm-first-butts'>
                        <div className='grow-comm'>Grow your community</div>
                        <div className='make-first-post'>
                            <div className='l-fp'></div>
                            <div className='r-fp'>
                                <div className='time-to'>Time to make your first post!</div>
                                <div className='now-that'>Now that you've created your community, start things off right by making your first post.</div>
                                <NavLink to={'/newpost'} className='first-p-l'>Make Your First Post</NavLink>
                                </div>
                        </div>
                        <div className='make-first-post'>
                            <div className='l-fp-d'></div>
                            <div className='r-fp'>
                                <div className='time-to'>Recurit more members</div>
                                <div className='now-that'>Learn how to use invitations to bring more members and moderators to your community.</div>
                                <div className='learn-more'>Learn More</div>
                                </div>
                        </div>
                    </div>:
                    <div className="post-container">
                        {Object.values(posts).sort().reverse().map(post => (
                            <NavLink to={`/post/${post.community_id}/${post.id}`} className='post'>
                                <PostDiv 
                                post = {post}
                                key = {post.id}
                                />
                            </NavLink>
                        ))}
                    </div>}
                </div>
                <div className="side-con">
                    <div className="home-mid-box">
                        <div className="home-mid-box-name">
                                <div className='about-comm'>About {comm.name}</div>
                            <div className="abt-comm-div">
                                <div className='com-desc'>{desc}</div>
                                <div>{comm.name} has {leng + 1} members!</div>
                            </div>
                        </div>
                        <div className="comm-side-butt">
                            {user ? <NavLink to={'/newpost'}><button className='comm-side-cc'>Create Post</button></NavLink> : <NavLink to={'/login'}><button className='comm-side-cc'>Create Post</button></NavLink>}
                        </div>
                    </div>
                    <div className="home-mid-box">
                    <div className='comm-rules'>{comm.name}'s rules</div>
                    <div className='rules-cont'> 
                        <div className='rules'>Be nice</div>
                        <div className='rules'>Share what you like</div>
                        <div className='rules'>Post what the community is about</div>
                        <div className='rules'>Any post can be taken out if it goes against T.O.S.</div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}