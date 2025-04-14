import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import SideLayout from '../side-layout';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';

function TopBarControl({ logout, name, token, t }) {
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
            <Link className={cn('action')} to={'/login'}>
              {t('Вход')}
            </Link>
          )}
        </SideLayout>
      </div>
    </div>
  );
}

TopBarControl.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default memo(TopBarControl);
