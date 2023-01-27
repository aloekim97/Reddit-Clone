import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import PostPage from './components/posts/post';
import SinglePost from './components/posts/singlePost';
import HomePage from './components/home/homePage';
import NewPost from './components/posts/newPost';
import UpdatePost from './components/posts/update';
import AllCommunities from './components/communities/allCommunities';
import CommPage from './components/communities/communityPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const post = useSelector(state => state.post.postDetails)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
        <Route path='/newpost' exact={true} >
          <NewPost />
        </Route>
        <Route path='/communities' exact={true} >
          <AllCommunities />
        </Route>
        <Route path='/communities/:communityId' exact={true} >
          <CommPage />
        </Route>
        <Route path='/post/:communityId/:postId' exact={true} >
          <SinglePost 
          post={post}/>
        </Route>
        <Route path='/post/:communityId/:postId/update' exact={true} >
          <UpdatePost 
          post={post}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
