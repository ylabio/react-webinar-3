import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";
import List from "../list";

function Controls(
    {
        setModal,
        modal,
        countPrice,
        products,
        removeProduct,
    }
) {

    function showModal() {
        setModal(true)
    }
    function closeModal() {
        setModal(false)
    }

    return (
        <>
            <div className='Controls'>
                <p className={'controls__title'}>В корзине:</p>
                <h3 className={'controls__count'}>{products.length >0 ? ` ${products.length} ${plural(products.length, {one: 'товар', few: 'товара', many: 'товаров'})}` : 'пусто'} {countPrice > 0 ? (' / '+countPrice + '₽'): ''}</h3>
                <button className={'controls__btn'} onClick={showModal}>Перейти</button>
            </div>
            {modal && (
                <div className={'modal__background'}>
                    <div className={'modal__container'}>
                        <header className={'modal__header'}>
                            <h1 className={'modal__header_title'}>Корзина</h1>
                            <button onClick={closeModal} className={'modal__header_btn'}>Закрыть</button>
                        </header>

                        <div className={'modal__products_list'}>
                            <List
                                products={products}
                                removeProduct={removeProduct}
                                modal={modal}
                            />
                        </div>

                        <footer className={'modal__footer'}>
                            <h3 className={'modal__footer_title'}>Итого</h3>
                            <h3 className={'modal__footer_count'}>{countPrice + ' ₽'}</h3>
                        </footer>
                    </div>
                </div>
            )}
        </>
    )
}

Controls.propTypes = {
    onAdd: PropTypes.func
};

Controls.defaultProps = {
    onAdd: () => {
    }
}

export default React.memo(Controls);
