import { useDispatch, useSelector } from "react-redux"
import { createPostThunk, editPostThunk } from "../../store/post"
import { useState } from "react"
import { Redirect, useHistory, useParams } from "react-router-dom"

export default function UpdatePost(){
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const {postId, communityId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const post = useSelector(state => state.post.postDetails)
    console.log(post)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const post = {
            title,
            content,
        }
        await dispatch(editPostThunk(post, postId))
        history.push(`/post/${communityId}/${postId}`)
    }


    return(
        <div className="create-post-box">
            <p>Update your post</p>
            <form onSubmit={handleSubmit}>
                <input placeholder="title" className="input-title"
                value={title}
                required
                onChange={e => setTitle(e.target.value)}
                />
                <input placeholder="Text(optional)" className="input-content"
                value={content}
                onChange={e => setContent(e.target.value)}
                />
                <button className="post-butt" type="submit">Update</button>
            </form>
        </div>
    )
}