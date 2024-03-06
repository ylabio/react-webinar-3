import React from "react";
import Head from "../head";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Modal({children, toggleModal, title}) {
  const cn = bem('Modal');
  const handleCloseModal = (event) => {
    if (!event.target.closest('.Modal-content')) {
      toggleModal();
    }
  };
  
  return (
    <div className={cn()}>
    <div className={cn('overlay')} onClick={handleCloseModal}/>
    <div className={cn('content')}>
      <div className={cn('header')}>
        <Head title={title} btnText='Закрыть' btnAction={toggleModal}/>
      </div>
      {children}
    </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  toggleModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};



export default React.memo(Modal);
