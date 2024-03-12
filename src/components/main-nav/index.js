import {memo} from 'react';
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import useSelector from '../../store/use-selector';
import './style.css';

function MainNav(props) {

  const currentPage = useSelector((state) => state.catalog.pagination.current);

  return (
    <ul className="Main-nav">
      <NavLink to={'/' + currentPage}>{props.textData.main}</NavLink>
    </ul>
  )
}

MainNav.propTypes = {
  textData: PropTypes.exact({
    main: PropTypes.string,
  }).isRequired,
};

export default memo(MainNav);
