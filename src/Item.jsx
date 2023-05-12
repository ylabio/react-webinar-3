import React from "react";
import { useState } from "react";

const Item = ({store, item}) => {
    const [count, setCount] = useState(0);

    const clickHandler = () => {
        if (!item.selected) {
            setCount(count => count + 1);
        }

        store.selectItem(item.code);
    }

    return (
        <div className='List-item'>
            <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={clickHandler}
            >
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>
                    {item.title}
                    {' '}
                    {count > 0 ? `| Selected ${count} time(s)` : null}
                </div>
                <div className='Item-actions'>
                    <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
                </div>
            </div>
        </div>
    )
};

export default Item;