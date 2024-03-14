import { memo, useCallback } from "react";
import PropTypes from 'prop-types';
import useSelector from "../../store/use-selector";
import './style.css';


function Loading({isLoading, text, children}) {


  
  return isLoading ? <h3 className="Loading">{text}...</h3> : children;
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
  text: PropTypes.string,
  children: PropTypes.node,
};

Loading.defaultProps = {
  isLoading: true,
}

export default memo(Loading);
