import React from "react";
import './style.css';

function ShoppingList(props) {
    return(
        <div className="Item List-item" key={props.data.code}>
            
            <div className='Item-code'>{props.data.code}</div>
            <div className='Item-title'>
                {props.data.title}
            </div>
            <div className="Item-price">
                {props.data.price * props.data.cound} ₽
            </div>
            <div className="Item-count">
                {props.data.cound} шт
            </div>
            <div className='Item-actions'>
                <button onClick={() => props.onDel(props.data)}>
                    Удалить
                </button>
            </div>
        </div>
    )
}

export default ShoppingList