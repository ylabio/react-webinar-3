import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function Basket({basketList, summa, onRemoveBasketItem, onClose}){
  return (
    <div className='Basket'>
      <div className="Basket-header">
        <p className="Basket-title">
          Корзина
        </p>
        <button onClick={() => onClose()}>Закрыть</button>
      </div>
      
      <div className="Basket-items">
       {basketList.map(item =>
         <div key={item.code} className='List-item'>
           <Item item={item} flag={true}
                    onAdd={onRemoveBasketItem} /* onSelect={onSelectItem} */ />
         </div>
       )}
      </div>

      <div className="Basket-summa">
        <div>
            <p>Итого</p>
        </div>
        <div>{summa} ₽</div>
      </div>
    </div>
  )
}

Basket.propTypes = {
  onAdd: PropTypes.func
};

Basket.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Basket);