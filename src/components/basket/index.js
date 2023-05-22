import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function Basket(props){
  return (
    <div className='Basket'>
      <>
        {props.basket.length?
            props.basket.map(item =>
                <div key={item.code} className='Basket-item'>
                  <Item item={item}
                        onDeleteItem={props.onDeleteItem}
                        active={props.active}/>
                </div>)
            :<div className='List-empty'>пусто</div>
        }
        <div className={'Modal-prise'}>
          {props.basket.length?
            <>Итого <span className={'Item-price'}>{props.calculatePrice} ₽</span></>
            :<></>
          }
        </div>
      </>
    </div>
  )
    }


Basket.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  })).isRequired,
  onDeleteItem: PropTypes.func,
  active: PropTypes.bool,
  calculatePrice: PropTypes.number
};

Basket.defaultProps = {
  onDeleteItem: () => {},
}

export default React.memo(Basket);
