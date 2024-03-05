import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Button from '../button';
import {plural} from "../../utils";

function Controls( props ) {

  const onClick = () => {
    props.onClick();
  }

  return (
    <div className='Controls'>
      <div className='Controls-info'>
        <span className='Controls-info_text'>В корзине:</span>
        {
          props.quantity ? `${props.quantity} 
          ${plural(props.quantity, {one: 'товар', few: 'товара', many: 'товаров'})} / ${props.totalSum} ₽` : 'пусто'} 
      </div>
      <Button onClick={onClick} title={props.title}></Button>
    </div>
  )
}

Controls.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  quantity: PropTypes.number,
  totalSum: PropTypes.number,
};

Controls.defaultProps = {
  onClick: () => {}
}

export default React.memo(Controls);
