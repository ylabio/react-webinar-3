import React, { useCallback, useEffect } from 'react'
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/page-layout'
import Head from '../../components/head'
import BasketTool from '../../components/basket-tool';
import Navigation from '../../components/navigation';
import HeaderContent from '../../components/header-content';
import GoodContent from '../../components/good-content';
import LoaderLayout from '../../components/loader-layout';

function Good() {
  const store = useStore();
  const {id} = useParams();

  const select = useSelector(state => ({
    _id: id,
    details: state.good.details,
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
    onChangeLanguage: useCallback((value) => store.actions.localization.onChangeLanguage(value), [store]),
    localize: useCallback((text) => store.actions.localization.toLocalization(text), [select.currentLanguage])
  }

  useEffect(() => {
    store.actions.good.load(id);
  }, [id]);

  return (
    <PageLayout>
        <Head title={select.isLoading ? callbacks.localize('loading') : select.details.title} onChangeLanguage={callbacks.onChangeLanguage} languages={select.languages} currentLanguage={select.currentLanguage}/>
        
        <HeaderContent>
          <Navigation localize={callbacks.localize}/>
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} localize={callbacks.localize}/>
        </HeaderContent>

        <LoaderLayout isLoading={select.isLoading} isError={select.isError} localize={callbacks.localize}>
          <GoodContent details={select.details} localize={callbacks.localize} addToBasket={callbacks.addToBasket} id={select._id}/>
        </LoaderLayout>
    </PageLayout>
  )
}

export default React.memo(Good)