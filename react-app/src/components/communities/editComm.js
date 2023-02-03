import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { createCommunityThunk, deleteCommunityThunk, editCommunityThunk } from '../../store/community'
import { loadOneCommunityThunk } from '../../store/community'
import './editComm.css'


export default function EditComm() {
    const comm = useSelector(state => state.community.oneCommunity[0])
    const [name, setName] = useState('')
    const [community_img, setCommunity_img] = useState('')
    const [background_img, setBackground_img] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    const {communityId} = useParams()

    useEffect( async() => {
        await dispatch(loadOneCommunityThunk(communityId))
    }, [dispatch, communityId])

    useEffect(() => {
        if(comm) {
            // setName(comm.name)
            // setCommunity_img('')
            // setBackground_img('')
            setDescription(comm.description)
        }
    },[comm])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        let err = []
        // if(name.length<2) err.push('Name must be longer than 2 Characters')
        let commImgArr = community_img.split('.')
        if(!commImgArr[0].includes('http')) err.push('Community icon image url must begin with "http://" or "https://')
        if(!(commImgArr[commImgArr.length - 1].includes('jpg') || commImgArr[commImgArr.length - 1].includes('png') || commImgArr[commImgArr.length - 1].includes('jpeg'))) err.push('Community icon image url must end with "jpg", "png", or "jpeg')
        let banneImgArr = background_img.split('.')
        if(!banneImgArr[0].includes('http')) err.push('Banner image url must begin with "http://" or "https://')
        if(!(banneImgArr[banneImgArr.length - 1].includes('jpg') || banneImgArr[banneImgArr.length - 1].includes('png') || banneImgArr[banneImgArr.length - 1].includes('jpeg'))) err.push('Banner image url must end with "jpg", "png", or "jpeg')
        
        setErrors(err)
        
        if(err.length) return errors

        const info = {
            // name,
            community_img,
            background_img,
            description
        }
        await dispatch(editCommunityThunk(info, communityId))
        history.push(`/community/${communityId}`)
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
                    {/* <div className='above-new-n'>New community name</div> */}
                    <ul>
                        {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    {/* <input className='community-n' 
                    value={name}
                    placeholder='r/'
                    onChange={e => setName(e.target.value)}
                    /> */}
                    <div className='above-new-n'>New community icon</div>
                    <input className='community-img-link' 
                    type='url'
                    value={community_img}
                    placeholder='Community Icon'
                    required
                    onChange={e => setCommunity_img(e.target.value)}
                    />
                    <div className='above-new-n'>New community banner</div>
                    <input className='community-back-link' 
                    type='url'
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
                        <button className="butt2" onClick={handleSubmit} type="submit">Edit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}