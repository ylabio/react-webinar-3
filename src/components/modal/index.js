import React from 'react';
import PropTypes from 'prop-types'
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Modal({children}) {

  const cn = bem('Modal');

  return (
    <div className={cn()}>
      {children}
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node
}

export default React.memo(Modal);