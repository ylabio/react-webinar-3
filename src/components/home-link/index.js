import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { NavLink } from "react-router";
import PropTypes from 'prop-types';

function HomeLink({label, link}) {
  const cn = bem('HomeLink');

  return (
      <NavLink to={link} end={true} className={cn()}>{label}</NavLink>
  );
}

HomeLink.propTypes = {
  link: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
  }).isRequired,
  label: PropTypes.string.isRequired,
};

export default memo(HomeLink);
