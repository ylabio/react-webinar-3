import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ModalLayout({children, closeModel}) {
  const handleCloseModelOverly = (event) => {
    if (event.currentTarget === event.target) {
      closeModel();
    }
  };

  return (
    <div
      role='button'
      tabIndex={0}
      className='Modal'
      onClick={handleCloseModelOverly}
      aria-label='закрыть модальное окно'
    >
      {children}
    </div>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node,
  closeModel: PropTypes.func,
};

ModalLayout.defaultProps = {
  closeModel: () => {},
};

export default React.memo(ModalLayout);
