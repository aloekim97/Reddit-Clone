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
    res = await fetch('/api/post')

    if(res.ok){
        const post = await res.json()
        dispatch(loadPosts(post))
        return post
    }
}

export const loadCommunityPostThunk = (communityId) => async (dispatch) => {
    res = await fetch(`/api/post/${communityId}`)
    if (res.ok){
        const content = await res.json()
        dispatch(loadCommunityPostThunk(content))
        return content
    }
}


export const createPostThunk = (communityId, content) => async (dispatch) => {
    res = await fetch(`/api/post/${communityId}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(content)
    })
    if (res.ok){
        const content = await res.json()
        dispatch(createPost(content))
        return content
    }
}

export const editPostThunk = (communityId, postId, content) => async (dispatch) => {
    res = await fetch(`/api/post/${communityId}/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content)
    })
    if (res.ok) {
        const content = await res.json()
        dispatch(editPost(content))
        return content
    }
}

// export const deletePostThunk = () => async (dispatch) => {
//     res = await
// }