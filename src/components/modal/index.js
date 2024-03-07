import React from "react";
import PropTypes from "prop-types";
import Head from "../head";
import Button from "../button";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Modal({children, modalIsActive, toggleModal, title}) {

  const cn = bem('Modal');

  return (
    <div className={modalIsActive ? `${cn()} ` : `${cn()} ${cn()}_hide`}>
      <div className={cn('content')}>
        <Head title={title}>
          <Button onClickFunc={toggleModal} text="Закрыть"/>
        </Head>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  modalIsActive: PropTypes.bool,
  toggleModal: PropTypes.func,
  title: PropTypes.string
}

Modal.defaultProps = {
  modalIsActive: false,
  title: ""
}

export default React.memo(Modal);
