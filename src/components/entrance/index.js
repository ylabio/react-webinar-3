import {memo} from "react";
import {Link} from "react-router-dom";
import './style.css';

function Entrance() {
   
    return (
      <div className="container-ent">
     <Link to={'/login'} className="btn">Вход</Link>
      </div>
    )
  }
  export default memo(Entrance);