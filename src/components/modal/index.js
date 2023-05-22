import React, { useEffect, useCallback} from 'react';
import Head from '../head/index';
import List from '../list/index';
import { addSpacesToNumber } from "../../utils";
import './style.css';

function Modal({ onClose, list, onDelete, isModalOpen }) {

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-head">
                    <Head title='Корзина'>
                        <button className="close-button" onClick={onClose}>
                            Закрыть
                        </button>
                    </Head>
                </div>
                {
                    list.length > 0 ?
                        <>
                            <div className="modal-list">
                                <List title='Удалить' list={list} onClick={onDelete} isModalOpen={isModalOpen} />
                            </div>
                            <div className="modal-res">
                                <div className='modal-res-title'>Итого</div>
                                <div className='modal-res-price'>{addSpacesToNumber(list.reduce((acc, item) => (item.count * item.price) + acc, 0))} ₽</div>
                            </div>
                        </> :
                        <h2 style={{
                            'color': 'gray',
                            'paddingLeft': '20px'
                        }}>Пусто</h2>
                }

            </div>
        </div>
    );
}

export default Modal;
