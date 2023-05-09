import { useEffect, useState } from "react"
import { useDispatch, useSelector  } from "react-redux"
import { addVoteThunk, editVoteThunk, loadPostVoteThunk, loadUserVoteThunk, loadVotesThunk } from "../../store/votes"
import { loadPostsThunk } from "../../store/post"
import { loadCommunityThunk } from "../../store/community"

export default function Votes(post) {
    const dispatch = useDispatch()
    const postId = post.post.id
    const allVotes = useSelector(state => state.vote.allVotes)
    const user = useSelector(state => state.session.user?.id)
    const totVote = Object.values(post.post.votes).map(pst => pst.vote).reduce((a, b) => a + b, 0)
    const userVotes = Object.values(allVotes).filter(v => v.user === user)
    const postVotes = Object.values(userVotes).filter(v => v.post_id === postId)
    const userVote = postVotes[0]?.vote
    // const [total, setTotal] = useState(totVote)
    

    const upClick = async (e) => {
        e.preventDefault()
        const post_id = postId
        const vote = {
            post_id,
            vote: 1
        }
        await dispatch(addVoteThunk(postId, vote))
        await dispatch(loadVotesThunk())
        //dispatch(getpostthunk)
    }

    const downClick = async (e) => {
        e.preventDefault()
        const post_id = postId
        const vote = {
            post_id,
            vote: -1,
        }
        await dispatch(addVoteThunk(postId, vote))
        await dispatch(loadVotesThunk())
    }
    
    const editDown = async (e) => {
        e.preventDefault()
        const post_id = postId
        
        const input = {
            vote: -1,
            post_id
        }
        await dispatch(editVoteThunk(postId, input))
        await dispatch(loadVotesThunk())
    }

    const editUp = async (e) => {
        e.preventDefault()
        const post_id = postId
        
        const input = {
            vote: 1,
            post_id
        }   
        await dispatch(editVoteThunk(postId, input))
        await dispatch(loadVotesThunk())
    }

    const zero = async (e) => {
        e.preventDefault()
        const post_id = postId
        
        const input = {
            vote: 0,
            post_id
        }    
        await dispatch(editVoteThunk(postId, input))
        await dispatch(loadVotesThunk())
    }

    const theback = async (e) => {
        e.preventDefault()
    }


    return(
        <div className="upholder" onClick={theback}>
            {userVote === 1 ?
                <div className='upvotes'>
                    <div style={{color: "orange"}} onClick={zero}><i class="fa-solid fa-up-long" ></i></div>
                    <div className='votenum'>{totVote}</div>
                    <div style={{color: "white"}} onClick={editDown}><i class="fa-solid fa-down-long" ></i></div> 
                </div> : 
                userVote === -1 ?
                    <div className='upvotes'>
                    <div style={{color: "white"}} onClick={editUp}><i class="fa-solid fa-up-long" ></i></div>
                    <div className='votenum'>{totVote}</div>
                    <div style={{color: "blue"}} onClick={zero}><i class="fa-solid fa-down-long" ></i></div> 
                </div> : 
                userVote === 0 ?
                    <div className='upvotes'>
                    <div style={{color: "white"}} onClick={editUp}><i class="fa-solid fa-up-long"></i></div>
                    <div className='votenum'>{totVote}</div>
                    <div style={{color: "white"}} onClick={editDown}><i class="fa-solid fa-down-long" ></i></div> 
                </div> :
                    <div className='upvotes'>
                    <div style={{color: "white"}} onClick={upClick}><i class="fa-solid fa-up-long" ></i></div>
                    <div className='votenum'>{totVote}</div>
                    <div style={{color: "white"}} onClick={downClick}><i class="fa-solid fa-down-long"></i></div> 
                </div>}
        </div>
    )
}
