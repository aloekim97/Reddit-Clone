import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadPostsThunk } from "../../store/post";
import PostDiv from "./postDiv";

export default function PostPage(){
    const dispatch = useDispatch()
    const posts = useSelector(state => state.post.allPosts)

    useEffect(() => {
        dispatch(loadPostsThunk())
    },[dispatch])

    console.log(posts)
    return(
        <div>
            {Object.values(posts).map(post => (
                <NavLink to={`/post/${post.community_id}/${post.id}`} className='post'>
                    <PostDiv 
                    post = {post}
                    key = {post.id}
                    />
                </NavLink>
            ))}
        </div>
    )
}