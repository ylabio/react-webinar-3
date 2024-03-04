import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import { countOccurrences, formatPrice } from "../../utils";
import './style.css';

function Basket({ list, onClose }) {

    const countOccurrencesList = countOccurrences(list);

    const [listState, setListState] = React.useState(countOccurrencesList);

    const onDeleteItem = (code) => {
        const newList = listState.filter(item => item.code !== code);
        const index = list.findIndex(item => item.code === code);
        if (index !== -1) {
            list.splice(index, 1);
        }
        setListState(newList);
    };

    return (
        <div className='Basket'>
            <div className='Basket-title'>
                <b>Корзина</b>
                <button className="Basket-button" onClick={onClose}>Закрыть</button>
            </div>
            <div className="Basket-List">
                {listState.length === 0
                    ? <div className='Basket-empty'>
                        <span>
                            Корзина пуста
                        </span>
                    </div>
                    : <>
                        {listState.map(item =>
                            <div key={item.code} className='Basket-item'>
                                <Item item={item} count={item.count} onAction={onDeleteItem} buttonText={"Удалить"} />
                            </div>
                        )}
                        <div className='Basket-total'>
                            <b>Общая сумма: </b>
                            <b>{formatPrice(listState.reduce((sum, item) => sum + item.price, 0))} ₽</b>
                        </div>
                    </>
                }

            </div>
        </div>
    )
}

Basket.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number
    })).isRequired
};

Basket.defaultProps = {
    list: [],
    onClose: () => { }
}

export default React.memo(Basket);