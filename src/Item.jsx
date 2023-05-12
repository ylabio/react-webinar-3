import React from "react";
import { useState } from "react";

const Item = ({item, store}) => {
  const [count, setCount] = useState(0);

  const clickHandler = () => {
    if (!item.selected) {
      setCount(c => c + 1);
    }

    store.selectItem(item.code);
  }

  return (
    <div className='List-item'>
      <div
        className={'Item' + (item.selected ? ' Item_selected' : '')}
        onClick={clickHandler}
      >
        <div 
          className='Item-code'
        >
          {item.code}
        </div>
            <div 
              className='Item-title'
            >
              {item.title}
              {count > 0 && ` | Выделяли ${count} раз`}
            </div>
            <div 
              className='Item-actions'
            >
              <button 
                onClick={() => store.deleteItem(item.code)}
              >
                Удалить
              </button>
            </div>
      </div>
    </div>
  )
};

export default Item;