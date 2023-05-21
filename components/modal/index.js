import React from 'react';
import List from "../list";
import './style.css';

function Modal({modal, removeProduct, products, closeModal, countPrice}) {
    return (
        <div className={'modal__background'}>
            <div className={'modal__container'}>
                <header className={'modal__header'}>
                    <h1 className={'modal__header_title'}>Корзина</h1>
                    <button onClick={() => closeModal()} className={'modal__header_btn'}>Закрыть</button>
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
                    <h3 className={'modal__footer_count'}>{countPrice.toLocaleString() + ' ₽'}</h3>
                </footer>
            </div>
        </div>
    );
}

export default Modal;

