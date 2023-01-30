
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './navbar.css'
import CommDropDown from '../communities/commDropDown'
import { useSelector } from 'react-redux';
import ProfileDrop from './profile';

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <nav className='navbar'>
      <div className='left-navbar'>
        <NavLink to='/' exact={true} className='reelit'>
          Reelit
        </NavLink>
        <CommDropDown />
      </div>
      <div className='right-navbar'>
        {!user ? <button className='login'>
            <NavLink to='/login' exact={true} className='login-link'>
              Login
            </NavLink> 
          </button> : <ProfileDrop />
        }
      </div>
          
    </nav>
  );
}

export default NavBar;
