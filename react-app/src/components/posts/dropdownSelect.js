// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loadCommunityThunk } from "../../store/community";
// import { useState} from "react"

// const Dropdown = ({ placeHolder, options }) => {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null)

//     const handleOpen = () => {
//       setOpen(!open);
//     };
//     useEffect(() => {
//         if (!open) return;
    
//         const closeMenu = () => {
//           setOpen(false);
//         };
    
//         window.addEventListener('click', closeMenu);
    
//         return () => window.removeEventListener("click", closeMenu);
//       }, [handleOpen]);

  
//   const getDisplay = () => {
//     if (value) {
//       return value.name
//     }
//     return placeHolder
//   };

//   const onItemClick = (option) => {
//     setValue(option)
//   }
//   const isSel = (option) => {
//     if(!value) {
//       return false
//     }
//     return value.value === option.value
//   }

//   return (
//     <div className="sel-comm">
//       <div className="comm-drop" onClick={handleOpen}>
//        {open ? 
//        <div className="drop-box">
//         {Object.values(options).map((option) => (
//           <div key={option.id} className='options' onClick={onItemClick(option)}>
//             {option.name}
//           </div>
//         ))}
//        </div> : null }
       
//       </div>
//     </div>
//   );
// };
  
//     return (
//       <div className="dropdown-container">
//         <div className="dropdown-input">
//           {Object.values(comms).map(comm => {
//             <div key={comm.id}>
//                 {comm.name}
//             </div>
//           })}
//         </div>
//       </div>
//     );
//   };

  export default Dropdown