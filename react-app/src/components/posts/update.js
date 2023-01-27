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
        <div className="page-cont">
            <div className="create-t">Update your post</div>
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
                    <div className="butt-loc">
                        <button className="butt" type="submit">Update</button>
                    </div>
                </form>
        </div>
    )
}

