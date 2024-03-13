import {memo} from "react";
import './style.css';

function Nav({children}) {
  return (
    <div className="Nav">
      {children}
    </div>
  )
}

export default memo(Nav);