import React from "react";
import './style.css';
import Item from "../item";
import Head from "../head";
import List from "../list";
import ItemCart from "../itemCart";

function Cart({list, onSelect, totalPrice, setIsActive}) {

  const getItem = (item) => {
    return (<ItemCart onAdd={onSelect} item={item}/>)
  }
  
    return (
        <>
        <div className="List-header">
          <Head title='Корзина'/>
          <button onClick={() => setIsActive(false)}>Закрыть</button>
        </div>     
          {list.length > 0 
          ? (
            <List list={list} getItem={getItem} />
          )    
          : (
          <div className='List-empty'> 
            <a>Корзина пуста!</a>
          </div>)
        }
        <div className='Cart-total'>
          <strong>Итого: </strong> 
          <strong>{totalPrice.toLocaleString()}₽</strong>
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