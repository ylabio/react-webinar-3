import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {Link} from 'react-router-dom';
import './style.css';

function Menu (props) {

  const cn = bem('Menu');

  return (
    <nav className={cn()}>
      <ul className={cn('list')}>
        <li className={cn('item')}>
          <Link to='/' className={cn('link')}>{props.langMenu}</Link>
        </li>
      </ul>
    </nav>
  );

}

Menu.PropTypes = {
  langMenu: PropTypes.string
};

export default memo(Menu);