import React, {memo, useCallback} from 'react';
import Button from "../../components/button";
import SideLayout from "../../components/side-layout";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {Link, useNavigate} from "react-router-dom";

const ProfilePad = () => {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    token: state.session.token,
    userName: state.session.profile.name,
  }));

  const callbacks = {
    goToLogin: useCallback(() => {
      navigate('/login');
    }, []),
    logout: useCallback(() => {
      store.actions.session.logout();
      navigate('/');
    }, [store]),
  };

  return (
    <SideLayout>
      <>{select.token &&
        <Link to="/profile">{select.userName || 'Профиль'}</Link>
      }</>
      <>{select.token
        ? <Button style="text" onClick={callbacks.logout} title={'Выход'} />
        : <Button style="text" onClick={callbacks.goToLogin} title={'Вход'} />
      }</>
    </SideLayout>
  );
};

export default memo(ProfilePad);
