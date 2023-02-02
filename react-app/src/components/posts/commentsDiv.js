import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteCommentsThunk, editCommentsThunk, loadCommentsThunk } from "../../store/comment"

export default function CommentDiv(post){
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comment.allComments)
    const user = useSelector(state => state.session.user)
    const [openEdit, setOpenEdit] = useState(0)
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])
    const [commentId, setCommentId] = useState(0)

    const handleOpen = (commentId) => async (e) => {
        e.preventDefault()
        setCommentId(commentId)
        setOpenEdit(commentId)
    }

    const handleClose = () => {
        setOpenEdit(0)
    }

    useEffect(() => {
        dispatch(loadCommentsThunk())
    },[dispatch])

    const handleDel = async (e, commentId)=> {
        e.preventDefault()
        await dispatch(deleteCommentsThunk(commentId))
        await dispatch(loadCommentsThunk())
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        const err =[]
        if(comment.length < 1) err.push('Must contain a character')

        setErrors(err) 
        if(err.length) return errors

        const input = {
            comment
        }

        await dispatch(editCommentsThunk(commentId, input))
        setOpenEdit(0)
        await dispatch(loadCommentsThunk())
    }


    return(
        <div>
            {Object.values(comments).filter(comment => comment.post_id === post.post.id).sort().reverse().map(commen => (
                <div className="one-comment-cont" key={commen.id}>
                    <div className="comment-top">
                        <img className="comment-prof" src={commen.user?.profile_img} />
                        {commen.user.username} ·
                        {commen.created_at}
                    </div>
                    { openEdit === commen.id ? 
                    <div className="edit-comm-cont">
                    <textarea className="edit-comment"
                    value={comment}
                    placeholder={commen.comment}
                    onChange={e => setComment(e.target.value)}
                    />
                    <button onClick={handleClose} className='reply-can'>Cancel</button>
                    <button onClick={handleUpdate} className='reply-up'>Update</button>
                    </div>:
                    <div className="comment-content">
                        <div className="comm-comment"> {commen.comment} </div>
                        {user?.id === commen.user.id ? 
                        <div className="comm-loc">
                            <button className="comm-butt">Reply</button>
                            <button className="comm-butt" onClick={handleOpen(commen.id)}>Edit</button>
                            <button className="comm-butt" onClick={(e) => handleDel(e, commen.id)}>Delete</button>
                        </div> :  
                        <div className="comm-loc"><button className="comm-butt">Reply</button> </div> }        
                    </div> 
                    }                  
                </div>
            ))}
        </div>
    )
}