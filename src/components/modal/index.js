import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { store } from '../..';
import './style.css';

function PageLayout(props) {
  const cn = bem('Modal');

  const callbacks = {
    onModalClose: useCallback(() => store.modalClose(), [store]),
  };

  return (
    <>
      <div className={cn('overlay')}></div>
      <div className={cn()}>
        <div className={cn('head')}>
          <h2 className={cn('title')}>{props.title}</h2>
          <button className={cn('btn')} onClick={callbacks.onModalClose}>
            Закрыть
          </button>
        </div>
        <div className={cn('center')}>{props.children}</div>
      </div>
    </>
  );
}

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default React.memo(PageLayout);
