import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
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

        <ul className={cn('list')}>{props.children}</ul>

      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  title: PropTypes.string,
  closeModal: PropTypes.func,
  cheldren: PropTypes.node,
}

export default React.memo(ModalLayout);