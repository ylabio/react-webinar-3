import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ModalLayout(props) {
  const cn = bem('ModalLayout');

  return (
    <div className={cn()}>
      <div className={cn('container')}>

        <div className={cn('head')}>
          <h2 className={cn('title')}>{props.title}</h2>
          <button onClick={props.closeModal} className={cn('button')}>
            Закрыть
          </button>
        </div>

        <div className={cn('content')}>{props.children}</div>

      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  title: PropTypes.string,
  closeModal: PropTypes.func,
  children: PropTypes.node,
}

export default React.memo(ModalLayout);