import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from "../../hooks/use-translate";

import { signOut } from '../../api';

import Button from '../button';

import './style.css';

function AuthLink() {
  const { t } = useTranslate();

  const store = useStore();

  const select = useSelector(state => ({
    isUserLogged: state.profile.isAuth,
    userName: state.profile.userInfo.name,
    token: state.profile.token,
  }));

  const callbacks = {
    resetUser: useCallback(() => store.actions.profile.resetState(), [store]),
  };

  const navigateTo = useNavigate();

  const checkUser = async () => {
    if (!select.isUserLogged) {
      navigateTo('/login');
    }

    if (select.isUserLogged) {
      const res = await signOut(select.token);
      if (res.result) {
        callbacks.resetUser();
      }
    }
  };

  return (
    <div className="Auth">
      <div className="Auth-container">
        {select.isUserLogged && (
          <Button style="text-user" onClick={() => navigateTo('/profile')} title={select.userName} />
        )}
        <Button
          style="text-auth"
          onClick={checkUser}
          title={!select.isUserLogged ? t('user.authIn') : t('user.authOut')}
        />
      </div>
    </div>
  );
}

export default memo(AuthLink);
