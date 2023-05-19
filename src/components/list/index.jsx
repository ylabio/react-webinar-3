import React from "react";
import "./style.css";
import Item from "../item/index.jsx";

function List({list, onDeleteItem, onSelectItem}) {

    return (
        <div className='List'>{
            list.map((item) =>
                <div key={item.code} className='List-item'>
                <Item item={item} onDelete={onDeleteItem} onSelect={onSelectItem} />
                </div>
            )}
        </div>    
    )
}

export default List;