import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Modal({children, modalIsActive, price}) {

  const cn = bem('Modal');

  return (
    <div className={modalIsActive ? `${cn()} ` : `${cn()} ${cn()}_hide`}>
      <div className={cn('content')}>
        {children}
        <div className={cn('result')}>
          <div>Итого</div>
          <div>{`${price} ₽`}</div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  modalIsActive: PropTypes.bool,
  price: PropTypes.string
}

Modal.defaultProps = {
  modalIsActive: false,
  price: ""
}

export default React.memo(Modal);
