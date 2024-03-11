import { memo, useCallback } from "react";
import PropTypes from 'prop-types';
import useSelector from "../../store/use-selector";
import './style.css';

function Controls({onAdd}) {
  
  const select = useSelector(state => ({
    currentLanguage: state.localization.currentLanguage,
    uiElements: state.localization.uiElements,
  }));

  const getBasketAddText = useCallback(() => {
    return select.uiElements.basketAdd[select.currentLanguage];
  }, [select.currentLanguage, select.uiElements]);
  
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{getBasketAddText()}</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default memo(Controls);
