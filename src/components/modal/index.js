import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Modal (props) {

  const cn = bem('Modal');

  const callbacks = {
    onHide: () => {
      props.onHide(props.visibleModal.name);
      props.enableScroll();
    }
  }

  return (
    <div className={props.visibleModal.visible ? cn({active: true}) : cn()}>
      <div className={cn('wrapper')}>
        {/* content - оболочка, что бы при появления скролла на всю высоту модального окна, 
        углы модального окна не становились квадратными из-за скролла*/}
        <div className={cn('content')}>
          <div className={cn('actions')}>
            <button className={cn('button')} onClick={callbacks.onHide}>
                  Закрыть
            </button>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );

}

Modal.propTypes = {
  visibleModal: PropTypes.shape({
    name: PropTypes.string,
    visible: PropTypes.bool
  }).isRequired,
  children: PropTypes.node,
  onHide: PropTypes.func,
  enableScroll: PropTypes.func
}

Modal.defaultProps = {
  onHide: () => {},
  enableScroll: () => {}
}

export default React.memo(Modal);