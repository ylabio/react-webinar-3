import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { NavLink, useNavigate } from "react-router-dom";
import './style.css';

function Auth({t,userName}) {
  const navigate = useNavigate();

  function NavigateTo(){
    navigate("/login");
  }

  const cn = bem('Auth');
  return (
    <div className={cn()}>
      {userName&& <NavLink to={'profile/'}>{userName}</NavLink>}
      <button onClick={()=>NavigateTo()}>Вход</button>
    </div>
  );
}

Auth.propTypes = {
  t: PropTypes.func,
  userName:PropTypes.string
};

Auth.defaultProps = {
  t: (text) => text
}

export default memo(Auth);
