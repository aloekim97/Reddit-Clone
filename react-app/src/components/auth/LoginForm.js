import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { AutoLogin } from './DemoU';
import './login.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();

    let err= [];

    if(!email || email.length < 1 || !password || password.length < 1) err.push('Credentials invalid')


    setErrors(err)
    if(err.length) return errors

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='log-page'>
    <div className='log-container'>
      <div className='box-tit'>Log In</div>
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='emailbox'>
          <label htmlFor='email'></label>
          <input className='email-in'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className='passbox'>
          <label htmlFor='password'></label>
          <input className='password-in'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
          <button type='submit' className='logsub'>Login</button>
      </form>
      <div className='sup'>New to Reelit? <NavLink to={'/sign-up'}>Sign Up</NavLink></div>
      <div>
        Dont feel like signing up? Try <AutoLogin />
      </div>
    </div>
    </div>
  );
};

export default LoginForm;
