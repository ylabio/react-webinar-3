import PropTypes from 'prop-types';
import './style.css';

export default function NavMenu({children}) {

  return (
    <div className="NavMenu">{children}</div>
  )
}

NavMenu.propTypes = {
  children: PropTypes.node,
}