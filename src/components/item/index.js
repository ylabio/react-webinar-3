import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {
    return (
        <div className={'Item'}>
            <div className={'ItemCode_And_ItemTitle'}>
                <div className='Item-code'>{props.item.code}</div>
                <div className='Item-title'>
                    {props.item.title}
                </div>
            </div>
            <div className='Item-actions'>
                <div className={'Item-actions-text'}>
                    <p>{props.item.price + ' ₽'}</p>
                    <p>{props.modal ? props.item.countValue + ' шт' : ''}</p>
                </div>
                {!props.modal ? (
                    <button onClick={() => props.addProduct(props.item)}>
                        Добавить
                    </button>
                ) : (
                    <button onClick={() => props.removeProduct(props.item)}>
                        Удалить
                    </button>
                )}
            </div>
        </div>
    );
}

Item.propTypes = {
    item: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        selected: PropTypes.bool,
        count: PropTypes.number
    }).isRequired,
    onDelete: PropTypes.func,
    onSelect: PropTypes.func
};

Item.defaultProps = {
    onDelete: () => {
    },
    onSelect: () => {
    },
}

export default React.memo(Item);
