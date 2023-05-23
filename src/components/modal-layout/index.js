import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ModalLayout({ children, showModal }) {
  const cn = bem('ModalLayout');

  const onClickHandler = (e) => {
    if (e.target.className === 'ModalLayout') {
      showModal();
    }
  };

  return (
    <div className={cn()} onClick={onClickHandler}>
      {children}
    </div>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node,
  showModal: PropTypes.func,
};

ModalLayout.defaultProps = {
  showModal: () => {},
};

export default React.memo(ModalLayout);
