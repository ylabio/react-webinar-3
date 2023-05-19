import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PageLayout({ children, onShowModal, showModal }) {
  const cn = bem('PageLayout');

  const onClickHandler = (e) => {
    if (e.target.className === 'PageLayout-Wrapper' && showModal) {
      onShowModal();
    }
  };

  return (
    <div className={cn('Wrapper')} onClick={onClickHandler}>
      <div className={cn()}>
        <div className={cn('center')}>{children}</div>
      </div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default React.memo(PageLayout);
