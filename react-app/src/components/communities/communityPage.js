import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { loadOneCommunityThunk } from '../../store/community'
import PostDiv from "../posts/postDiv";
import { NavLink } from "react-router-dom";
import './community.css'
import { loadPostsThunk } from '../../store/post';

export default function CommPage(){
    const dispatch = useDispatch()
    const history = useHistory()
    const {communityId} = useParams()
    const user = useSelector(state => state.session.user)
    const comm = useSelector(state => state.community.oneCommunity[0])
    const posts = useSelector(state => state.community.oneCommunity[0]?.post)

    const redire = () => {
        history.push('/newpost')
    }
    
    useEffect( async() => {
        await dispatch(loadOneCommunityThunk(communityId))
    }, [dispatch, communityId])
    
    useEffect( async() => {
        await dispatch(loadPostsThunk())
    },[dispatch])

    if(!comm) return null

    return(
        <div className='comm-container'>
            <img src={comm.background_img} className='background-img'></img>
            <div className='comm-name-bar'>
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
                    <div className="post-container">
                        {Object.values(posts).sort().reverse().map(post => (
                            <NavLink to={`/post/${post.community_id}/${post.id}`} className='post'>
                                <PostDiv 
                                post = {post}
                                key = {post.id}
                                />
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className="side-con"></div>
            </div>
        </div>
    )
}