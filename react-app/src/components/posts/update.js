import { useDispatch, useSelector } from "react-redux"
import { createPostThunk, editPostThunk, loadOnePostThunk } from "../../store/post"
import { useEffect, useState } from "react"
import { Redirect, useHistory, useParams } from "react-router-dom"
import { loadCommunityThunk } from "../../store/community"

export default function UpdatePost(){
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const {postId, communityId} = useParams()
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    const post = useSelector(state => state.post.postDetails)
    
    useEffect( async () => {
        await dispatch(loadOnePostThunk(communityId, postId))
    },[dispatch])
    
    useEffect(() => {
        if(post){
            setTitle(post.title)
            setContent(post.content)
        }
    },post)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const err = []
        if(title?.length < 1) err.push('A title is needed')
        setErrors(err)
        if(err.length) return errors

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
                    <ul>
                        {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                        <input className="input-title"
                        placeholder="title" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        />
                        <textarea className="input-content"
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

