import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { useNavigate } from "react-router-dom";
import './style.css';

function Auth({t}) {
  const navigate = useNavigate();

  function NavigateTo(){
    navigate("/login");
  }

  const cn = bem('Auth');
  return (
    <div className={cn()}>
      <button onClick={()=>NavigateTo()}>Вход</button>
    </div>
  );
}

Auth.propTypes = {
  t: PropTypes.func
};

Auth.defaultProps = {
  t: (text) => text
}

export default memo(Auth);
