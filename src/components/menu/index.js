import { memo } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router';
import './style.css';

function Menu({ resetToFirstPage = () => {}, link, title }) {
  return (
    <NavLink onClick={resetToFirstPage} className="Menu-link" to={link}>
      {title}
    </NavLink>
  );
}

Menu.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
  resetToFirstPage: PropTypes.func,
};

export default memo(Menu);
