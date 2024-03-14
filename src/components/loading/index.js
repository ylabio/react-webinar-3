import { memo, useCallback } from "react";
import PropTypes from 'prop-types';
import useSelector from "../../store/use-selector";
import './style.css';


function Loading({isLoading, children}) {

  const select = useSelector(state => ({
    currentLanguage: state.localization.currentLanguage,
    uiElements: state.localization.uiElements,
  }));

  const getLoadingText = useCallback(() => {
    return select.uiElements.loadingText[select.currentLanguage];
  }, [select.currentLanguage, select.uiElements]);
  
  return isLoading ? <h3 className="Loading">{getLoadingText()}...</h3> : children;
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

Loading.defaultProps = {
  isLoading: true,
}

export default memo(Loading);
