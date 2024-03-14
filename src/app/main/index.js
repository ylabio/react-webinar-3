import {memo, useCallback, useContext, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination"
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { LanguageContext } from '../../languageContext';
import TopMenuContainer from '../../components/top-menu-container';
import MainMenu from '../../components/main-menu';
import jsonText from './text.json'

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pagination: state.catalog
  }));

  const [language, setLanguage] = useContext(LanguageContext);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Закрытие модалки корзины
    closeModalBasket: useCallback(() => store.actions.modals.close(), [store]),
    //Изменение страницы
    changePage: useCallback((page) => store.actions.catalog.changePage(page), [store]),
    //Получение общего количества страниц
    getPagesQuantity: useCallback(() => store.actions.catalog.getPagesQuantity(), [])
  }

  useEffect(() => {
    callbacks.getPagesQuantity();
  }, [])

  useEffect(() => {
    store.actions.catalog.load(select.pagination.currentPage)
  }, [select.pagination.currentPage])

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} onClose={callbacks.closeModalBasket}/>
    }, [callbacks.addToBasket]),
  };

  const text = jsonText;
  
  return (
    <PageLayout>
      <Head title={text[language]}/>
      <TopMenuContainer>
          <MainMenu changePage={callbacks.changePage} />
          <BasketTool onOpen={callbacks.openModalBasket} 
                      amount={select.amount}
                      sum={select.sum} />
      </TopMenuContainer>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination pages={select.pagination} changePage={callbacks.changePage}/>
    </PageLayout>
  );
}

export default memo(Main);
