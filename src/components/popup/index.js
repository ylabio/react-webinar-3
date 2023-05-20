import React from 'react'
import './style.css'
import List from '../list'

export const Popup = ({active, setActive, basket, handleClick }) => {
  return (
    <div className={'popup' && active ? 'active' : '' } onClick={() => setActive(false)}>
        <div className='popup__content' onClick={(e) => e.stopPropagation()}>
            <div className='popup__header'>
                <h2>Корзина</h2>
                <button onClick={() => setActive(false)}>
                    Закрыть
                </button>
            </div>
            <List list={basket} handleClick={handleClick} buttonName='Удалить'/>
        </div>
    </div>
  )
}