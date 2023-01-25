import { useDispatch, useSelector } from "react-redux";


export default function PostPage(){
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts.posts)
    console.log(posts)

    return(
        <p>dasf</p>
    )
}