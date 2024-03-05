import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Head({title, isBasketHead, showBasket}) {

  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1>{title}</h1>
      {isBasketHead ? <button className={cn('button')} onClick={() => showBasket()}>Закрыть</button> : <></>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  isBasketHead: PropTypes.bool,
  showBasket: PropTypes.func,
};

Head.defaultProps = {
  title: ''
};

export default React.memo(Head);
