const LOAD_VOTE = '/votes/LOAD_VOTE'
const ADD_VOTE = '/votes/ADD_VOTE'
const EDIT_VOTE='/votes/EDIT_VOTE'
// const ONE_VOTE = '/votes/ONE_VOTE'

//actions 
export const loadVotes = (votes) => ({
    type: LOAD_VOTE,
    votes
})
export const addVotes = (vote) => ({
    type: ADD_VOTE,
    vote
})
export const editVotes = (votes) => ({
    type: EDIT_VOTE,
    votes
})
// export const oneVote = (vote) => ({
//     type: ONE_VOTE,
//     vote
// })


//thunks
export const loadVotesThunk = () => async (dispatch) => {
    const res = await fetch('/api/vote/')

    if (res.ok) {
        const vote = await res.json()
        dispatch(loadVotes(vote))
        return vote
    }
}
// export const loadOneVoteThunk = (id) => async (dispatch) => {
//     const res = await fetch(`/api/vote/${id}`)

//     if (res.ok) {
//         const vote = await res.json()
//         dispatch(oneVote(vote))
//         return vote
//     }
// }
export const addVoteThunk = (vote) => async (dispatch) => {
    const res = await fetch('/api/vote/', {
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
export const editVoteThunk = (voteId, input) => async (dispatch) => {
    const res = await fetch(`/api/vote/${voteId}`, {
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
    allVotes: {}
}

//reducer
export const votesReducer = (state = initalState, action) => {
    let newState = {...state}
    switch(action.type) {
        case LOAD_VOTE: {
            const voteArr = action.votes.votes
            const voteObj = normalizeData(voteArr)
            newState = {...state, allVotes:voteObj}
            return newState
        }
        // case ONE_VOTE:{
        //     const voteObj = action.vote.vote
        //     newState = {...state, oneVote:voteObj}
        //     return newState
        // }
        case ADD_VOTE: {
            newState[action.vote.id] = action.vote
            return newState
        }
        case EDIT_VOTE: {
            newState = {...state}
            newState[action.vote] = action.votes
            return newState
        }
    }
    return state
}

export default votesReducer