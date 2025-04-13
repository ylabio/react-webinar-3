import React from 'react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useCallback } from 'react';
import 'style.css'

const LoginControls = () => {
  const store = useStore();

  const select = useSelector(state => ({
    user: state.user,
    token: state.user.token,
  }));

  const callbacks = {
    logout: useCallback(() => {
      return store.actions.user.logout();
    }, [store]),
  };

  console.log(select.user?.user?.profile?.name);

  return (
    <div className="LoginControls">
      {select.user?.user?.profile?.name && (
        <Link to="/profile" className="LoginControls-name">
          {select.user?.user?.profile?.name}
        </Link>
      )}
      {select.token ? (
        <button className="LoginControls-button" onClick={callbacks.logout}>
          Выход
        </button>
      ) : (
        <Link to={'/login'} className="LoginControls-button">
          Вход
        </Link>
      )}
    </div>
  );
};

export default memo(LoginControls);
