import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural,priceFormat} from "../../utils";
import './style.css';
import Button from "../controls";

function Item({item,onAddBasket,onDeleteBasketItem}) {  

  const callbacks = {

    onAddBasket: (e)=>{
      e.stopPropagation();
      onAddBasket(item.code)
    },
    onDeleteBasket: (e)=>{
      e.stopPropagation();
      onDeleteBasketItem(item.code)
    },
  }

  return (
    <div className={'Item' + (item.selected ? ' Item_selected' : '')}
         onClick={callbacks.onClick}>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>
        {item.title} 
      </div>
      <div className='Item-actions'>
       
       
   {item.count?  <div className="Item-control"><div className="Item-out"><div>{priceFormat(item.price)+' ₽'} </div><div>{item?.count+' шт'}</div></div><Button onButton={callbacks.onDeleteBasket} name='Удалить'/></div> :
    <div className="Item-control"><div className="Item-out">{priceFormat(item.price)+' ₽'}</div> <Button onButton={callbacks.onAddBasket} name='Добавить'/></div>}
     
        
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price:PropTypes.number,
  }).isRequired,
  onAddBasket: PropTypes.func,
  onDeleteBasket: PropTypes.func
};

Item.defaultProps = {
  onAddBasket: () => {
  },
  onDeleteBasket: () => {
  },
}

export default React.memo(Item);
