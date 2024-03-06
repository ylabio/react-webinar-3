import React from 'react';
import Head from '../head';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Modal(props) {

  const cn = bem('Modal');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <Head title={props.title} closeModal={props.toggleModal}></Head>
        <div className={cn('children')}>
          {props.children}
        </div>
      </div>
      <div className={cn('backdrop hidden')}></div>
    </div>
  )
}

Modal.propTypes = {
  toggleModal: PropTypes.func
};

Modal.defaultProps = {
  onDeleteItem: () => {
  },
  toggleCart: () => {
  }
}

export default React.memo(Modal)

