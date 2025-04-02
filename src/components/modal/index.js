import React from 'react';
import './style.css';

import { cn as bem } from '@bem-react/classname';
import PropTypes from "prop-types";
import { XOutButton } from "../../icons";

const ModalDefaultProps = {
  handleClose: () => {}, title: "Корзина",
};

function Modal( { handleClose = ModalDefaultProps.handleClose, title = ModalDefaultProps.title, children } ) {
  const cn = bem( "Modal" );

  const handleOverlayClick = ( e ) => {
    if ( e.target === e.currentTarget ) {
      handleClose();
    }
  };

  return (
    <div className={ cn() }>
      <div className={ cn( "overlay" ) } onClick={ handleOverlayClick }>
        <div className={ cn( "dialog" ) }>
          <div className={ cn( "button" ) }>
            <button onClick={ handleClose }>
              <XOutButton/>
            </button>
          </div>
          <div className={ cn( "title" ) }>
            <h1>{ title }</h1>
          </div>
          <div className={ cn( "body" ) }>
            { children }
          </div>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default React.memo( Modal );
