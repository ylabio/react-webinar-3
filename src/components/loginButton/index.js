import {memo, useCallback} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { Link } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import { useNavigate } from "react-router-dom";

function LoginButton() {
	const store = useStore();

  const navigate = useNavigate();

  const select = useSelector((state) => ({
    user: state.user.user,
  }));

  const callbacks = {
		logOut: useCallback(() => {
      store.actions.user.logOut(), [store]
      localStorage.removeItem('token');
    }),
	};

  const onLogOut = () => {
    callbacks.logOut();
    navigate('/');
  }
  
  return (
    <div className="LoginButton-wrapper">
      <div  className="LoginButton-user">{!!select.user  && <Link to='/user'>{select.user?.profile?.name}</Link>}</div>
      {
        !!select.user 
        ? 
        <button className="LoginButton-button" onClick={onLogOut}>Выход</button>
        : 
        <button className="LoginButton-button"> <Link to='/login'>Вход</Link></button>
      }
    </div>
  );
}

export default memo(LoginButton);
