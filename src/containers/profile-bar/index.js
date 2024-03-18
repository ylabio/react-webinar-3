import { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate, Link } from "react-router-dom";
import './style.css';

function ProfileBar() {
  const navigate = useNavigate();
  const store = useStore();
  const select = useSelector(state => ({
    user: state.user?.user,
  }));

  const callbacks = {
    onLoginClick: useCallback((e) => {
      e.preventDefault();
      navigate("/login");
    }, [navigate]),

    onLogoutClick: useCallback((e) => {
      e.preventDefault();
      store.actions.user.logout();
    }, [store]),
  };
  
  const userName = useMemo(() => {
    return select.user?.username;
  }, [select.user?.username])

  const renderButton = useCallback(() => {
    return (<button className="ProfileBar-button" onClick={select.user === null ? callbacks.onLoginClick : callbacks.onLogoutClick}>{select.user ? "Выход" : "Вход"}</button>);
  }, [select.user, callbacks.onLoginClick, callbacks.onLogoutClick]);


  return (
    <div className="ProfileBar">
      {userName && <Link to="/profile" className="ProfileBar-username">{userName}</Link>}
      {renderButton()}
    </div>
  )
}

export default memo(ProfileBar);
