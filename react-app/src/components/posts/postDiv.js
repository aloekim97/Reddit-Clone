import moment from 'moment'
export default function PostDiv({post, key}){
    const timeAgo = moment(new Date(post.created_at)).fromNow()
    return(
        <div className="post-container">
            <div className="top-of-post">
                <div>{post.community_id}</div>
                <div>Posted by u/{post.user.username}</div>
                <div>{timeAgo}</div>
            </div>
            <div className='post-title'>{post.title}</div>
        </div>
    )
}