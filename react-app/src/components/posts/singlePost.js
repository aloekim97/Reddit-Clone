import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory, useParams } from "react-router-dom"
import moment from 'moment'
import { useEffect, useState } from "react"
import { deletePostThunk, loadOnePostThunk, postDetail } from "../../store/post"
import './singlepost.css'
import { loadOneCommunity, loadOneCommunityThunk } from "../../store/community"

export default function SinglePost() {
    const dispatch = useDispatch()
    const { communityId, postId } = useParams()
    const [users, setUsers] = useState([]);
    const history = useHistory()
    const comms = useSelector(state => state.community.oneCommunity[0])
    const post = useSelector(state => state.post.postDetails)
    const user = useSelector(state => state.session.user)

    const timeAgo = moment(new Date(post.created_at)).fromNow()
    
    useEffect(() => {
        dispatch(loadOneCommunityThunk(communityId))
    },[dispatch, communityId])

    useEffect(() => {
        dispatch(loadOnePostThunk(communityId, postId))
    }, [dispatch, communityId, postId])

    const handleDel = async (e) => {
        e.preventDefault()
        await dispatch(deletePostThunk(postId))
        history.push('/')
    }
    if(!post.user) return null
    
    return(
        <div className="post-bg">
            <div className="post-main-cont">
                <div className="single-post">
                    <div className="upvote"></div>  
                    <div className="all-the">
                        <div className="right-post">
                            <div className="top-of-post">
                                <img src={comms?.community_img} className='sing-img'></img>
                                <div>{comms?.name} ·</div>
                                <div className="post-user">Posted by u/{post.user.username}</div>
                                <div>{timeAgo}</div>
                            </div>
                            <div className="post-content">{post.content}</div>
                        </div>
                    {user && post.user.id === user.id ?
                    <div className="buttons-o-post">
                        <button type="submit" onClick={handleDel} className='butt'>Delete</button>
                        <button className="butt"><NavLink to={`/post/${communityId}/${post.id}/update`} className="update-o">Update</NavLink></button>
                    </div> : null }
                    </div>
                </div>
            </div>
        </div>
    )
}