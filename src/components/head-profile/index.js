import { memo } from "react";
import { Link } from "react-router-dom";
import './style.css';

function HeadProfile({children, title, onClick}) {
  return (
    <div className='HeadProfile'>
      {children}
      <button onClick={onClick}>{title}</button>
    </div>
  )
}

export default memo(HeadProfile);
