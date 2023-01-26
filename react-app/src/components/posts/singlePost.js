import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import moment from 'moment'
import { useEffect, useState } from "react"
import { deletePostThunk, loadOnePostThunk, postDetail } from "../../store/post"

export default function SinglePost({post}) {
    const dispatch = useDispatch()
    const { communityId, postId } = useParams()
    const [users, setUsers] = useState([]);
    const history = useHistory()
    // const post = useSelector(state => state.post.postDetails)

    const timeAgo = moment(new Date(post.created_at)).fromNow()
    console.log(communityId, postId)


    useEffect(() => {
        dispatch(loadOnePostThunk(communityId, postId))
    }, [dispatch, communityId, postId])

    const handleDel = async (e) => {
        e.preventDefault()
        await dispatch(deletePostThunk(postId))
        history.push('/')
    }
    
    return(
        <div className="post-container">
                <div className="top-of-post">
                    <div>{post.community_id}</div>
                    {/* <div>Posted by u/ {post.user.username}</div> */}
                    <div>{timeAgo}</div>
                </div>
            <div className="post-content">{post.content}</div>
            <button onClick={handleDel} type="submit">Delete</button>
        </div>
    )
}