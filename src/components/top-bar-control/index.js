import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import SideLayout from '../side-layout';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';

function TopBarControl({ logout, name, token, t, pathname }) {
  const cn = bem('TopBarControl');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <SideLayout side="end">
          {token ? (
            <>
              <Link className={cn('name')} to={'/profile'}>
                {name}
              </Link>
              <button className={cn('action')} onClick={logout}>
                {t('Выход')}
              </button>
            </>
          ) : (
            <Link className={cn('action')} to={'/login'} state={{ prevPath: pathname }}>
              {t('Вход')}
            </Link>
          )}
        </SideLayout>
      </div>
    </div>
  );
}

TopBarControl.propTypes = {
  name: PropTypes.string,
  token: PropTypes.string,
  t: PropTypes.func,
  logout: PropTypes.func,
  pathName: PropTypes.string,
};

export default memo(TopBarControl);
