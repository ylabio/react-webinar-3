import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";


function Controls(props) {

  const goodsWord = plural(props.uniqItems, {one:'товар',few:'товара',many:'товаров',other:'товаров'});

  return (
    <div className='Controls'>
      {!props.showModal ?
        <div>
          {!props.price && props.price !== 0 &&
            <div className='Controls-in-basket'><div>В корзине: </div> {props.uniqItems ? <span>{props.uniqItems} {goodsWord} / {props.totalPrice} ₽</span> :
              <span>пусто</span>}</div>}
          {props.price && <div>
            <div>{props.price} ₽</div>
          </div>}
        </div> :
        <div className='Controls-item-basket'>
         <div><div>{props.price} ₽</div></div>
         <div><div>{props.count} шт.</div></div>
        </div>
      }
      <button onClick={props.callback}>{props.title}</button>
    </div>
  )
}

Controls.propTypes = {
  callback: PropTypes.func,
  uniqItems: PropTypes.number,
  price: PropTypes.number,
  totalPrice: PropTypes.number,
  showModal: PropTypes.bool,
  count: PropTypes.number
};

Controls.defaultProps = {
  callback: () => {
  }
};

export default React.memo(Controls);
