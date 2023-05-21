import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ModalLayout({title, onClose, children}) {

  const cn = bem('ModalLayout');

  return (
    <div className={cn()}>
      <div className={cn('body')}>
        <div className={cn('header')}>
          <h2 className={cn('title')}>{title}</h2>
          <button className={cn('close')} onClick={onClose}>
            Закрыть
          </button>
        </div>
        <div className={cn('content')}>
          {children}
        </div>
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
}

ModalLayout.defaultProps = {
  title: '',
}

export default React.memo(ModalLayout);
