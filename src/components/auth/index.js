import './style.css';
import { memo, useCallback } from 'react';
import Button from '../button';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import { Navigate, useNavigate } from 'react-router-dom';

function Auth() {
  const { t } = useTranslate();

  const select = useSelector(state => ({
    isUserLogged: state.user.isAuth,
    userName: state.user.userInfo.name,
  }));

  let navigateTo = useNavigate();

  let link = '';

  return (
    <div className="Auth">
      <div className="Auth-container">
        {select.isUserLogged && (
          <Button style="text" onClick={() => navigateTo('/profile')} title={select.userName} />
        )}
        <Button
          style="text"
          onClick={() => navigateTo('/login')}
          title={!select.isUserLogged ? t('user.authIn') : t('user.authOut')}
        />
      </div>
    </div>
  );
}

export default memo(Auth);
