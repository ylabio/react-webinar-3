import { memo } from "react";
import { Link } from "react-router-dom";
import "./style.css";


function Navbar({language}) {

  return (
    <div className="Navbar">
      <Link to="/" className="Navbar-mainLink">
        {language?.mainPage}
      </Link>
    </div>
  );
}


export default memo(Navbar);