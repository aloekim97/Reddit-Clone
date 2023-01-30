
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createCommunityThunk } from '../../store/community'
import './createcomm.css'

export default function CreateComm() {
    const [name, setName] = useState('')
    const [community_img, setCommunity_img] = useState('')
    const [background_img, setBackground_img] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

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

    return(
        <div className="create-comm-cont">
            <div className='create-comm-box'>
                <div className='box-title'>Create a community</div>
                <div className='namet'>Name</div>
                <div className='namet-desc'>Names can be changed later</div>
                <form className='create-comm-form' onSubmit={handleSubmit}>
                    <input className='community-n' 
                    value={name}
                    required
                    placeholder='r/'
                    onChange={e => setName(e.target.value)}
                    />
                    <input className='community-img-link' 
                    value={community_img}
                    placeholder='Community Icon'
                    required
                    onChange={e => setCommunity_img(e.target.value)}
                    />
                    <input className='community-back-link' 
                    value={background_img}
                    placeholder='Banner'
                    required
                    onChange={e => setBackground_img(e.target.value)}
                    />
                    <input className='community-d' 
                    value={description}
                    placeholder='Description'
                    onChange={e => setDescription(e.target.value)}
                    />
                    <div className="butt-loc2">
                        <button className="butt" type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}