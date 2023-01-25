const LOAD_POST = '/post/LOAD_POST'
const CREATE_POST = '/post/CREATE_POST'
const EDIT_POST = '/post/EDIT_POST'
const DELETE_POST = '/post/DELETE_POST'


//ACTIONS
export const loadPosts = (posts) => ({
    type: LOAD_POST,
    posts
})

export const createPost = (post) => ({
    type: CREATE_POST,
    post
})

export const editPost = (post) => ({
    type: EDIT_POST,
    post
})

export const deletePost = (post) => ({
    type: DELETE_POST,
    post
})


//THUNKS
export const loadPostsThunk = () => async (dispatch) => {
    res = await fetch('/api/post/')

    if(res.ok){
        const post = await res.json()
        dispatch(loadPosts(post))
        return post
    }
}

export const loadCommunityPostThunk = (communityId) => async (dispatch) => {
    res = await fetch(`/api/post/${communityId}`)
    if (res.ok){
        const post = await res.json()
        dispatch(loadCommunityPostThunk(post))
        return post
    }
}


export const createPostThunk = (communityId, content) => async (dispatch) => {
    res = await fetch(`/api/post/${communityId}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(content)
    })
    if (res.ok){
        const post = await res.json()
        dispatch(createPost(post))
        return post
    }
}

export const editPostThunk = (communityId, postId, content) => async (dispatch) => {
    res = await fetch(`/api/post/${communityId}/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content)
    })
    if (res.ok) {
        const post = await res.json()
        dispatch(editPost(post))
        return post
    }
}

export const deletePostThunk = (communityId, postId) => async (dispatch) => {
    res = await(`/api/post/${communityId}/${postId}`, {
        method: "Delete"
    })
    if (res.ok) {
        const post = await res.json()
        dispatch(deletePostThunk(postId))
        return post
    }
}

const normalizeData = (data) => {
    const obj = {};
    data.forEach(place => obj[place.id] = place)
    return obj
}

const initialState = {
    allPosts: {}
}

//REDUCER
const postReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type) {
        case LOAD_POST: {
            const postArr = action.posts.posts
            const postObj = normalizeData(postArr)
            newState = {...state, allPosts:postObj}
        }
        case CREATE_POST: {
            newState[action.post.id] = action.post
            return newState
        }
        case EDIT_POST: {
            newState = {...state}
            newState[action.post.id] = action.post
            return newState
        }
        case DELETE_POST: {
            newState = {...state}
            delete newState[action.post]
            return newState
        }
    }
}