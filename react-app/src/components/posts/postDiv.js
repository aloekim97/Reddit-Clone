import moment from 'moment'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadCommunityThunk } from "../../store/community"
import { loadPostsThunk } from '../../store/post'
import { addVoteThunk, editVoteThunk, loadVotesThunk } from '../../store/votes'
import './postdiv.css'
export default function PostDiv({post, key}){
    const timeAgo = moment(new Date(post.created_at)).fromNow()
    const comms = useSelector(state => state.community.allCommunities)
    const dispatch = useDispatch()
    const allVotes = useSelector(state => state.vote.allVotes)
    const totVote = Object.values(post.votes).map(pst => pst.vote).reduce((a, b) => a + b, 0)
    const user = useSelector(state => state.session.user.id)
    const userVote = Object.values(allVotes).filter(userV => userV.user === user)
    const voteNum = userVote[userVote.length - 1]?.vote
    const voteId = userVote[userVote.length -1]?.id
    const [total, setTotal] = useState(totVote)
    console.log('USER VOTE', userVote)
    console.log('ALL VOTE', allVotes)
    console.log('VOTE NUM', voteNum)
    console.log('VOTE ID', voteId)

    let userVotePost = {};
    
    useEffect(() => {
        dispatch(loadCommunityThunk())
        dispatch(loadVotesThunk())
    }, [dispatch])
    if (userVote.length > 0) {
        for (let i = 0; i < userVote.length - 1; i++) {
            if (userVote[i].post_id === post.id) {
                userVotePost = userVote[i]
            }
        }
    }
    console.log('USER VOTE POST', userVotePost)
    
    const upClick = async (e) => {
        e.preventDefault()
        const post_id = post.id
        const vote = {
            post_id,
            vote: 1,
        }
        await dispatch(addVoteThunk(vote))
        setTotal(totVote)
    }

    const downClick = async (e) => {
        e.preventDefault()
        const post_id = post.id
        const vote = {
            post_id,
            vote: -1,
        }
        await dispatch(addVoteThunk(vote))
    }

    const zero = async (e) => {
        e.preventDefault()
        const post_id = post.id
        
        const input = {
            vote: 0,
            post_id
        }    
        await dispatch(editVoteThunk(voteId, input))
        await setTotal(totVote)
    }
    const editUp = async (e) => {
        e.preventDefault()
        const post_id = post.id
        
        const input = {
            vote: 1,
            post_id
        }   
        await dispatch(editVoteThunk(voteId, input))
    }
    const editDown = async (e) => {
        e.preventDefault()
        const post_id = post.id
        
        const input = {
            vote: -1,
            post_id
        }
        await dispatch(editVoteThunk(voteId, input))
    }

    // const onSubmit = async (e) => {
    //     e.preventDefault()

    // }

    return(
        <div className='up-post'>
                {voteNum === 1 ?
                <div className='upvotes'>
                    <div style={{color: "orange"}}><i class="fa-solid fa-up-long" onClick={zero}></i></div>
                    <div className='votenum'>{total}</div>
                    <div style={{color: "white"}}><i class="fa-solid fa-down-long" onClick={e => editDown(e, post.id)}></i></div> 
                </div> : 
                voteNum === -1 ?
                    <div className='upvotes'>
                    <div style={{color: "white"}}><i class="fa-solid fa-up-long" onClick={e => editUp(e, post.id)}></i></div>
                    <div className='votenum'>{totVote}</div>
                    <div style={{color: "blue"}}><i class="fa-solid fa-down-long" onClick={zero}></i></div> 
                </div> : 
                voteNum === 0 ?
                    <div className='upvotes'>
                    <div style={{color: "white"}}><i class="fa-solid fa-up-long" onClick={e => editUp(e, post.id)}></i></div>
                    <div className='votenum'>{totVote}</div>
                    <div style={{color: "blue"}}><i class="fa-solid fa-down-long" onClick={zero}></i></div> 
                </div> :
                    <div className='upvotes'>
                    <div style={{color: "white"}}><i class="fa-solid fa-up-long" onClick={e => upClick(e, post.id)}></i></div>
                    <div className='votenum'>{totVote}</div>
                    <div style={{color: "white"}}><i class="fa-solid fa-down-long" onClick={e => downClick(e, post.id)}></i></div> 
                </div>}
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