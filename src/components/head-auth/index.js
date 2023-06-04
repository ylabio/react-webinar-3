import { memo } from "react"
import { Link } from "react-router-dom";
import './style.css'
import useAuthInfo from "../../hooks/use-auth-info";

function HeadAuth(){

  const {isAuth, name, onClickHandler} = useAuthInfo();

  return (
    <div className="HeadAuthContainer">
      {isAuth && <Link to='/profile'>{name}</Link>}
      <button onClick={onClickHandler}>{isAuth? "Выход": "Вход"}</button>
    </div>
  )
}

export default memo(HeadAuth)