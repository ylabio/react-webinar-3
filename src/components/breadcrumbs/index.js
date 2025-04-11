import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Breadcrumbs({ items }) {
  const cn = bem('Breadcrumbs');

  return (
    <div className={cn()}>
      {items.map((item, index) => (
        <span key={item.key}>
          {index > 0 && <span className={cn('separator')}>/</span>}
          {item.link ? (
            <Link to={item.link} className={cn('link')}>
              {item.title}
            </Link>
          ) : (
            <span className={cn('current')}>{item.title}</span>
          )}
        </span>
      ))}
    </div>
  );
}

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      link: PropTypes.string,
    })
  ).isRequired,
};

export default memo(Breadcrumbs);