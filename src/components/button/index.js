import {memo, useCallback} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Button(props) {

  const callbacks = {
    onClick: useCallback(() => {
      props.onClick();
    }, [])
  }
  
  return (
    <div className="Button">
      <button 
        type={props.type} 
        disabled={props.disabled}
        onClick={callbacks.onClick}
      >
        {props.text_btn}
      </button>
    </div>
  )
}

Button.propTypes = {
  text_btn: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};
  
Button.defaultProps = {
  onClick: () => {}
}

export default memo(Button);