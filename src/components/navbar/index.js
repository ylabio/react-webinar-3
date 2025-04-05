import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router';
function Navbar ({ path = '', renderBasket = () => {} }) {
  const cn = bem('Navbar');

  return (
    <div className={cn()}>
      <Link to={path} className={cn('home')}>Главная</Link>
      {renderBasket()}
    </div>
  );
}

Navbar.propTypes = {
  path: PropTypes.string,
  renderBasket: PropTypes.func,
};

export default memo(Navbar);
