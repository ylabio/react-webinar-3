import React from 'react';
import './style.css';
import Head from '../head/index';
import List from '../list/index';
import PropTypes from "prop-types";

const Basket = ({list, btnsTitle, btnCallback, setActive, price}) => {
  return (
    <section className='basket'>
        <div className='basket__header'>
            <Head title={'Корзина'}></Head>
            <button className='basket__close-btn' onClick={()=> {setActive(false)}}>Закрыть</button>
        </div>
        <List
          list={list}
          btnCallback={btnCallback}  
          btnsTitle={btnsTitle}
        />
        <div className='basket__total-price'>
            <h2>Итого</h2>
            <span>{`${Intl.NumberFormat('ru-RU').format(price)} ₽`}</span>
        </div>
    </section>    
  )
}
Basket.propTypes = {
  list: PropTypes.array,
  btnsTitle: PropTypes.string,
  btnCallback: PropTypes.func,
  setActive: PropTypes.func,
  price: PropTypes.number,
};



export default Basket;