import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { NavLink } from 'react-router';
import './style.css';

function Navigation({ mainNavText = 'Главная' }) {
  const cn = bem('Navigation');

  return (
    <div className={cn()}>
      <NavLink className={cn('link')} to="/" end>
        {mainNavText}
      </NavLink>
    </div>
  );
}

Navigation.propTypes = {
  mainNavText: PropTypes.string,
};

export default memo(Navigation);
