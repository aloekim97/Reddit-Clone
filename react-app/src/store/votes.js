const LOAD_VOTE = '/votes/LOAD_VOTE'
const ADD_VOTE = '/votes/ADD_VOTE'
const EDIT_VOTE='/votes/EDIT_VOTE'
const POST_VOTE = '/votes/POST_VOTE'
const USER_VOTE = 'votes/USER_VOTE'

//actions 
export const loadVotes = (votes) => ({
    type: LOAD_VOTE,
    votes
})
export const addVotes = (vote) => ({
    type: ADD_VOTE,
    vote
})
export const editVotes = (vote) => ({
    type: EDIT_VOTE,
    vote
})
export const postVote = (postId) => ({
    type: POST_VOTE,
    postId
})
export const userVote = (postId) => ({
    type: USER_VOTE,
    postId
})


//thunks
export const loadVotesThunk = () => async (dispatch) => {
    const res = await fetch('/api/vote/')

    if (res.ok) {
        const votes = await res.json()
        dispatch(loadVotes(votes))
        return votes
    }
}

export const loadPostVoteThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/vote/${postId}`)

    if (res.ok) {
        const vote = await res.json()
        dispatch(postVote(vote))
        return vote
    }
}

export const loadUserVoteThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/vote/user/${postId}`)

    if (res.ok) {
        const vote = await res.json()
        dispatch(userVote(vote))
        return vote
    }
}

export const addVoteThunk = (postId, vote) => async (dispatch) => {
    const res = await fetch(`/api/vote/${postId}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(vote)
    })

    if (res.ok) {
        const vote = await res.json()
        dispatch(addVotes(vote))
        return vote
    }
}
export const editVoteThunk = (postId, input) => async (dispatch) => {
    const res = await fetch(`/api/vote/user/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
    })
    if (res.ok) {
        const vote = await res.json()
        dispatch(editVotes(vote))
        return vote
    }
}


const normalizeData = (data) => {
    const obj = {};
    data.forEach(place => obj[place.id] = place)
    return obj
}

const initalState = {
    allVotes: {},
    // postVotes: {},
    // userVotes: {}
}

//reducer
const votesReducer = (state = initalState, action) => {
    let newState = {...state}
    switch(action.type) {
        case LOAD_VOTE: {
            const voteArr = action.votes.votes
            const voteObj = normalizeData(voteArr)
            newState = {...state, allVotes:voteObj}
            return newState
        }
        // case POST_VOTE: {
        //     const voteArr = action.postId.votes
        //     const voteObj = normalizeData(voteArr)
        //     newState = {...state, postVotes: voteObj}
        //     return newState
        // }
        // case USER_VOTE: {
        //     const voteObj = action.postId.votes
        //     newState = {...state, userVotes: voteObj}
        //     return newState
        // }
        case ADD_VOTE: {
            newState[action.vote.id] = action.vote
            return newState
        }
        case EDIT_VOTE: {
            newState = {...state}
            newState[action.vote] = action.vote
            return newState
        }
    }
    return state
}

export default votesReducer