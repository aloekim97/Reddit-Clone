import moment from 'moment'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadCommunityThunk } from "../../store/community"
import './postdiv.css'
export default function PostDiv({post, key}){
    const timeAgo = moment(new Date(post.created_at)).fromNow()
    const comms = useSelector(state => state.community.allCommunities)
    const dispatch = useDispatch()

    
    useEffect(() => {
        dispatch(loadCommunityThunk())
    }, [dispatch])


    return(
        <div className='up-post'>
            <div className='upvotes'></div>  
            <div className="one-post">
                <div className="top-of-post">
                    <img className='post-div-img' src={comms[post.community_id]?.community_img} />
                    <div className='text1'>r/{comms[post.community_id]?.name} ·</div>
                    <div className='text2'>Posted by u/{post.user.username}</div>
                    <div className='text2'>{timeAgo}</div>
                </div>
                <div className='post-title'>{post.title}</div>
            </div>
        </div>
    )
}