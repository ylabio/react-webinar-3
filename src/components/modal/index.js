import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Head from '../head';

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
          <Head classModifier={props.visibleModal.visible ? 'modal' : ''} title={props.title}>
            <button className={cn('button')} onClick={callbacks.onHide}>
                  Закрыть
            </button>
          </Head>
          {props.children}
      </div>
    </div>
  );

}

Modal.propTypes = {
  visibleModal: PropTypes.shape({
    name: PropTypes.string,
    visible: PropTypes.bool
  }).isRequired,
  title: PropTypes.node,
  children: PropTypes.node,
  onHide: PropTypes.func,
  enableScroll: PropTypes.func
}

Modal.defaultProps = {
  onHide: () => {},
  enableScroll: () => {}
}

export default React.memo(Modal);