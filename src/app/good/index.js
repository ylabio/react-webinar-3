import React, { useCallback, useEffect } from 'react'
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { NavLink, useParams } from 'react-router-dom';
import PageLayout from '../../components/page-layout'
import Head from '../../components/head'
import BasketTool from '../../components/basket-tool';
import './style.css';
import { numberFormat } from '../../utils';

function Good() {
  const store = useStore();
  const {id} = useParams();

  const select = useSelector(state => ({
    _id: id,
    title: state.good.title,
    description: state.good.description,
    madeInTitle: state.good.madeInTitle,
    madeInCode: state.good.madeInCode,
    category: state.good.category,
    edition: state.good.edition,
    price: state.good.price,
    amount: state.basket.amount,
    sum: state.basket.sum,
    modal: state.modals.name
  }));

  useEffect(() => {
    store.actions.good.load(id);
    // if (select.modal === 'basket') store.actions.modals.close();
  }, [id]);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store])
  }

  return (
    <PageLayout>
        <Head title={select.title} />

        <div className='Good-header'>
          <NavLink className='Good-home' to="/">Главная</NavLink>
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
        </div>
        
        <div className="Good-content">
          <p className='Good-property'>{select.description}</p>
          <p className='Good-property'>Страна производитель: <b>{select.madeInTitle}({select.madeInCode})</b></p>
          <p className='Good-property'>Категория: <b>{select.category}</b></p>
          <p className='Good-property'>Год выпуска: <b>{select.edition}</b></p>
          <p className='Good-total'>Цена: {numberFormat(select.price, 'ru-RU', {style: 'currency', currency: 'RUB'})}</p>
          <button className='Good-button' onClick={() => callbacks.addToBasket(id)}>Добавить</button>
        </div>
    </PageLayout>
  )
}

export default React.memo(Good)