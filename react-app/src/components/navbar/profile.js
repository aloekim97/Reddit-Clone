import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

export default function ProfileDrop() {
    const [open, setOpen] = React.useState(false);
    const user = useSelector(state => state.session.user)

    const handleOpen = () => {
      if(open) return
      setOpen(!open);
    }
    useEffect(() => {
      if (!open) return;
  
      const closeMenu = () => {
        setOpen(false);
      };
  
      document.addEventListener('click', closeMenu);
  
      return () => document.removeEventListener("click", closeMenu);
    }, [handleOpen]);


    return(
    <div>
      <button onClick={handleOpen} className='profile-butt' type='button'>{<img src={user.profile_img} className='profile-img'></img>}{user.username}</button>
      {open ? <div className="profile-dropdown">
        <NavLink to='/create' className='prof-create-comm-l'>Create Community</NavLink>
        <LogoutButton />
      </div> : null}
    </div>
  );
}