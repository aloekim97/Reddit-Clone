const LOAD_COMMENTS = '/comments/LOAD_COMMENTS'
const CREATE_COMMENT = '/comments/CREATE_COMMENT'
const EDIT_COMMENT = '/comments/EDIT_COMMENT'
const DELETE_COMMENT = '/comments/DELETE_COMMENT'

//actions
export const loadComments = (comments) => ({
    type: LOAD_COMMENTS,
    comments
})

export const createComments = (comments) => ({
    type: CREATE_COMMENT,
    comments
})

export const editComments = (comments) => ({
    type: CREATE_COMMENT,
    comments
})

export const deleteComments = (comments) => ({
    type: DELETE_COMMENT,
    comments
})

// thunks
export const loadCommentsThunk = () => async (dispatch) => {
    const res = await fetch('/api/comment/')

    if (res.ok) {
        const comments = await res.json()
        dispatch(loadComments(comments))
        return comments
    }
}
export const createCommentsThunk = (content) => async (dispatch) => {
    const res = await fetch('/api/comment/', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(content)
    })
    if (res.ok) {
        const comment = await res.json()
        dispatch(createComments(comment))
        return comment
    }
}
export const editCommentsThunk = (commentId, edits) => async (dispatch) => {
    const res = await fetch(`/api/comment/${commentId}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(edits)
    })
    if (res.ok) {
        const comment = await res.json()
        dispatch(editComments(comment))
        return comment
    }
}
export const deleteCommentsThunk = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comment/${commentId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const comment = await res.json()
        dispatch(deleteComments(commentId))
        return comment
    }
}

const normalizeData = (data) => {
    const obj = {};
    data.forEach(place => obj[place.id] = place)
    return obj
}

//reducer
const initialState = {
    allComments: {},
}

export const commentReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type) {
        case LOAD_COMMENTS: {
            const commArr = action.comments.comments
            const commObj = normalizeData(commArr)
            newState = {...state, allComments:commObj}
            return newState
        }
        case CREATE_COMMENT: {
            newState[action.comment] = action.comments
            return newState
        }
        case EDIT_COMMENT: {
            newState = {...state}
            newState[action.comment.id] = action.comments
        }
        case DELETE_COMMENT: {
            delete newState[action.commentId]
            return newState
        }
    }
    return state
}

export default commentReducer