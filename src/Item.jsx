import React from 'react'
import { declension } from './utils';

const Item = (props) => {
    const {
        selected,
        code,
        title,
        counter,
        store,
    } = props;

    return (
        <div className='List-item'>
            <div className={'Item' + (selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(code)}>
                <div className='Item-code'>{code}</div>
                <div className='Item-title'>{title} {counter !== 0 ? `| Выделяли ${counter} ${declension(counter)}` : ''}</div>
                <div className='Item-actions'>
                    <button onClick={() => store.deleteItem(code)}>
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Item