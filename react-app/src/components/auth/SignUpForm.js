import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profile_img, setProfile_img] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, profile_img));
      if (data) {
        setErrors(data)
      }
    } else if (password !== repeatPassword) {
      let errors = [];
      errors.push("Passwords do not match. Please try again.")
      return setErrors(errors);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='log-page'>
    <div className='log-container'>
      <div className='box-tit'>Sign Up</div>
    <form onSubmit={onSignUp}>
      <ul>
        {errors.map((error, ind) => (
          <li key={ind}>{error}</li>
        ))}
      </ul>
      <div className='emailbox'>
        <input className='email-in'
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          placeholder='User Name'
        ></input>
      </div>
      <div className='emailbox'>
        <input className='email-in'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          placeholder='Email'          
        ></input>
      </div>
      <div className='emailbox'>
        <input className='email-in'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          placeholder='Password'   
        ></input>
      </div>
      <div className='emailbox'>
        <input className='email-in'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          placeholder='Confirm Password'   
        ></input>
      </div>
      <div className='emailbox'>
        <input className='email-in'
          type='text' 
          name='profileImg'
          onChange={e => setProfile_img(e.target.value)}
          value={profile_img}
          required={true}
          placeholder='Profile Picture'   
        ></input>
      </div>
      <button type='submit' className='logsub'>Sign Up</button>
    </form>
    </div>
    </div>
  );
};

export default SignUpForm;
