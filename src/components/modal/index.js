import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import './style.css';

function Modal({ title, children, onClose }) {
  return (
    <div className="Modal">
      <div className="Modal-content">
        <Head title={title} headingLevel="2" >
          <div className="Modal-actions">
            <button onClick={onClose}>
            </button>
          </div>
        </Head>
        <div className="Modal-body">
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
