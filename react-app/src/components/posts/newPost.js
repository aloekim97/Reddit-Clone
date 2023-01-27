import { useDispatch, useSelector } from "react-redux"
import { createPostThunk } from "../../store/post"
import { useState } from "react"
import { Redirect, useHistory } from "react-router-dom"
import './newpost.css'

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
        <div className="page-cont">
                <div className="create-t">Create a post</div>
                <form onSubmit={handleSubmit} className="commmmm">
                    <input className="input-comm"
                    placeholder="community_id" 
                    value={community_id}
                    required
                    onChange={e => setCommunity_id(e.target.value)}/>
                </form>
            <div className="create-post-box">
                    <div className="post-options">
                        <button className="post1" type="button">Post</button>
                        <button className="post2" type="button">Images & Videos</button>
                        <button className="post2" type="button">Link</button>
                        <button className="post2" type="button">Poll</button>
                        <button className="post2" type="button">Talk</button>
                    </div>
                    <form onSubmit={handleSubmit} className="make-edit">
                        <input className="input-title"
                        placeholder="title" 
                        value={title}
                        required
                        onChange={e => setTitle(e.target.value)}
                        />
                        <input className="input-content"
                        placeholder="Text(optional)"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                    <div className="post-butt-loc">
                        <button className="post-butt" type="submit">Post</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}