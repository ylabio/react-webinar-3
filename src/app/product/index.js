import {memo, useCallback, useEffect } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ProductDetail from '../../components/product-detail';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from 'react-router';
import Loader from '../../components/loader';


function Product({isFetching, setIsFetching }) {

  const { id } = useParams()

  const store = useStore();

  useEffect(() => {    
    (async function fetchingProduct() {
      try {
        setIsFetching(true)
        await store.actions.product.load(id);     
      } catch (error) {
        console.log(error)
      } finally {
        setIsFetching(false)
      }
    }()) 
  }, [id]);

  const select = useSelector(state => ({   
    amount: state.basket.amount,
    sum: state.basket.sum,
    data: state.product.data,    
    language: state.vocabulary.language
  }));     

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),    
    // Изменение языка
    onChangeLanguage: useCallback((language) => store.actions.vocabulary.onChangeLanguage(language), [store]),
    // Перевод
    getTranslation: useCallback((string, language) => store.actions.vocabulary.getTranslation(string, language), [store])
  }   

  return (
    <PageLayout>
      <Head title=
      {isFetching ? 
      <Loader 
        getTranslation={callbacks.getTranslation} 
        language={select.language} /> : select.data.title}
         onChangeLanguage={callbacks.onChangeLanguage}
      />
      <BasketTool 
        onOpen={callbacks.openModalBasket} 
        amount={select.amount}
        sum={select.sum} 
        getTranslation={callbacks.getTranslation} 
        language={select.language}
      />
      {isFetching ? 
      <h1><Loader 
        getTranslation={callbacks.getTranslation} 
        language={select.language} 
      /></h1> 
      : 
      <ProductDetail 
        onAdd={callbacks.addToBasket} 
        item={select.data}  
        getTranslation={callbacks.getTranslation} 
        language={select.language}
      />}      
    </PageLayout>

  );
}

export default memo(Product);
