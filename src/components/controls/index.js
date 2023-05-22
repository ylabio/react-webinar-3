import React from "react";
import {convertPrice} from "../../utils";
import PrimaryButton from "../primary-button";
import PropTypes from "prop-types";
import './style.css';

function Controls({totalPrice, productsCount, withButton, withDescription, onClick}){
  return (
    <div className='Controls'>
      {withDescription &&
        <span>В корзине: <b>{productsCount ? `${productsCount} / ${convertPrice(totalPrice)}` : 'пусто'}</b></span>
      }
      {withButton &&
        <PrimaryButton description={'Перейти'} onClick={onClick}/>
      }
    </div>
  )
}

Controls.propTypes = {
  totalPrice: PropTypes.number,
  productsCount: PropTypes.number,
  withButton: PropTypes.bool,
  withDescription: PropTypes.bool,
  onClick: PropTypes.func
};

Controls.defaultProps = {
  onClick: () => {}
}

export default React.memo(Controls);
