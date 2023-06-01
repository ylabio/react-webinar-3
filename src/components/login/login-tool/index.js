import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

/**
 * Login tool (a thin bar at the app's top side for login/logout/profile), like a basket tool
 */

function LoginTool({ action, name, link, t }) {
  const cn = bem('LoginTool');

  return (
    <div className={cn()}>
      {
        name ? // есть имя - юзер залогинен, больше тут знать не надо
          <>
            <Link className={cn('link')} to={link}>{name}</Link>
            <button className={cn('button')} onClick={action}>{t('logintool.out')}</button>
          </>
          : <button className={cn('button')} onClick={action}>{t('logintool.in')}</button>
      }
    </div>
  );
}

LoginTool.propTypes = {
  action: PropTypes.func.isRequired,
  name: PropTypes.string,
  link: PropTypes.string,
  t: PropTypes.func
}

LoginTool.defaultProps = {
  action: () => { },
  /* name: 'Жора',
  link: '', */
  t: (text) => text
}

export default React.memo(LoginTool);