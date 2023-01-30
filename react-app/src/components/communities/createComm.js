
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
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let err =[]
        if(name.length<2) err.push('Name must be longer than 2 Characters')
        if(community_img.length<2 || community_img.length > 2000) err.push('Community icon must be a valid url')
        if(background_img.length<2 || background_img.length > 2000) err.push('Banner must be a valid url')
        
        setErrors(err)
        
        if(err.length) return errors

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
                    <ul>
                        {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
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