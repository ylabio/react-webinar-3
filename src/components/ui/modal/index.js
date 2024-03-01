import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Modal({children, isModalOpen}) {

  const cn = bem('Modal');

  return isModalOpen ? (
    <div className={cn()}>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  ) : null
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};


export default React.memo(Modal);
