import { memo, useCallback } from 'react';
import SideLayout from '../../components/side-layout';
import useTranslate from '../../hooks/use-translate';
import { Link } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function TopBar() {
  const store = useStore();
  const cn = bem('TopBar');

  const select = useSelector(state => ({
    name: state.auth.user?.profile?.name || '',
    token: state.auth.token,
  }));

  const callbacks = {
    logoutHandler: useCallback(() => {
      store.actions.auth.logout();
    }, []),
  };

  const { t } = useTranslate();

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <SideLayout side="end">
          {select.token ? (
            <>
              <Link className={cn('name')} to={'/profile'}>
                {select.name}
              </Link>
              <button className={cn('action')} onClick={callbacks.logoutHandler}>
                {t('Выход')}
              </button>
            </>
          ) : (
            <Link className={cn('action')} to={'/login'}>
              {t('Вход')}
            </Link>
          )}
        </SideLayout>
      </div>
    </div>
  );
}

export default memo(TopBar);
