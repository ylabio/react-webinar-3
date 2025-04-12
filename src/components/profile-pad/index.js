import React, {memo, useCallback} from 'react';
import Button from "../button";
import SideLayout from "../side-layout";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {Link, useNavigate} from "react-router-dom";

const ProfilePad = () => {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isAuth: state.user.isAuth,
    userName: state.user.profile.name,
  }));

  const callbacks = {
    goToLogin: useCallback(() => {
      navigate('/login');
    }, []),
    logout: useCallback(() => {
      store.actions.user.logout();
      navigate('/');
    }, [store]),
  };

  return (
    <SideLayout>
      <>{select.isAuth &&
        <Link to="/profile">{select.userName || 'Профиль'}</Link>
      }</>
      <>{select.isAuth
        ? <Button style="text" onClick={callbacks.logout} title={'Выход'} />
        : <Button style="text" onClick={callbacks.goToLogin} title={'Вход'} />
      }</>
    </SideLayout>
  );
};

export default memo(ProfilePad);
