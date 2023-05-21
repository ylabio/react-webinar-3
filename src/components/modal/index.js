import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import './style.css';

function Modal({active, setActive, children}){
  return ( 
    <div className={active ? 'Modal-active' : 'Modal'} onClick={() => setActive(false)}>
      <div
        className={active ? 'Modal-content_active' : 'Modal-content'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='Modal-head'>
          <Head title='Корзина'/>
          <button className='Modal-close' onClick={() => setActive(false)}>
            Закрыть
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  count: PropTypes.number,
  active: PropTypes.bool,
  setActive: PropTypes.func,
};

Modal.defaultProps = {
  setActive: () => {},
}

export default React.memo(Modal);
