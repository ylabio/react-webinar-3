import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import './style.css';

/**
 * Модальное окно
 */
function Modal(props) {
  return (
    <div className='Modal'>
      <div className='Modal-frame'>
        {props.title &&
          <Head title={props.title}>
            <button className='action' onClick={props.onHide}>
              Закрыть
            </button>
          </Head>
        }
        <div className='Modal-body'>
          {props.children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  onHide: PropTypes.func,
  children: PropTypes.node
};

Modal.defaultProps = {
  title: '',
  onHide: () => {},
  children: null
}

export default React.memo(Modal);