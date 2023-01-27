const LOAD_POST = '/post/LOAD_POST'
const CREATE_POST = '/post/CREATE_POST'
const EDIT_POST = '/post/EDIT_POST'
const DELETE_POST = '/post/DELETE_POST'
const POST_DETAIL = '/post/POST_DETAIL'

//ACTIONS
export const loadPosts = (posts) => ({
    type: LOAD_POST,
    posts
})

export const postDetail = (post) => ({
    type: POST_DETAIL,
    post
})

export const createPost = (post) => ({
    type: CREATE_POST,
    post
})

export const editPost = (post) => ({
    type: EDIT_POST,
    post
})

export const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
})


//THUNKS
export const loadPostsThunk = () => async (dispatch) => {
    const res = await fetch('/api/post/')

    if(res.ok){
        const post = await res.json()
        dispatch(loadPosts(post))
        return post
    }
}

// export const loadCommunityPostThunk = (communityId) => async (dispatch) => {
//     const res = await fetch(`/api/post/${communityId}`)
//     if (res.ok){
//         const post = await res.json()
//         dispatch(loadPosts(post))
//         return post
//     }
// }

export const loadOnePostThunk = (communityId, postId) => async (dispatch) => {
    const res = await fetch(`/api/post/${communityId}/${postId}`)
    if (res.ok){
        const post = await res.json()
        dispatch(postDetail(post))
    }
}


export const createPostThunk = (post) => async (dispatch) => {
    const res = await fetch(`/api/post/`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(post)
    })
    if (res.ok){
        const post = await res.json()
        dispatch(createPost(post))
        return post
    }
}

export const editPostThunk = (post, postId) => async (dispatch) => {
    const {title, content} = post
    const res = await fetch(`/api/post/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title,
            content
        })
    })
    if (res.ok) {
        const post = await res.json()
        dispatch(editPost(post))
        return post
    }
}

export const deletePostThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/post/${postId}`, {
        method: "Delete"
    })
    if (res.ok) {
        const post = await res.json()
        dispatch(deletePost(postId))
        return post
    }
}

const normalizeData = (data) => {
    const obj = {};
    data.forEach(place => obj[place.id] = place)
    return obj
}

const initialState = {
    allPosts: {},
    postDetails: {}
}

//REDUCER
const postReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type) {
        case LOAD_POST: {
            const postArr = action.posts.posts
            const postObj = normalizeData(postArr)
            newState = {...state, allPosts:postObj}
            return newState
        }
        case POST_DETAIL: {
            const postObj = action.post.posts
            // const postObj = normalizeData(postArr)
            newState = {...state, postDetails: postObj}
            return newState
        }
        case CREATE_POST: {
            newState[action.post.id] = action.post  
            return newState
        }
        case EDIT_POST: {
            newState = {...state}
            newState[action.postDetails] = action.post
            return newState
        }
        case DELETE_POST: {
            delete newState[action.postId]
            return newState
        }
    }
    return state
}

export default postReducer