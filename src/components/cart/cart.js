import React, { useCallback } from 'react';
import List from "../list";
import Controls from "../controls";
import Head from "../head";
import Modal from "../modal";
import formatPrice from '../../helpers/formatPrice';
const Cart = ({ store }) => {
    const isModalOpen = store.getState().isModalOpen;
    const selectedItems = store.getState().selectedItems;
    const countItems = store.getState().countItems;
    const countPrice = store.getState().countPrice;

    const callbacks = {
        onDeleteItem: useCallback((code) => {
            store.deleteItem(code);
        }, [store]),

        onToggleCart: useCallback(() => {
            if (isModalOpen) {
                store.closeModal();
            } else {
                store.openModal();
            }
        }, [isModalOpen, store])
    };

    return (
        <Modal isOpen={isModalOpen} onClose={callbacks.onToggleCart}>
            <Head title='Корзина' >
                <Controls onAction={callbacks.onToggleCart} title='Закрыть' />
            </Head>
            <List titleButton={'Удалить'} list={selectedItems}
                onСlickItem={callbacks.onDeleteItem}
            />
            <div className='totalContainer'>
                <span className='totalLabel'>Итого:</span>
                <span className='amount'>
                    {countItems > 0 ? (
                        <strong className='counting'><span>{`${formatPrice(countPrice)} ₽`} </span></strong>
                    ) : (
                        <strong className='counting'>0 ₽</strong>
                    )}
                </span>
            </div>
        </Modal>
    );
};

export default Cart;