import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Button({children, onClick, inCart = false}) {

  const cn = bem('Button');

  return (
    <button className={cn() + (inCart ? ` ${cn('-cart')}` : '')} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  inCart: PropTypes.bool
}

Button.defaultProps = {
  onClick: () => {
  }
}

export default React.memo(Button)