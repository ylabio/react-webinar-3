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
    title: state.good.details.title,
    description: state.good.details.description,
    madeInTitle: state.good.details.madeInTitle,
    madeInCode: state.good.details.madeInCode,
    category: state.good.details.category,
    edition: state.good.details.edition,
    price: state.good.details.price,

    isLoading: state.good.isLoading,
    isError: state.good.isError,

    amount: state.basket.amount,
    sum: state.basket.sum,

    modal: state.modals.name,

    languages: state.localization.list,
    currentLanguage: state.localization.currentLanguage
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    resetGoodData: useCallback(() => store.actions.good.reset(), [store]),
    onChangeLanguage: useCallback((value) => store.actions.localization.onChangeLanguage(value), [store]),
    localize: useCallback((text) => store.actions.localization.toLocalization(text), [select.currentLanguage])
  }

  useEffect(() => {
    store.actions.good.load(id);
  }, [id]);

  return (
    <PageLayout>
        <Head title={select.title} onChangeLanguage={callbacks.onChangeLanguage} languages={select.languages} currentLanguage={select.currentLanguage}/>

        {!select.isLoading && !select.isError ? (<>
          <div className='Good-header'>
            <NavLink onClick={callbacks.resetGoodData} className='Good-home' to="/">{callbacks.localize('main')}</NavLink>
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} localize={callbacks.localize}/>
          </div>
          
          <div className="Good-content">
            <p className='Good-property'>{select.description}</p>
            <p className='Good-property'>{callbacks.localize('manufacturer')}: <b>{select.madeInTitle} ({select.madeInCode})</b></p>
            <p className='Good-property'>{callbacks.localize('category')}: <b>{select.category}</b></p>
            <p className='Good-property'>{callbacks.localize('productionYear')}: <b>{select.edition}</b></p>
            <p className='Good-total'>{callbacks.localize('price')}: {numberFormat(select.price, 'ru-RU', {style: 'currency', currency: 'RUB'})}</p>
            <button className='Good-button' onClick={() => callbacks.addToBasket(id)}>{callbacks.localize('add')}</button>
          </div>
        </>) : <span className='Good-loading'>{select.isError ? callbacks.localize('error') : callbacks.localize('loading')}</span>}

        {select.isError && <NavLink onClick={callbacks.resetGoodData} className='Good-home' style={{"display": "block", "text-align":"center"}} to="/">{callbacks.localize('main')}</NavLink>}
    </PageLayout>
  )
}

export default React.memo(Good)