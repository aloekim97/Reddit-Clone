
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createCommunityThunk, loadCommunityThunk } from '../../store/community'
import './createcomm.css'

export default function CreateComm() {
    const [name, setName] = useState('')
    const community_img= 'https://styles.redditmedia.com/t5_5s5qbl/styles/communityIcon_hkq7zlki8ug81.png?width=256&s=08140e851816c4046edb2b019e37010158629537'
    const background_img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlvNXusKSuXe1nuQ8BgbrZsaY-s_IEhF-1wEmtqNBN8A&s'
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    // const comm = useSelector(state => state.community.allCommunities)
    // const commId = Object.values(comm).sort().reverse()[0].id

    const handleSubmit = async (e) => {
        e.preventDefault()
        let err =[]
        if(name.length<2) err.push('Name must be longer than 2 Characters')

        
        setErrors(err)

        
        if(err.length) return errors
        
        const info = {
            name,
            community_img,
            background_img,
            description
        }
        await dispatch(createCommunityThunk(info))
        history.push(`/`)
    }

    return(
        <div className="create-comm-cont">
            <div className='create-comm-box'>
                <div className='box-title'>Create a community</div>
                <div className='namet'>Name</div>
                <div className='namet-desc'>Names cannot be changed later</div>
                <form className='create-comm-form' onSubmit={handleSubmit}>
                    <ul>
                        {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <input className='community-n' 
                    value={name}
                    placeholder='r/'
                    onChange={e => setName(e.target.value)}
                    />
                    {/* <input className='community-img-link'
                    type='hidden' 
                    value={community_img}
                    placeholder='Community Icon'
                    onChange={e => setCommunity_img('https://styles.redditmedia.com/t5_5s5qbl/styles/communityIcon_hkq7zlki8ug81.png?width=256&s=08140e851816c4046edb2b019e37010158629537')}
                    />
                    <input className='community-back-link' 
                    type='hidden'
                    value={background_img}
                    placeholder='Banner'
                    onChange={e => setBackground_img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlvNXusKSuXe1nuQ8BgbrZsaY-s_IEhF-1wEmtqNBN8A&s')}
                    /> */}
                    <input className='community-d' 
                    value={description}
                    placeholder='Description (optional)'
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