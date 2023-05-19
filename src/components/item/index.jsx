import React from "react";

function Item({item, onSelect, onDelete}) {
    return (
        <div className={'Item' + (item.selected ? ' Item_selected' : '')}
        onClick={() => onSelect(item.code)}>
        <div className='Item-code'>{item.code}</div>
        <div className='Item-title'>{item.title} {item.highlited ? ` | Выделяли ${item.highlited} раз(a) ` : null}</div>
        <div className='Item-actions'>
            <button onClick={() => onDelete(item.code)}>
                Удалить
            </button>
        </div>
    </div>    
    )
}

export default Item;