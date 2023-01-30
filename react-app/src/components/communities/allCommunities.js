import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadCommunityThunk } from "../../store/community"
import { NavLink } from 'react-router-dom'

export default function AllCommunities(){
    const dispatch = useDispatch()
    const comms = useSelector(state => state.community.allCommunities)
    const user = useSelector(state => state.session.user)
    
    
    useEffect(() => {
        dispatch(loadCommunityThunk())
    }, [dispatch])
    
    return (
        <div className="comm-cont">
            <div className="dropdown2">Home</div>
            <div className="dtext">All communities</div>
            {user ? <NavLink to='/create' className='create-comm-l'>Create Community</NavLink> 
            : <div className='comm-l'>Communities you may like</div>}
            {Object.values(comms).map(comm => (
                    <NavLink className='comm-names' to={`/community/${comm.id}`}>
                        <img src={comm.community_img} className='comm-img'></img>
                        {comm.name}
                    </NavLink>
            ))}
        </div>
    )
}