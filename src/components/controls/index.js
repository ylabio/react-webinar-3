import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Button from '../button';

function Controls( props ) {

  const onClick = () => {
    props.onClick();
  }
  return (
    <div className='Controls'>
      <div className='Controls-info'><span className='Controls-info_text'>В корзине:</span> {props.quantity ? `${props.quantity} товаров / ${props.totalSum} ₽` : 'пусто'} </div>
      <Button onClick={onClick} title={props.title}></Button>
    </div>
  )
}

Controls.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string
};

Controls.defaultProps = {
  onClick: () => {}
}

export default React.memo(Controls);
