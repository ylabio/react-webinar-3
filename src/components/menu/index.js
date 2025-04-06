import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Menu({ items }) {
  const cn = bem('Menu');

  return (
    <div className={cn()}>
      {items.map(item => (
        <Link key={item.link} to={item.link} className={cn('item')}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
};

export default memo(Menu); 