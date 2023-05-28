import {memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import Loader from '../../components/loader';

function Main({isFetching, setIsFetching, pathProduct}) {   

  const store = useStore();      

  const select = useSelector(state => ({
    list: state.catalog.list,
    totalPages: state.catalog.totalPages,
    pageLimit: state.catalog.pageLimit,
    itemOrder: state.catalog.itemOrder,    
    currentPage: state.catalog.currentPage,
    pageNeighbours: state.catalog.pageNeighbours,   
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.vocabulary.language
  }));   

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),    
    // Переключение страницы
    selectedPage: useCallback(page => store.actions.catalog.selectedPage(page), [store]),
    // Получение номеров страниц
    fetchNumbersPage: useCallback(totalPagesCount => store.actions.catalog.fetchNumbersPage(totalPagesCount), [store]),
    // Генерация ключей
    generateCode: useCallback(() => store.actions.catalog.generateCode(), [store]),    
    // Изменение языка
    onChangeLanguage: useCallback((language) => store.actions.vocabulary.onChangeLanguage(language), [store]),
    // Перевод
    getTranslation: useCallback((string, language) => store.actions.vocabulary.getTranslation(string, language), [store])
  }

  useEffect(() => {    
    (async function fetchingPage() {
      try {
        setIsFetching(true)        
        await store.actions.catalog.load();      
      } catch (error) {
        console.log(error)
      } finally {
        setIsFetching(false)
      }
    }()) 
  }, [select.currentPage]); 

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} getTranslation={callbacks.getTranslation} language={select.language} pathProduct={pathProduct}/>
    }, [callbacks.addToBasket, select.language]),
  }; 

  return (
    <PageLayout>
      <Head title={callbacks.getTranslation('SHOP', select.language)} onChangeLanguage={callbacks.onChangeLanguage}/>
      <BasketTool 
        onOpen={callbacks.openModalBasket} 
        amount={select.amount}
        sum={select.sum} 
        getTranslation={callbacks.getTranslation} 
        language={select.language}/>
      {isFetching ? 
      <h1><Loader 
        getTranslation={callbacks.getTranslation} 
        language={select.language}
      /></h1> 
      :
        <List list={select.list} renderItem={renders.item}/>  
      }
      <Pagination 
        pageLimit={select.pageLimit} 
        itemOrder={select.itemOrder} 
        totalPages={select.totalPages} 
        currentPage={select.currentPage} 
        pageNeighbours={select.pageNeighbours} 
        selectedPage={callbacks.selectedPage}
        fetchNumbersPage={callbacks.fetchNumbersPage}       
        generateCode={callbacks.generateCode}      
      />
    </PageLayout>
  );
}

export default memo(Main);
