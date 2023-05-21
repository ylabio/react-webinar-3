import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onDeleteItem, addProduct, modal, removeProduct, products}) {
    const itemsToRender = modal ? products : list;
    return (
        <div className='List'>
            {itemsToRender.map(item => (
                <div key={item.code} className='List-item'>
                    <Item
                        products={products}
                        removeProduct={removeProduct}
                        modal={modal}
                        addProduct={addProduct}
                        item={item}
                        onDelete={onDeleteItem}
                    />
                </div>
            ))}
        </div>
    )
}

List.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number
    })).isRequired,
    onDeleteItem: PropTypes.func,
    onSelectItem: PropTypes.func
};

List.defaultProps = {
    onDeleteItem: () => {
    },
    onSelectItem: () => {
    },
}

export default React.memo(List);
