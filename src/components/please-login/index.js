import { memo } from "react";
import { Link } from "react-router-dom";
import './style.css'
function PLeseLogin({text}){
    return(
        <div className="PleaseLogin">
        <Link to={'/login'}>Войдите,<span>{text}</span></Link>
        </div>
    )
}

export default memo(PLeseLogin)