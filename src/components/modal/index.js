import React from "react";
import './style.css';
import PropTypes from "prop-types";
import Header from '../header';
import Head from '../head';
import Button from '../button';

function Modal({title, onClose, children}) {

  return (
    <div className='Modal-overlay'>
      <div className='Modal'>
        <Header>
          <Head title={title}/>
          <Button onClick={onClose} title={'Закрыть'}/>
        </Header>
        {children}
      </div>  
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
