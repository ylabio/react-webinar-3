import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import './style.css';

function Modal({modalTitle, active, onClose, children}) {
  if (!active) {
    return null;
  }
  return (
    <div className='Modal'>
      <div className='Modal-content'>
        <Head title={modalTitle}>
          <button onClick={onClose}>Закрыть</button>
        </Head>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  active: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node
};

Modal.defaultProps = {
  onClose: () => {
  },
  title: '',
  active: false
}

export default React.memo(Modal);
