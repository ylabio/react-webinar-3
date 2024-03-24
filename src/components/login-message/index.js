import {memo} from 'react';
import './style.css';
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";


function LoginMessage({text, id, callback, link}) {
  const cn = bem('LoginMessage');

  return (
    <div className={cn()}>
      <p><Link to={link}>Войдите</Link>,<span>{text}</span>{id && <Link onClick={callback}>Отмена</Link>}</p>
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
