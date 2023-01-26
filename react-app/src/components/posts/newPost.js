import { useDispatch, useSelector } from "react-redux"
import { createPostThunk } from "../../store/post"
import { useState } from "react"
import { Redirect, useHistory } from "react-router-dom"

export default function NewPost() {
    // const comunities = useSelector(state.)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [community_id, setCommunity_id] = useState()
    const dispatch = useDispatch()
    const history = useHistory()
    const handleSubmit = async (e) => {
        e.preventDefault()

        const post = {
            title,
            content,
            community_id
        }
        await dispatch(createPostThunk(post))
        history.push('/')
    }


    return(
        <div className="create-post-box">
            <p>Create a post</p>
            <div className="post-options">
                <button className="post1">Post</button>
                <button className="post2">Images & Videos</button>
                <button className="post2">Link</button>
                <button className="post2">Poll</button>
                <button className="post2">Talk</button>
            </div>
            <form onSubmit={handleSubmit}>
                <input placeholder="community_id" 
                value={community_id}
                required
                onChange={e => setCommunity_id(e.target.value)}
                />
                <input placeholder="title" 
                value={title}
                required
                onChange={e => setTitle(e.target.value)}
                />
                <input placeholder="Text(optional)"
                value={content}
                onChange={e => setContent(e.target.value)}
                />
                <button className="post-butt" type="submit">Post</button>
            </form>
        </div>
    )
}