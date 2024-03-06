import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import Button from "../button";
import './style.css';

function Modal({modalTitle, onCloseCart, children}) {
  const cn = bem('Modal');

	const handleCloseModal = () => {
    onCloseCart();
    document.body.style.overflow = "unset";
  }

  return (
    <div className={cn()}>
      <div className={cn('content')}>
				<div className={cn('header')}>
					<h2 className={cn('title')}>{modalTitle}</h2>
					<Button callback={handleCloseModal} title={'Закрыть'}/>
				</div>
				<div className={cn('body')}>			
					{children}
				</div>				
			</div>
    </div>
  )
}

Modal.propTypes = {
  modalTitle: PropTypes.string,
  onCloseCart: PropTypes.func,
  children: PropTypes.node
}

Modal.defaultProps = {
  onCloseCart: () => {}
}

export default React.memo(Modal);