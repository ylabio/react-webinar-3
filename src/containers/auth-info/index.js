import { memo } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useLocation } from "react-router-dom";
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

function AuthInfo() {
  const cn = bem('AuthInfo');
  const store = useStore();
  const { t } = useTranslate();
  const location = useLocation();

  const username = useSelector((state) => state.session.username);

  const callbacks = {
    onLogout: () => {
      store.actions.session.logoutUser();
      store.actions.profile.resetProfileInfo();
    },
    onRemoveError: () => store.actions.session.removeError()
  }

  return (
    <div className={cn()}>
    <div className={cn('container')}>
      {username ? (
        <>
          <Link to="/profile" className={cn('username')}>
            {username}
          </Link>
          <Link to="/login">
            <button onClick={callbacks.onLogout}>{t('login.logout')}</button>
          </Link>
        </>
      ) : (
        <Link to="/login" state={{ from: location.pathname }}>
          <button onClick={callbacks.onRemoveError}>{t('login.title')}</button>
        </Link>
      )}
      </div>
    </div>
  );
}

export default memo(AuthInfo);