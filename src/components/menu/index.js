import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Menu({menuLinks}) {
  const cn = bem('Menu');

  return (
    <ul className={cn()}>
      {
        menuLinks.map((item, i) => {
          return (
            <li className={cn('item')} key={i}>
              <Link to={item.link}>{item.title}</Link>
            </li>
          )
        })
      }
    </ul>
  )
}

Menu.propTypes = {
  menuLinks: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    title: PropTypes.string
  })).isRequired
}

export default memo(Menu);
