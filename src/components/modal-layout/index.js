import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ModalLayout(props) {
  const cn = bem('ModalLayout');

  return (
    <div className={cn()}>
      <div className={ cn( 'overlay' ) }>
        <div className={ cn( 'header' ) }>
          <h2 className={ cn( 'title' ) }>{props.title}</h2>
          <button onClick={props.closeModal} className={ cn( 'button' ) }>Закрыть</button>
        </div>
        <div className={ cn( 'list' ) }>{props.children}</div>
      </div>
    </div>
  )
}

ModalLayout.propTypes = {
  title: PropTypes.string,
  closeModal: PropTypes.func,
  children: PropTypes.node,
};

ModalLayout.defaultProps = {
  title: 'Модальное окно',
  closeModal: () => {
  }
};

export default React.memo(ModalLayout);