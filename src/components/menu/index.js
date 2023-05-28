import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from 'react-router-dom';

function Menu({children}) {
  const cn = bem('Menu');

  return (
    <div className={cn()}>
      <Link className={cn('main')} to={'/'}>
        Главная
      </Link>
      {children}
    </div>
  );
}

export default memo(Menu);
