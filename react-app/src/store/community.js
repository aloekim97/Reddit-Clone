const LOAD_COMMUNITY = '/community/LOAD_COMMUNITY'
const LOAD_ONE_COMMUNITY = '/community/LOAD_ONE_COMMUNITY'
const CREATE_COMMUNITY = '/community/CREATE_COMMUNITY'
const EDIT_COMMUNITY = '/community/EDIT_COMMUNITY'
const DELETE_COMMUNITY = '/community/DELETE_COMMUNITY'

//actions
export const loadCommunity = (communities) => ({
    type: LOAD_COMMUNITY,
    communities
})
export const loadOneCommunity = (communityId) => ({
    type: LOAD_ONE_COMMUNITY,
    communityId
})
export const createCommunity = (community) => ({
    type: CREATE_COMMUNITY,
    community
})
export const editCommunity = (community) => ({
    type: EDIT_COMMUNITY,
    community
})
export const deleteCommunity = (communityId) => ({
    type: DELETE_COMMUNITY,
    communityId
})

//thunks
export const loadCommunityThunk = () => async (dispatch) => {
    const res = await fetch(`/api/community/`)

    if (res.ok) {
        const communities = await res.json()
        dispatch(loadCommunity(communities))
        return communities
    }
}
export const loadOneCommunityThunk = (communityId) => async (dispatch) => {
    const res = await fetch(`/api/community/${communityId}`)

    if (res.ok) {
        const community = await res.json()
        dispatch(loadOneCommunity(community))
        return community
    }
}
export const createCommunityThunk = (content) => async (dispatch) => {
    const res = await fetch('/api/community/', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(content)
    })
    if (res.ok) {
        const community = await res.json()
        dispatch(createCommunity(community))
        return community
    }
}
export const editCommunityThunk = (edits, communityId) => async (dispatch) => {
    const res = await fetch(`/api/community/${communityId}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(edits)
    })
    if (res.ok){
        const community = await res.json()
        dispatch(editCommunity(community))
        return community
    }
}

export const deleteCommunityThunk = (communityId) => async (dispatch) => {
    const res = await fetch(`/api/community/${communityId}`, {
        method: "DELETE"
    })
    if (res.ok){
        const comm = await res.json()
        dispatch(deleteCommunity(communityId))
        return comm
    }
}


const normalizeData = (data) => {
    const obj = {};
    data.forEach(place => obj[place.id] = place)
    return obj
}

const initialState = {
    allCommunities: {},
    oneCommunity: {}
}


//reducers
const communityReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type) {
        case LOAD_COMMUNITY: {
            const commsArr = action.communities.communities
            const commObj = normalizeData(commsArr)
            newState = {...state, allCommunities:commObj}
            return newState
        }
        case LOAD_ONE_COMMUNITY: {
            const commsArr = action.communityId.communities
            newState = {...state, oneCommunity: commsArr}
            return newState
        }
        case CREATE_COMMUNITY: {
            newState[action.community.id] = action.community
            return newState
        }
        case EDIT_COMMUNITY: {
            newState = {...state}
            newState[action.oneCommunity] = action.community
            return newState
        }
        case DELETE_COMMUNITY: {
            delete newState[action.communityId]
            return newState
        }
    }
    return state
}
export default communityReducer