import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Head({ title, showModal, setShowModal }) {
  const cn = bem('Head');

  return (
    <div className={cn() + ' ' + (showModal ? cn('cart') : '')}>
      <h1>{title}</h1>
      {showModal && <button className={cn('cart-btn')} onClick={() => setShowModal(!showModal)}>Закрыть</button>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func
};

Head.defaultProps = {
  setShowModal: () => { }
}

export default React.memo(Head);
