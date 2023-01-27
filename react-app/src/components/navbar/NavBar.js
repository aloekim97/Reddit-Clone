
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './navbar.css'

const NavBar = () => {
  return (
    <nav className='navbar'>
          <NavLink to='/' exact={true} className='reelit'>
            Reelit
          </NavLink>
          <div className='right-navbar'>
            <button className='login'>
              <NavLink to='/login' exact={true} className='login-link'>
                Login
              </NavLink>
            </button>
            
          <button className='profile-butt'>profile</button>
          </div>
          
    </nav>
  );
}

export default NavBar;
