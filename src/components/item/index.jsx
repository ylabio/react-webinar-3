import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {
    const callbacks = {
        onClick: (code) => {
            props.onClick(code);
        }
    }

    const price = props.item.price.toLocaleString("ru-RU");

    return (
        <div className={'Item'}>
            <div className='Item-code'>{props.item.code}</div>
            <div className='Item-title'>
                {props.item.title}
            </div>
            <div className="Item-price">
                {price} ₽
            </div>
            {props.item.count ?
                <div className="Item-count">
                    {`${props.item.count} шт`}
                </div>
                :
                ""
            }
            <div className='Item-actions'>
                <button onClick={() => callbacks.onClick(props.item.code)}>
                    {props.buttonText}
                </button>
            </div>
        </div>
    );
}

Item.propTypes = {
    item: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        selected: PropTypes.bool,
        count: PropTypes.number,
        price: PropTypes.number,
        buttonText: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func
};

Item.defaultProps = {
    onClick: () => { }
}

export default React.memo(Item);