import {memo} from 'react';
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import './style.css';

function MainNav(props) {

  return (
    <ul className="Main-nav">
      <NavLink to={props.links.main}>{props.textData.main}</NavLink>
    </ul>
  )
}

MainNav.propTypes = {
  textData: PropTypes.exact({
    main: PropTypes.string,
  }).isRequired,
  links: PropTypes.shape({
    main: PropTypes.string,
  })
};

export default memo(MainNav);
