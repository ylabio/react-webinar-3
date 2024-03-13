import {memo} from "react";
import './style.css';

function MenuNav({link}) {
  return (
    <div className='MenuNav'>
      {link}
    </div>
  )
}

export default memo(MenuNav);
