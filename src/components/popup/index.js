import React from 'react'
import './style.css'

export const Popup = ({active, setActive}) => {
  return (
    <div className={'popup' && active ? 'active' : '' } onClick={() => setActive(false)}>
        <div className='popup__content' onClick={(e) => e.stopPropagation()}>
            <div className='popup__header'>
                <h2>Корзина</h2>
                <button onClick={() => setActive(false)}>
                    Закрыть
                </button>
            </div>
        </div>
    </div>
  )
}