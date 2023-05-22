import React from 'react';
import './style.css'
import Head from '../head';
import List from '../list';
import PropTypes from "prop-types";

const Modal = ({ setActive, list, onDeleteItem, total }) => {
    return (
        <div className='modal'>
            <div className='modal-content'>
                <Head title='Корзина'>
                    <button onClick={() => setActive(false)} >Закрыть</button>
                </Head>
                <div className='modal-body'>
                    {list.length ? <>
                        <List title='Удалить' list={list} onAction={onDeleteItem} />
                        <div className='total' >
                            <span>Итого</span>
                            <span>{total} ₽</span>
                        </div>
                    </> :
                        <div className='zero'>Корзина пуста</div>
                    }
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    setActive: PropTypes.func,
    onDeleteItem: PropTypes.func,
    total: PropTypes.number,
    list: PropTypes.array
}
Modal.defaultProps ={
    setActive: () => { },
    onDeleteItem: () => {}
}

export default Modal;