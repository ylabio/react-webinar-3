import './style.css';
import { memo, useCallback } from 'react';
import Button from '../button';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import { Navigate, useNavigate } from 'react-router-dom';
import { signOut } from '../../services';
import useStore from '../../hooks/use-store';

function Auth() {
  const { t } = useTranslate();
  const store = useStore();
  const select = useSelector(state => ({
    isUserLogged: state.user.isAuth,
    userName: state.user.userInfo.name,
    token: state.user.token,
  }));

  const callbacks = {
    resetUser: useCallback(() => store.actions.user.resetState(), [store]),
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
          <Button style="text" onClick={() => navigateTo('/profile')} title={select.userName} />
        )}
        <Button
          style="text"
          onClick={checkUser}
          title={!select.isUserLogged ? t('user.authIn') : t('user.authOut')}
        />
      </div>
    </div>
  );
}

export default memo(Auth);
