import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import './style.css';

function ModalLayout({children, title, onToggleModal}) {
  return (
    <div className='Modal'>
      <div className='Modal-content'>
        <Head title={title} onToggleModal={onToggleModal} />
        
        {children}
      </div>
    </div>
  )
}

ModalLayout.propTypes = {
  children: PropTypes.node
}

export default React.memo(ModalLayout)