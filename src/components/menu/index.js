import {memo} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Menu({title}) {
  const cn = bem('Menu');
  return (
    <Link to={`/`} className={cn('link-back')}>
      <span>{title}</span>
    </Link>
  );
}

Menu.propTypes = {
  title: PropTypes.node,
};

export default memo(Menu);
