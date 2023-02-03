import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory, useParams } from "react-router-dom"
import moment from 'moment'
import { useEffect, useState } from "react"
import { deletePostThunk, loadOnePostThunk, postDetail } from "../../store/post"
import './singlepost.css'
import { loadOneCommunityThunk } from "../../store/community"
import { createCommentsThunk, loadCommentsThunk } from "../../store/comment"
import CommentDiv from "./commentsDiv"


moment.updateLocale("en", {
    relativeTime: {
      future: (diff) => (diff === "just now" ? diff : `in ${diff}`),
      past: (diff) => (diff === "just now" ? diff : `${diff}`),
      s: "just now",
      ss: "just now",
      m: "1 minute",
      mm: "%d min",
      h: "1 hr",
      hh: "%d hrs",
      d: "1 day",
      dd: "%d days",
      M: "1 month",
      MM: "%d months",
      y: "1 year",
      yy: "%d years",
    },
  });

export default function SinglePost() {
    const dispatch = useDispatch()
    const { communityId, postId } = useParams()
    const history = useHistory()
    const comms = useSelector(state => state.community.oneCommunity[0])
    const post = useSelector(state => state.post.postDetails)
    const user = useSelector(state => state.session.user)
    const comm = useSelector(state => state.community.oneCommunity[0])
    const leng = comm?.member.length
    const desc = comm?.description
    const timeAgo = moment(new Date(post.created_at)).fromNow()
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])
    const post_id = postId  

    
    useEffect(() => {
        dispatch(loadOneCommunityThunk(communityId))
    },[dispatch, communityId])

    useEffect(() => {
        dispatch(loadOnePostThunk(communityId, postId))
        dispatch(loadCommentsThunk())
    }, [dispatch, communityId, postId])

    const handleDel = async (e) => {
        e.preventDefault()
        await dispatch(deletePostThunk(postId))
        history.push('/')
    }

    const handleSub = async (e) => {
        e.preventDefault()

        let err=[]
        if(comment.length < 1) err.push('Please enter a comment')
        setErrors(err)
        if (err.length) return errors

        const content = {
            comment,
            post_id,
        }
        await dispatch(createCommentsThunk(content))
        .then(() => {
            setComment('')
        })
        await dispatch(loadCommentsThunk())
    }

    if(!post.user) return null
    
    return(
        <div className="post-bg">
            <div className="post-main-cont">
            <div className="post-comments">
                <div>
                <div className="single-post">
                    <div className="upvote"></div>  
                    <div className="all-the">
                        <div className="right-post">
                            <div className="top-of-post">
                                <NavLink to={`/community/${communityId}`} className='single-post-comm'>
                                    <img src={comms?.community_img} className='sing-img'></img>
                                    <div className="comm-name">r/{comms?.name} ·</div>
                                </NavLink>
                                <div className="post-user">Posted by u/{post.user.username}</div>
                                <div>{timeAgo}</div>
                            </div>
                            <div className="post-content">{post.title}</div>
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
                <div className="cr-comments">
                    {user ? <div className="above-combox">comment as {user?.username}</div> : <div className="above-combox">Log in to comment</div> }
                        <form className="comment-form">
                            <textarea className="comment-input"
                            placeholder="What are your thoughts?"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            />
                        </form>
                        <div className="butt-loc3">
                            {comment.length && user ? <button className="sub-comment" onClick={handleSub}>Submit</button> : null}
                            {comment.length && !user ? <NavLink to={'/login'} className='sub-comment2'>Submit</NavLink> : null}
                        </div> 
                    </div>
                <div className="divider"><div className="divicer"></div></div>
                <div className="comment-section">
                            <CommentDiv 
                            post={post}
                            />
                </div> 
                </div>

            <div className="side-con">
                    <div className="home-mid-box">
                        <div className="home-mid-box-name">
                                <div className='about-comm'>About {comm?.name}</div>
                            <div className="abt-comm-div">
                                <div className='com-desc'>{desc}</div>
                                <div>{comm?.name} has {leng + 1} members!</div>
                            </div>
                        </div>
                        <div className="comm-side-butt">
                            {user ? <NavLink to={'/newpost'}><button className='comm-side-cr'>Create Post</button></NavLink> : <NavLink to={'/login'} className='comm-side-cb'>Create Post</NavLink>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 