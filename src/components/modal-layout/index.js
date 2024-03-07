import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ModalLayout(props) {

  const cn = bem('ModalLayout');

  return (
    <div onClick={() => props.setActive(false)} 
      className={cn()+(props.active ? ' active' : '')}>
      <div className={cn('content')} onClick={(e) => e.stopPropagation()}>
        <div className={cn('head')}>
        <h2>{props.modalTitle}</h2>
        <button onClick={() => props.setActive(false)}>Закрыть</button>
        </div>
        <div className={cn('center')}>
        {props.children}
        </div>
      </div>
    </div>

  );
}

ModalLayout.propTypes = {
  children: PropTypes.node
}

export default React.memo(ModalLayout);
