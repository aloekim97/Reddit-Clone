import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadCommunityThunk } from "../../store/community"

export default function AllCommunities(){
    const dispatch = useDispatch()
    const comms = useSelector(state => state.community.allCommunities)
    
    useEffect(() => {
        dispatch(loadCommunityThunk())
    }, [dispatch])
    
    return (
        <div>
            {Object.values(comms).map(comm => (
                <div>{comm.name}</div>
            ))}
        </div>
    )
}