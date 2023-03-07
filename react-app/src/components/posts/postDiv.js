import moment from 'moment'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadCommunityThunk } from '../../store/community'
import { loadPosts, loadPostsThunk } from '../../store/post'
import './postdiv.css'
import Votes from './votes'

export default function PostDiv({post}){
    const timeAgo = moment(new Date(post.created_at)).fromNow()
    const comms = useSelector(state => state.community.allCommunities)

    return(
        <div className='up-post'> 
        <Votes 
        post = {post}
        />
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
