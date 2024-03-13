import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import './style.css';

export function NavMenu({langData}) {
  return (
    <>
      <Link to="/" className="NavMenu-link">{langData.main.page}</Link>
    </>
  )
}

NavMenu.propTypes = {
  langData: PropTypes.object,
}

export default NavMenu;