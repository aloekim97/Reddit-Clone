import React from "react";
import AllCommunities from "./allCommunities";
import './dropdown.css'


function CommDropDown(){
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }


    return(
    <div>
      <button onClick={handleOpen} className='dropdown' type='button'>Dropdown</button>
      {open ? <div>
        <AllCommunities />
      </div> : null}
    </div>
  );
}

export default CommDropDown