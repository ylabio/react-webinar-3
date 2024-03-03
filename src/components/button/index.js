import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Button({ text, onAction }) {
  const cn = bem('Button');

  return (
    <button className={cn()} onClick={onAction}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired, 
  onAction: PropTypes.func.isRequired, 
};
Button.defaultProps = {
  onAction: () => {
  },
}

export default React.memo(Button);
