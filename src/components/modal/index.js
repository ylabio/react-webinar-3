import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Modal({ title, children, onClose }) {
  const cn = bem('Modal');
  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <Head title={title} headingLevel="2" >
          <div className={cn('actions')}>
            <button onClick={onClose}>
            </button>
          </div>
        </Head>
        <div className={cn('body')}>
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(Modal);
