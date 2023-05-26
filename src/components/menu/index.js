import {memo} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Menu() {
  const cn = bem('Menu');
  return (
    <Link to={`/`} className={cn('link-back')}>
      <span>Главная</span>
    </Link>
  );
}

export default memo(Menu);
