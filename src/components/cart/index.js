import React from "react";
import './style.css';
import Item from "../item";

function Cart({list, onSelect}) {

  const sumPrice = list.reduce((acc, item) => {
    acc += item.price*item.amountCart;
    return acc;
  }, 0);

    return (
        <>
        <div className='List'>         
          {list.length > 0 
          ? list.map(item =>
            <div key={item.code} className='List-item'>
              <Item item={item} onAdd={onSelect} text={'Удалить'}/>
            </div>
          )
          : (
          <div className='List-empty'> 
            <a>Корзина пуста!</a>
          </div>)
        }
        </div>
        <div className='Cart-total'>
          <strong>Итого: </strong> 
          <strong>{sumPrice}₽</strong>
          <div className='Cart-space'></div>
        </div>

        
        </>
      )
    }

    
    Cart.defaultProps = {
      onAddCart: () => {
      }

}

export default React.memo(Cart);