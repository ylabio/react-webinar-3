import {memo, useCallback} from 'react';
import './style.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";


function LoginMessage({text, id, callback, link}) {
  const cn = bem('LoginMessage');

  const navigate = useNavigate();
  const location = useLocation();

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate(link, {state: {back: location.pathname}});
    }, [location.pathname, link, navigate]),

  }


  return (
    <div className={cn()}>
      <p><span onClick={callbacks.onSignIn}>Войдите</span>,<span style={{color:'black', textDecoration:'none' }}>{text}</span>
        {
          id && <span  onClick={callback}>Отмена</span>}</p>
    </div>
  )
}

LoginMessage.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string,
  callback: PropTypes.func,
  link: PropTypes.string
};


export default memo(LoginMessage);
