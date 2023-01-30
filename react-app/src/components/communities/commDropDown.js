import React from "react";
import AllCommunities from "./allCommunities";
import { useEffect } from "react";
import './dropdown.css'


function CommDropDown(){
    const [open, setOpen] = React.useState(false);

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
      <button onClick={handleOpen} className='dropdown' type='button'>Home</button>
      {open ? <div>
        <AllCommunities />
      </div> : null}
    </div>
  );
}

export default CommDropDown