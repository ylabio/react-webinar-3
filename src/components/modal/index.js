import React from "react";
import PropTypes from "prop-types";
import Head from "../head";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Modal({title, setOpenModal, children}) {
  const cn = bem('Modal');

  const handleCloseModal = () => {
    setOpenModal(false);
    document.body.style.overflow = "unset";
  }

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <div className={cn('header')}>
            <Head title={title} />
            <button onClick={handleCloseModal}>Закрыть</button>
        </div>
        <div className={cn('content')}>
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  setOpenModal: PropTypes.func,
  children: PropTypes.node
}

Modal.defaultProps = {
  setOpenModal: () => {}
}

export default React.memo(Modal);