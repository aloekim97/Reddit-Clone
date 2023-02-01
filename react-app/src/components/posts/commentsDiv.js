import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadCommentsThunk } from "../../store/comment"

export default function CommentDiv(post){
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comment.allComments)
    const user = useSelector(state => state.session.user)
    

    useEffect(() => {
        dispatch(loadCommentsThunk())
    },[dispatch])
    return(
        <div>
            {Object.values(comments).filter(comment => comment.post_id === post.post.id).map(commen => (
                <div className="one-comment-cont">
                    <div className="comment-top">
                        <img className="comment-prof" src={commen.user?.profile_img} />
                        {commen.user.username} ·
                        {commen.created_at}
                    </div>
                    <div className="comment-content">
                        <div className="comm-comment"> {commen.comment} </div>
                        {user.id === commen.user.id ? 
                        <div className="comm-loc">
                            <button className="comm-butt">Reply</button>
                            <button className="comm-butt">Edit</button>
                            <button className="comm-butt">Delete</button>
                        </div> :  
                        <div className="comm-loc"><button className="comm-butt">Reply</button> </div> } 
                        
                    </div>
                    
                </div>
            ))}
        </div>
    )
}