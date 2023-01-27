import moment from 'moment'
import './postdiv.css'
export default function PostDiv({post, key}){
    const timeAgo = moment(new Date(post.created_at)).fromNow()
    return(
        <div className='up-post'>
            <div className='upvotes'></div>  
            <div className="one-post">
                <div className="top-of-post">
                    <div className='text1'>{post.community_id}</div>
                    <div className='text2'>Posted by u/{post.user.username}</div>
                    <div className='text2'>{timeAgo}</div>
                </div>
                <div className='post-title'>{post.title}</div>
            </div>
        </div>
    )
}