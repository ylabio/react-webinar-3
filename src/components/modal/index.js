import React from 'react';
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from '@bem-react/classname';

function Modal({ active, children }) {

  const cn = bem('Modal');

  return (
    <div className={active ? cn() + ' active' : cn()}>
      <div className={cn('content')} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node
};

export default React.memo(Modal);
