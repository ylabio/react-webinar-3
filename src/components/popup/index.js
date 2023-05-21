import React from 'react'
import PropTypes from 'prop-types';
import './style.css'
import List from '../list'

export const Popup = ({active, setActive, basket, handleClick, sumPrice }) => {
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
        <div className='popup__info'>
          <span >Итого</span>
          <span className='popup__price'>{basket.length > 0 ? sumPrice : '0'} &#8381;</span>
        </div>
      </div>
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  handleClick: PropTypes.func,
  active: PropTypes.bool,
  buttonName: PropTypes.string,
};

List.defaultProps = {
  handleClick: () => {},
}