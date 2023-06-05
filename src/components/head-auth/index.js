import { memo } from "react"
import { Link } from "react-router-dom";
import './style.css'


function HeadAuth({isAuth, name, onClickHandler}){

  return (
    <div className="HeadAuthContainer">
      {isAuth && <Link to='/profile'>{name}</Link>}
      <button onClick={onClickHandler}>{isAuth? "Выход": "Вход"}</button>
    </div>
  )
}

export default memo(HeadAuth)