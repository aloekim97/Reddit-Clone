import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadCommunityThunk } from "../../store/community"
import { NavLink } from 'react-router-dom'

export default function AllCommunities(){
    const dispatch = useDispatch()
    const comms = useSelector(state => state.community.allCommunities)
    
    useEffect(() => {
        dispatch(loadCommunityThunk())
    }, [dispatch])

    console.log(comms)
    
    return (
        <div className="comm-cont">
            <p>All communities</p>
            {Object.values(comms).map(comm => (
                    <NavLink className='comm-names' to={`/community/${comm.id}`}>
                        <img src={comm.community_img} className='comm-img'></img>
                        {comm.name}
                    </NavLink>
            ))}
        </div>
    )
}