import {memo} from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import useSelector from "../../store/use-selector";
import './style.css';

function BreadCrumbs({ getPhrase }) {
  
  // not quite breadcrumbs yet, but can be turned into one easily
  return (
    <div>
      
      <Link to='/'>{ getPhrase('general', 'mainPage', 'Main page') }</Link>

    </div>
  );
}

BreadCrumbs.propTypes = {
  getPhrase: PropTypes.func.isRequired,
};

export default memo(BreadCrumbs);
