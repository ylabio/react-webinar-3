import PropTypes from 'prop-types';
import './style.css';

function Navbar({ children }) {
  return <nav className="Navbar">{children}</nav>;
}

Navbar.propTypes = {
  children: PropTypes.node,
};
export default Navbar;
