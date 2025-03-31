import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import './style.css';

function Modal({ children }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="Modal">
      <div className="Modal-content">{children}</div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(Modal);
