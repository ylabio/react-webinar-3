import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Navigation(props) {
  const cn = bem('Navigation');
  const {navItems} = props;

  return (
    <ul className={cn()}>
      {
        navItems.map((item, i) => {
          return (
            <li className={cn('item')} key={i}>
              <Link to={item.link} className={cn('link')}>{item.title}</Link>
            </li>
          )
        })
      }
    </ul>
  )
}

Navigation.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    title: PropTypes.string
  })).isRequired
}

export default memo(Navigation);