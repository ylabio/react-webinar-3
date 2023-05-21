import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Head from '../head';
import Controls from '../controls';

function Modal({title, controls, children, onClose}){
  const cn = bem('Modal');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <Head title={title}>
          <button onClick={onClose}>Закрыть</button>
        </Head>
        <Controls>
          {controls}
        </Controls>
        <div className={cn('data')}>
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.node,
  controls: PropTypes.node,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  title: '',
  controls: '',
}

export default React.memo(Modal);
