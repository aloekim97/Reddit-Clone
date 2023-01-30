import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { createCommunityThunk, deleteCommunityThunk } from '../../store/community'
import { loadOneCommunityThunk } from '../../store/community'
import './editComm.css'


export default function EditComm() {
    const comm = useSelector(state => state.community.oneCommunity)
    const [name, setName] = useState('')
    const [community_img, setCommunity_img] = useState('')
    const [background_img, setBackground_img] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const {communityId} = useParams()

    useEffect( async() => {
        await dispatch(loadOneCommunityThunk(communityId))
    }, [dispatch, communityId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const info = {
            name,
            community_img,
            background_img,
            description
        }
        await dispatch(createCommunityThunk(info))
        history.push('/')
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteCommunityThunk(communityId))
        history.push('/')
    }

    return(
        <div className="create-comm-cont">
            <div className='edit-comm-box'>
                <div className='box-title'>Edit your community</div>
                <form className='create-comm-form' onSubmit={handleSubmit}>
                    <div className='above-new-n'>New community name</div>
                    <input className='community-n' 
                    value={name}
                    required
                    placeholder='r/'
                    onChange={e => setName(e.target.value)}
                    />
                    <div className='above-new-n'>New community icon</div>
                    <input className='community-img-link' 
                    value={community_img}
                    placeholder='Community Icon'
                    required
                    onChange={e => setCommunity_img(e.target.value)}
                    />
                    <div className='above-new-n'>New community banner</div>
                    <input className='community-back-link' 
                    value={background_img}
                    placeholder='Banner'
                    required
                    onChange={e => setBackground_img(e.target.value)}
                    />
                    <div className='above-new-n'>New community description</div>
                    <input className='community-d' 
                    value={description}
                    placeholder='Description'
                    onChange={e => setDescription(e.target.value)}
                    />
                    <div className="butt-loc2">
                        <button className='butt' onClick={handleDelete}>Delete</button>
                        <button className="butt2" type="submit">Edit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}